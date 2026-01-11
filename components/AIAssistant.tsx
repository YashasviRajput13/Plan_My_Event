
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// Helper for base64 encoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper for base64 decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// PCM Audio decoding for the Live API
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

type SupportedLanguage = 'English' | 'Hindi' | 'Marathi';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [language, setLanguage] = useState<SupportedLanguage>('English');

  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const micStreamRef = useRef<MediaStream | null>(null);

  const toggleAssistant = () => {
    if (isOpen) {
      stopSession();
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setErrorMessage(null);
      startSession(language);
    }
  };

  const changeLanguage = (newLang: SupportedLanguage) => {
    if (newLang === language) return;
    setLanguage(newLang);
    if (isConnected) {
      // Restart session with new language instruction
      stopSession();
      setTimeout(() => startSession(newLang), 300);
    }
  };

  const getSystemInstruction = (lang: SupportedLanguage) => {
    const base = "You are a world-class premium Indian event planner for 'PlanMyEvent' by VentureCraft. You help users with professional and sophisticated advice on vendor choice, budget, and planning. KEEP RESPONSES EXTREMELY BRIEF, HUMAN-LIKE, AND LIGHTNING FAST.";
    
    switch (lang) {
      case 'Hindi':
        return `${base} STATED REQUIREMENT: Respond ONLY in HINDI. आप एक प्रीमियम भारतीय इवेंट प्लानर हैं। कृपया बहुत संक्षिप्त और मधुर हिंदी में उत्तर दें।`;
      case 'Marathi':
        return `${base} STATED REQUIREMENT: Respond ONLY in MARATHI. तुम्ही एक प्रीमियम भारतीय इव्हेंट प्लॅनर आहात. कृपया अतिशय थोडक्यात आणि स्पष्ट मराठीत उत्तर द्या.`;
      default:
        return `${base} STATED REQUIREMENT: Respond ONLY in ENGLISH. Keep it very short.`;
    }
  };

  const startSession = async (currentLang: SupportedLanguage) => {
    try {
      if (!process.env.API_KEY) {
        setErrorMessage("API Key is missing.");
        return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      if (audioContextRef.current.state === 'suspended') await audioContextRef.current.resume();
      if (outputAudioContextRef.current.state === 'suspended') await outputAudioContextRef.current.resume();

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = stream;
      } catch (err: any) {
        setErrorMessage("Microphone access denied.");
        return;
      }
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsListening(true);
            setErrorMessage(null);

            if (audioContextRef.current) {
              const source = audioContextRef.current.createMediaStreamSource(stream);
              const scriptProcessor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
              
              scriptProcessor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const l = inputData.length;
                const int16 = new Int16Array(l);
                for (let i = 0; i < l; i++) {
                  int16[i] = inputData[i] * 32768;
                }
                const pcmBlob = {
                  data: encode(new Uint8Array(int16.buffer)),
                  mimeType: 'audio/pcm;rate=16000',
                };
                
                sessionPromise.then(session => {
                  session.sendRealtimeInput({ media: pcmBlob });
                }).catch(err => console.error(err));
              };
              
              source.connect(scriptProcessor);
              scriptProcessor.connect(audioContextRef.current.destination);
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setTranscript(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            }
            
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                outputAudioContextRef.current,
                24000,
                1
              );
              const source = outputAudioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContextRef.current.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: (e) => {
            setIsConnected(false);
            setIsListening(false);
          },
          onerror: (e) => {
            console.error(e);
            setErrorMessage("Connection Error.");
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: getSystemInstruction(currentLang),
        },
      });

      sessionPromiseRef.current = sessionPromise;
    } catch (err) {
      setErrorMessage("System error.");
    }
  };

  const stopSession = () => {
    try {
      if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(session => session.close());
        sessionPromiseRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (outputAudioContextRef.current) {
        outputAudioContextRef.current.close();
        outputAudioContextRef.current = null;
      }
    } catch (e) {}
    setIsConnected(false);
    setIsListening(false);
    setTranscript('');
  };

  const getStatusText = () => {
    if (errorMessage) return 'Offline';
    if (!isConnected) return 'Connecting...';
    return isListening ? 'Listening' : 'Ready';
  };

  return (
    <>
      <button 
        onClick={toggleAssistant}
        className={`fixed bottom-8 right-8 z-[60] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-navy' : 'bg-navy text-gold'}`}
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <div className="relative">
            <span className="absolute -inset-2 bg-gold/20 rounded-full animate-ping"></span>
            <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
            </svg>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-navy/95 backdrop-blur-2xl" onClick={toggleAssistant}></div>
          
          <div className="relative w-full max-w-lg bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 text-center animate-fade-in-up">
            
            {/* Language Selector */}
            <div className="flex justify-center gap-3 mb-8">
              {(['English', 'Hindi', 'Marathi'] as SupportedLanguage[]).map((l) => (
                <button
                  key={l}
                  onClick={() => changeLanguage(l)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${language === l ? 'bg-gold text-navy shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="mb-10 relative flex justify-center">
              <div className={`w-32 h-32 rounded-full bg-[#00A884]/20 flex items-center justify-center transition-all duration-700 ${isListening && isConnected ? 'scale-110 shadow-[0_0_80px_rgba(0,168,132,0.3)]' : 'scale-100'}`}>
                <div className={`w-24 h-24 rounded-full bg-[#00A884] shadow-2xl flex items-center justify-center transition-transform duration-500 ${isConnected ? 'animate-pulse' : ''}`}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                  </svg>
                </div>
              </div>
            </div>

            <h2 className="font-display text-3xl font-bold text-white mb-2">PlanMyEvent <span className="text-[#00A884] italic font-normal">OS</span></h2>
            
            {errorMessage ? (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
                <p className="text-red-400 text-xs font-medium">{errorMessage}</p>
                <button onClick={() => startSession(language)} className="mt-4 text-white text-[10px] font-bold underline uppercase">Retry</button>
              </div>
            ) : (
              <p className="text-white/40 mb-8 font-medium text-sm">
                {isConnected ? (language === 'English' ? "How can I help you today?" : language === 'Hindi' ? "आज मैं आपकी कैसे मदद कर सकता हूँ?" : "आज मी तुम्हाला कशी मदत करू शकतो?") : "Establishing premium link..."}
              </p>
            )}

            <div className="h-32 overflow-y-auto mb-8 px-4 bg-white/5 rounded-2xl p-5 text-left">
              <p className="text-ivory/80 text-xs italic leading-relaxed font-light">
                {transcript || (errorMessage ? "System offline." : "Ready...")}
              </p>
            </div>

            <div className="flex justify-center">
               <div className="px-5 py-2 bg-white/10 rounded-full border border-white/20 flex items-center gap-3">
                 <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[#00A884] animate-pulse' : (errorMessage ? 'bg-red-500' : 'bg-yellow-400')}`}></div>
                 <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/50">
                   {getStatusText()}
                 </span>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
