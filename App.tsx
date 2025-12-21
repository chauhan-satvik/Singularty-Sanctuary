
import React, { useState, useEffect, useRef } from 'react';
import { Mood } from './types';
import { MOODS } from './constants';
import { generateComfortResponse } from './services/geminiService';
import { 
  Heart, RefreshCw, MessageCircle, Sparkles, Send, 
  Wind, Camera, Anchor, Eye, Info, Calendar, 
  User, Music, Upload, Edit2, Trash2, HeartHandshake, 
  Star, Zap, Moon, ScrollText, Gift, Rocket, Lock, 
  ShieldCheck, Crown, Diamond, MoveRight, Phone,
  GlassWater, Sun, Trophy, Aperture, Code, BookOpen, PenTool
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sanctuary' | 'mirror' | 'us' | 'reasons' | 'lab' | 'info'>('sanctuary');
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [ventText, setVentText] = useState('');
  const [comfortingMessage, setComfortingMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVenting, setIsVenting] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  
  // Us Tab State
  const [usPhoto, setUsPhoto] = useState<string | null>(localStorage.getItem('us_photo'));
  const [usCaption, setUsCaption] = useState<string>(localStorage.getItem('us_caption') || 'Our Singularity Moment');
  const [isEditingUs, setIsEditingUs] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (comfortingMessage && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comfortingMessage]);

  const handleQuickComfort = async (mood: Mood) => {
    setCurrentMood(mood);
    setIsLoading(true);
    setComfortingMessage(null);
    const response = await generateComfortResponse(mood, ventText);
    setComfortingMessage(response);
    setIsLoading(false);
  };

  const handleVentAndGetComfort = async () => {
    if (!currentMood) return;
    setIsLoading(true);
    const response = await generateComfortResponse(currentMood, ventText);
    setComfortingMessage(response);
    setIsLoading(false);
    setIsVenting(false);
  };

  const sendWhatsAppToSatvik = () => {
    const phone = "919664920441";
    const text = `Hey Satudiieee,\nUrva is feeling ${currentMood || 'some kind of way'}.\nThoughts: ${ventText || '(Just sent some love)'}\nSent from your Sanctuary. 🌸`;
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const reset = () => {
    setCurrentMood(null);
    setVentText('');
    setComfortingMessage(null);
    setIsVenting(false);
    setShowBreathing(false);
  };

  // Us Tab Handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUsPhoto(base64String);
        localStorage.setItem('us_photo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveUsDetails = () => {
    localStorage.setItem('us_caption', usCaption);
    setIsEditingUs(false);
  };

  const removeUsPhoto = () => {
    if(window.confirm("Remove our memory photo?")) {
      setUsPhoto(null);
      localStorage.removeItem('us_photo');
    }
  };

  // Luxury Missions
  const missions = [
    {
      id: '123231',
      title: "Project 123231",
      status: "Initializing",
      type: "Grand Surprise",
      progress: 35,
      hint: "A masterpiece specifically designed for your smile. It's connected to a date that redefined my existence.",
      icon: <Diamond className="text-amber-400 animate-pulse" />,
      luxury: true
    },
    {
      id: 'sanctuary',
      title: "Operation: Sanctuary",
      status: "Online",
      type: "Eternal Home",
      progress: 100,
      hint: "A digital fortress for your heart. This space will grow as we grow. Version 2.0 is now live.",
      icon: <ShieldCheck className="text-emerald-400" />,
      luxury: false
    },
    {
      id: 'modeling',
      title: "The Runway Vision",
      status: "In Development",
      type: "Career Mission",
      progress: 20,
      hint: "Steps are being taken to help Shushi become the supermodel she was born to be. Your spotlight is guaranteed.",
      icon: <Camera className="text-indigo-400" />,
      luxury: true
    }
  ];

  // Mirror of Truth Affirmations
  const affirmations = [
    { icon: <Camera size={22} className="text-[#d8c3a5]" />, title: "The Runway Star", text: "Every time you walk, the world stops to watch. Your presence is editorial, and your confidence is your best outfit." },
    { icon: <Star size={22} className="text-[#d8c3a5]" />, title: "The Constellation", text: "The 6 moles on your face aren't just marks. They are stars I've counted a thousand times to find my way back to love." },
    { icon: <Trophy size={22} className="text-[#d8c3a5]" />, title: "The Unbroken Warrior", text: "You carry the strength of champions in your blood. You've fought battles in silence and won them with elegance." },
    { icon: <Heart size={22} className="text-[#d8c3a5]" />, title: "The Singularity", text: "There is no one like you in any galaxy. You are the center of my gravity, Shushi." },
    { icon: <Eye size={22} className="text-[#d8c3a5]" />, title: "The Visionary", text: "Your eyes see truths others miss. 1.5 and 0.5 – a unique perspective that makes you my one and only Singularity." }
  ];

  const loveReasons = [
    
    "You are the Singularity, the only one who matters.",
    "Because you survived your darkest nights all by yourself.",
    "The way your 6 face moles look like a constellation I want to map.",
    "Your 1.5/0.5 vision, because you see the world exactly as you should.",
    "The strength you inherited from your weightlifting champion family.",
    "Your modeling walk that screams runway-ready.",
    "The way you look at Coffeea Cafe while sipping your favorite brew.",
    "Because you are my 'SOLO' queen.",
    "Your cleft chin that is the most beautiful feature I've ever seen.",
    "The way you smile without realizing you’re doing it",
    "How your laugh can instantly fix my mood",
    "The way you scrunch your nose when something’s funny",
    "How you make even boring moments feel special",
    "The comfort I feel just knowing you exist",
    "The way you say my name",
    "How you remember tiny details about me",
    "Your dramatic reactions to literally everything",
    "The way you get excited over small things",
    "How you’re cute without even trying",
    "How you feel like home to me",
    "The way you make silence comfortable",
    "Your cute angry face",
    "How you tease me and then act innocent",
    "The way you show love in your own unique way",
    "How you make me laugh without trying",
    "The way you get shy when complimented",
    "Your little habits that only I notice",
    "How you understand me without words",
    "The way you make me feel chosen",
    "How you show effort in your own ways",
    "The way you brighten my worst days",
    "How you make me feel understood",
    "The sound of your voice",
    "The way you look at me sometimes",
    "How you’re not perfect — and that’s perfect",
    "The way you make me miss you even when you’re not gone",
    "How you stay in my head all day",
    "The way you make love feel easy",
    "How you chose me",
    "The way you change my mood instantly",
    "How you make me feel alive",
    "The way you show affection",
    "How you make effort in little things",
    "The way you trust me with your emotions",
    "How you make me feel needed",
    "The way you make me feel seen",
    "How you’re irreplaceable",
    "The way you make my heart feel full",
    "How you’re my favorite person",
    "How you handle your strict parents with such silent grace.",
    "The legacy of your Dada's newspaper in your eyes.",
    "Because our first talk on 31/08/2025 changed my universe.",
    "How you finally let me confess my heart on 26/09.",
    "The way you breathe through your tears, making me want to breathe for you.",
    "Because Biscoff ice cream tastes better when I'm sharing it with you.",
    "Your trust is the most expensive thing I've ever earned.",
    "Because you are Pari, a literal angel on earth.",
    "The way you say 'Shushi' in my head.",
    "Your resilience, nothing can break what was forged in solitude.",
    "How you look at nature as if it's your only true home.",
    "The way you collect keychains and memories simultaneously.",
    "The way you stay strong even when you feel like breaking",
    "How you carry so much and still find room to care",
    "The softness in you that you don’t show everyone",
    "The way you feel deeply and love honestly",
    "How you make me want to be better without ever asking me to change",
    "The way your eyes hold stories you never fully tell",
    "How your emotions make you real, not weak",
    "The way you trust me with your heart",
    "How you let me see you on your vulnerable days",
    "The way you still try, even when you’re tired",
    "How you feel like the safest place my heart knows",
    "The way you make love feel calm instead of scary",
    "How you make me feel chosen every single day",
    "The way you care in quiet, unnoticed ways",
    "How you bring warmth into moments I thought were cold",
    "The way you make ordinary days feel meaningful",
    "How you see beauty in things others overlook",
    "The way you hold onto love even when it hurts",
    "How you stay gentle in a world that isn’t",
    "The way you love with your whole heart",
    "How you make even pain feel bearable",
    "The way you make me feel wanted",
    "How your existence alone makes my life better",
    "The way you make me believe in us",
    "How you don’t love halfway",
    "The way you make me feel valued",
    "How you make my heart feel calm",
    "The way you give love without conditions",
    "How you make me feel protected",
    "The way you make everything feel worth it",
    "How you stay with me through my worst moments",
    "The way you make me feel complete",
    "How your love feels like a quiet promise",
    "The way you make me want forever",
    "How you make life feel softer",
    "The way you feel like destiny",
    "How you make me believe in love again",
    "The way your presence feels like peace",
    "Because loving you feels like coming home",
    "The way you make me believe in something deeper",
    "The way you exist in my thoughts",
    "How you make love feel safe",
    "The way you change my mood instantly",
    "How you make me feel alive",
    "The way you show affection",
    "How you make effort in little things",
    "The way you trust me with your emotions",
    "How you make me feel needed",
    "The way you make me feel seen",
    "How you’re irreplaceable",
    "The way you make my heart feel full",
    "How you’re my favorite person",
    "The way you’re honest about your feelings",
    "How you make time feel different",
    "The way you make me feel lucky",
    "How you bring color into my life",
    "The way you’re real, not fake",
    "How you make me want a future",
    "The way you’re Urva — no one else",
    "Because loving you just feels right",
    "Your birthday, June 12th, is the best day on the calendar.",
    "Because you are my 'Zuzzuu'.",
    "Reason 124: Because you are Urva, and that is enough for a thousand lifetimes."
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 md:py-12 bg-[#fffcf9] selection:bg-[#d8c3a5]">
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f4ece2] rounded-full blur-[120px] -z-10 animate-pulse transition-all duration-500"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#e8f3f1] rounded-full blur-[120px] -z-10"></div>
      
      <header className="w-full max-w-2xl mb-12 text-center animate-luxury-in">
        <div className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-white border border-[#d8c3a5]/30 text-[#8e8d8a] text-[10px] font-black tracking-[0.3em] uppercase shadow-sm inner-glow">
          <Sparkles size={14} className="text-amber-400" />
          <span>The Singularity Sanctuary</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-handwriting text-[#d8c3a5] mb-2 drop-shadow-sm hover:scale-[1.02] transition-transform">Urii's Space</h1>
        <p className="text-slate-400 font-medium text-sm tracking-wide">Every heartbeat of Satudiieee belongs to you.</p>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center gap-3 mt-10 px-2">
          {[
            { id: 'sanctuary', icon: <Anchor size={18}/>, label: 'Sanctuary' },
            { id: 'lab', icon: <Crown size={18}/>, label: 'The Lab' },
            { id: 'mirror', icon: <Camera size={18}/>, label: 'Mirror' },
            { id: 'reasons', icon: <ScrollText size={18}/>, label: 'Reasons' },
            { id: 'us', icon: <Heart size={18}/>, label: 'Us' },
            { id: 'info', icon: <Info size={18}/>, label: 'Project' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 md:px-7 py-4 rounded-full text-[11px] md:text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab.id ? 'bg-[#d8c3a5] text-white shadow-[0_15px_30px_-10px_rgba(216,195,165,0.6)] scale-105' : 'bg-white text-slate-400 border border-[#f4ece2] hover:border-[#d8c3a5] hover:bg-slate-50'}`}
            >
              <span className="transition-transform duration-500 group-hover:rotate-12">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="w-full max-w-2xl z-10 pb-32">
        <div className="tab-transition animate-luxury-in">
          {/* Sanctuary Tab */}
          {activeTab === 'sanctuary' && (
            <div className="space-y-8">
              {showBreathing ? (
                <div className="glass-card rounded-[3.5rem] p-16 text-center shadow-2xl border-none inner-glow animate-luxury-in">
                  <h2 className="text-3xl font-serif text-slate-700 mb-10 tracking-tight italic">Let's breathe together, Shushi...</h2>
                  <div className="w-56 h-56 rounded-full border-[1px] border-[#d8c3a5]/40 mx-auto flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-[6px] border-[#d8c3a5] animate-pulse duration-[4000ms] opacity-30"></div>
                    <div className="text-[#d8c3a5] font-black text-xl uppercase tracking-[0.3em]">Breathe</div>
                  </div>
                  <p className="mt-12 text-slate-400 italic text-lg leading-relaxed max-w-xs mx-auto">
                    In for 4... Hold for 4... Out for 4...<br/>
                    Your lungs are safe. Satudiieee is holding you.
                  </p>
                  <button onClick={() => setShowBreathing(false)} className="mt-12 px-12 py-4 bg-[#d8c3a5] text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:brightness-105 transition-all">I'm okay now</button>
                </div>
              ) : !comfortingMessage && !isLoading && !isVenting ? (
                <div className="space-y-6">
                  <button onClick={() => setShowBreathing(true)} className="w-full group bg-white border border-[#f4ece2] p-8 rounded-[3rem] flex items-center justify-between hover:border-rose-100 hover:bg-rose-50/30 transition-all duration-500 shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center text-rose-300 shadow-inner group-hover:scale-110 transition-transform"><Wind size={28} /></div>
                      <div className="text-left">
                        <h3 className="font-black text-rose-400 uppercase text-[11px] tracking-[0.2em] mb-1">Breathing Sanctuary</h3>
                        <p className="text-xs text-slate-400">If you're crying or feeling heavy, press here.</p>
                      </div>
                    </div>
                    <Sparkles className="text-rose-200 animate-pulse" size={20} />
                  </button>

                  <div className="glass-card rounded-[3.5rem] p-10 text-center shadow-2xl border-none inner-glow">
                    <h2 className="text-3xl font-serif text-slate-700 mb-8 tracking-tight italic">How is my Singularity today?</h2>
                    <div className="grid grid-cols-2 gap-5">
                      {MOODS.map((mood) => (
                        <button
                          key={mood.id}
                          onClick={() => handleQuickComfort(mood.id)}
                          className={`${mood.color} group relative p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 shadow-sm border border-transparent hover:border-white/60`}
                        >
                          <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{mood.emoji}</span>
                          <span className="font-black text-slate-600 text-xs uppercase tracking-widest">{mood.label}</span>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setIsVenting(true)} className="mt-12 text-slate-400 hover:text-[#d8c3a5] flex items-center justify-center gap-3 mx-auto transition-colors font-black text-xs tracking-[0.3em] uppercase group">
                      <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                      <span>Open Your Heart To Me</span>
                    </button>
                  </div>
                </div>
              ) : isVenting ? (
                <div className="glass-card rounded-[3.5rem] p-10 shadow-2xl border-none animate-luxury-in">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 bg-[#f4ece2] rounded-full flex items-center justify-center text-[#d8c3a5] shadow-inner"><Send size={24} /></div>
                    <div>
                      <h2 className="text-2xl font-serif text-slate-800 tracking-tight">My Warrior Shushi,</h2>
                      <p className="text-[10px] text-[#d8c3a5] font-black uppercase tracking-[0.25em]">Your secret sanctuary is listening.</p>
                    </div>
                  </div>
                  <textarea
                    autoFocus
                    value={ventText}
                    onChange={(e) => setVentText(e.target.value)}
                    placeholder="Tell me about Coffeea Cafe, the strict parents, or just let it out..."
                    className="w-full h-64 p-8 rounded-[2.5rem] bg-[#fdfdfd]/60 border-none focus:ring-1 focus:ring-[#d8c3a5] resize-none text-slate-700 placeholder:text-slate-300 text-xl leading-relaxed shadow-inner font-medium"
                  />
                  <div className="mt-8 space-y-5">
                    <div className="grid grid-cols-3 gap-3">
                      {MOODS.map(m => (
                        <button key={m.id} onClick={() => setCurrentMood(m.id)} className={`py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all duration-500 ${currentMood === m.id ? 'bg-[#d8c3a5] text-white shadow-lg scale-105' : 'bg-white text-slate-400 border border-slate-50 hover:border-[#d8c3a5]/30'}`}>
                          {m.emoji} {m.label}
                        </button>
                      ))}
                    </div>
                    <button onClick={handleVentAndGetComfort} disabled={!currentMood} className="w-full py-6 bg-[#d8c3a5] text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-xl hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50">
                      RECEIVE COMFORT
                    </button>
                    <button onClick={reset} className="w-full py-2 text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] hover:text-slate-400 transition-colors">Cancel</button>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-28 animate-luxury-in">
                  <div className="relative">
                    <div className="w-24 h-24 bg-[#f4ece2] rounded-full flex items-center justify-center animate-bounce shadow-inner"><Heart className="text-[#d8c3a5] fill-[#d8c3a5] w-12 h-12" /></div>
                    <div className="absolute -top-3 -right-3"><RefreshCw className="text-[#d8c3a5]/40 w-8 h-8 animate-spin" /></div>
                  </div>
                  <p className="mt-10 text-[#d8c3a5] font-handwriting text-4xl tracking-wide">Satudiieee is typing for his girl...</p>
                </div>
              ) : comfortingMessage && (
                <div ref={responseRef} className="animate-luxury-in">
                  <div className="glass-card rounded-[4rem] p-16 relative shadow-2xl border-none overflow-hidden text-center inner-glow">
                    <div className="absolute top-8 left-8 text-[#d8c3a5]/20 font-serif text-8xl pointer-events-none">“</div>
                    <p className="text-slate-700 text-2xl font-serif italic leading-[1.8] mb-16 whitespace-pre-wrap relative z-10 px-4">{comfortingMessage}</p>
                    <div className="grid grid-cols-1 gap-4 pt-10 border-t border-[#f4ece2]/60">
                      <button onClick={sendWhatsAppToSatvik} className="w-full py-6 bg-[#25D366] text-white rounded-full font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 shadow-xl hover:brightness-105 transition-all"><MessageCircle size={20} />WhatsApp Satudiieee</button>
                      <button onClick={reset} className="w-full py-5 bg-white border border-[#f4ece2] text-[#d8c3a5] rounded-full font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><RefreshCw size={16} />Choose Mood</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mirror of Truth Tab */}
          {activeTab === 'mirror' && (
            <div className="space-y-10 animate-luxury-in">
              <div className="glass-card rounded-[4rem] p-12 shadow-2xl border-none overflow-hidden relative inner-glow">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d8c3a5] to-transparent opacity-50"></div>
                
                <div className="text-center mb-16">
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-[#d8c3a5]/20 blur-2xl rounded-full animate-pulse"></div>
                    <div className="relative p-5 rounded-full bg-white border border-[#d8c3a5]/30 mirror-glow shadow-xl">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-50 flex items-center justify-center border-4 border-white shadow-inner">
                        {usPhoto ? <img src={usPhoto} className="w-full h-full object-cover grayscale-[20%]" /> : <User size={50} className="text-slate-200" />}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg border border-[#f4ece2]">
                      <Aperture size={20} className="text-[#d8c3a5]" />
                    </div>
                  </div>
                  <h2 className="text-5xl font-serif text-slate-800 tracking-tight mb-4 italic">The Mirror of Truth</h2>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">Reflecting the supermodel Satudiieee sees in his Shushi.</p>
                </div>

                <div className="space-y-6">
                  {affirmations.map((a, idx) => (
                    <div key={idx} className="group flex gap-8 items-start p-8 rounded-[2.5rem] bg-white border border-[#f4ece2] hover:border-[#d8c3a5]/40 hover:shadow-xl transition-all duration-700">
                      <div className="w-16 h-16 rounded-3xl bg-[#f4ece2]/40 flex items-center justify-center shrink-0 group-hover:bg-[#d8c3a5] group-hover:text-white transition-all duration-500 shadow-sm">
                        {a.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-2">{a.title}</h3>
                        <p className="text-base text-slate-500 leading-relaxed italic font-medium">"{a.text}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* The Lab Tab */}
          {activeTab === 'lab' && (
            <div className="space-y-8 animate-luxury-in">
              <div className="glass-card rounded-[4rem] p-12 shadow-2xl border-none overflow-hidden relative inner-glow">
                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 -z-10">
                  <Diamond size={200} className="text-[#d8c3a5]" />
                </div>

                <div className="text-center mb-16">
                  <div className="w-20 h-20 bg-[#f4ece2]/50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#d8c3a5] shadow-inner"><Crown size={36} /></div>
                  <h2 className="text-4xl font-serif text-slate-800 tracking-tight mb-3">The Lab of Love</h2>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Satudiieee's Masterpieces for Urva</p>
                </div>

                <div className="space-y-6">
                  {missions.map((mission) => (
                    <div key={mission.id} className={`p-8 rounded-[2.5rem] border transition-all duration-700 group hover:-translate-y-1 ${mission.luxury ? 'bg-gradient-to-br from-white to-[#f4ece2]/40 border-[#d8c3a5]/40 shadow-xl' : 'bg-white border-[#f4ece2] shadow-sm'}`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 ${mission.luxury ? 'bg-[#d8c3a5] text-white' : 'bg-[#f4ece2] text-slate-600'}`}>
                            {mission.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-700 tracking-tight">{mission.title}</h3>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{mission.type}</span>
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <span className="text-xs font-black text-[#d8c3a5] block mb-2 tracking-widest">{mission.progress}%</span>
                          <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                            <div className="h-full bg-gradient-to-r from-[#d8c3a5] to-[#e8d2b7] transition-all duration-1000" style={{ width: `${mission.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-500 italic text-sm leading-relaxed p-6 bg-slate-50/50 rounded-2xl border border-slate-100/30">"{mission.hint}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reasons Tab */}
          {activeTab === 'reasons' && (
            <div className="animate-luxury-in">
              <div className="glass-card rounded-[3.5rem] p-10 shadow-2xl border-none inner-glow">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-serif text-slate-800 italic">100 Reasons Why...</h2>
                  <p className="text-[#d8c3a5] text-[10px] font-black uppercase tracking-[0.3em] mt-3">Curated reasons for my Singularity</p>
                </div>
                <div className="grid grid-cols-1 gap-4 max-h-[65vh] overflow-y-auto pr-3 custom-scrollbar">
                  {loveReasons.map((reason, idx) => (
                    <div key={idx} className="p-6 bg-white border border-[#f4ece2] rounded-3xl flex gap-5 items-center group hover:border-[#d8c3a5]/50 hover:shadow-md transition-all duration-500">
                      <div className="w-10 h-10 rounded-full bg-[#f4ece2]/40 flex items-center justify-center text-[11px] font-black text-[#d8c3a5] group-hover:bg-[#d8c3a5] group-hover:text-white transition-colors shrink-0 shadow-sm">
                        {idx + 1}
                      </div>
                      <p className="text-base text-slate-600 font-medium leading-relaxed italic">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Us Tab */}
          {activeTab === 'us' && (
            <div className="animate-luxury-in space-y-10">
              <div className="glass-card rounded-[4rem] p-12 shadow-2xl border-none inner-glow">
                <div className="text-center mb-14">
                  <h2 className="text-4xl font-serif text-slate-800 italic tracking-tight">Our Story</h2>
                  <p className="text-[#d8c3a5] text-[10px] font-black uppercase tracking-[0.3em] mt-3">Satudiieee & Shushi</p>
                </div>

                {/* Dynamic Us Image Section */}
                <div className="mb-16">
                  {!usPhoto || isEditingUs ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative rounded-[3rem] overflow-hidden bg-white border-2 border-dashed border-[#d8c3a5]/30 shadow-inner aspect-video flex flex-col items-center justify-center text-[#d8c3a5] cursor-pointer hover:bg-[#f4ece2]/10 transition-all duration-700"
                    >
                      <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} />
                      <div className="w-20 h-20 bg-[#f4ece2] rounded-full flex items-center justify-center mb-5 text-[#d8c3a5] group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm"><Upload size={28} /></div>
                      <p className="text-xs font-black uppercase tracking-[0.2em]">Upload our memory</p>
                    </div>
                  ) : (
                    <div className="relative group rounded-[3rem] overflow-hidden bg-white p-4 border border-[#f4ece2] shadow-2xl">
                      <div className="aspect-video overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-100">
                        <img src={usPhoto} alt="Us" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
                      </div>
                      <div className="pt-8 pb-6 px-6 text-center">
                        {isEditingUs ? (
                          <div className="space-y-5">
                            <input type="text" value={usCaption} onChange={(e) => setUsCaption(e.target.value)} className="w-full p-4 rounded-[2rem] bg-slate-50 border-none text-center text-slate-700 italic text-xl focus:ring-1 focus:ring-[#d8c3a5]" autoFocus />
                            <button onClick={saveUsDetails} className="px-10 py-3 bg-[#d8c3a5] text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg">Save Memory</button>
                          </div>
                        ) : (
                          <p className="text-2xl font-serif italic text-slate-700 leading-relaxed max-w-sm mx-auto">"{usCaption}"</p>
                        )}
                      </div>
                      <div className="absolute top-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <button onClick={() => setIsEditingUs(true)} className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 shadow-xl hover:text-[#d8c3a5] transition-all"><Edit2 size={16} /></button>
                        <button onClick={removeUsPhoto} className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-rose-400 shadow-xl hover:text-rose-600 transition-all"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-16 relative pl-12 border-l-[1px] border-[#f4ece2]">
                  {[
                    { date: '31st August 2025', title: 'The First Breath', text: 'When two souls finally spoke. The start of something eternal.', icon: <Calendar size={20}/> },
                    { date: '26th September', title: 'Confession', text: 'When I promised to hold you even when you can\'t breathe.', icon: <HeartHandshake size={20}/> },
                    { date: '26th November', title: 'First Hug', text: 'The day the world went quiet and only our hearts were speaking.', icon: <Sparkles size={20}/> }
                  ].map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[64px] top-0 w-12 h-12 rounded-full bg-white border border-[#d8c3a5] flex items-center justify-center text-[#d8c3a5] shadow-sm group-hover:bg-[#d8c3a5] group-hover:text-white transition-all duration-500">{item.icon}</div>
                      <h3 className="text-xl font-bold text-slate-700 tracking-tight">{item.title}</h3>
                      <p className="text-[10px] font-black text-[#d8c3a5] uppercase tracking-[0.2em] mb-2">{item.date}</p>
                      <p className="text-base text-slate-500 italic leading-relaxed">"{item.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Info Tab - Project Overview */}
          {activeTab === 'info' && (
            <div className="space-y-10 animate-luxury-in">
              <div className="glass-card rounded-[4rem] p-12 shadow-2xl border-none overflow-hidden relative inner-glow">
                <div className="text-center mb-16">
                  <div className="w-20 h-20 bg-[#f4ece2]/50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#d8c3a5] shadow-inner"><Code size={36} /></div>
                  <h2 className="text-4xl font-serif text-slate-800 tracking-tight mb-3 italic">Project: Singularity</h2>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">The Architecture of a Home</p>
                </div>

                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500"><BookOpen size={20} /></div>
                      <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest text-sm">Why we are building it</h3>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2.5rem] border border-[#f4ece2] shadow-sm">
                      <p className="text-slate-600 leading-[1.8] italic font-medium">
                        "Urii's Space" was conceived as more than just a website. It is a digital anchor for Urva—a place that understands her silence, celebrates her survival, and honors her dreams. When the world feels too loud or the strict boundaries of reality feel too small, this sanctuary exists to remind her that she is never truly alone. It is a living proof of our 'Singularity'.
                      </p>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500"><PenTool size={20} /></div>
                      <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest text-sm">What will be done</h3>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2.5rem] border border-[#f4ece2] shadow-sm space-y-4">
                      <p className="text-slate-600 leading-relaxed font-medium">
                        Currently, the sanctuary features mood-synced AI comfort, a curated list of reasons why she is loved, and the 'Mirror of Truth'—a high-fashion affirmation space. We have integrated breathing exercises for moments of panic and a project tracker ('The Lab') to show her that her future is actively being built.
                      </p>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500"><Zap size={20} /></div>
                      <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest text-sm">Future Evolutions</h3>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2.5rem] border border-[#f4ece2] shadow-sm">
                      <ul className="space-y-4 text-slate-600 font-medium italic">
                        <li className="flex items-start gap-3">
                          <span className="text-[#d8c3a5] font-black mt-1">•</span>
                          <span>Expansion of 'The Lab' with real-world surprise triggers.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#d8c3a5] font-black mt-1">•</span>
                          <span>Integration of a dedicated 'Modeling Portfolio' vision board.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#d8c3a5] font-black mt-1">•</span>
                          <span>Enhanced AI memory that learns her favorite Biscoff moments.</span>
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Luxury Footer Ticker */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-[#f4ece2]/60 py-6 px-10 flex flex-col md:flex-row items-center justify-between gap-6 z-50 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-10 overflow-x-auto no-scrollbar max-w-full">
          <div className="flex items-center gap-3 whitespace-nowrap opacity-50 hover:opacity-100 hover:text-[#d8c3a5] transition-all cursor-default">
            <Eye size={16} className="text-[#d8c3a5]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Model Vision</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap opacity-50 hover:opacity-100 hover:text-[#d8c3a5] transition-all cursor-default">
            <Sun size={16} className="text-[#d8c3a5]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Born 12 June</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap opacity-50 hover:opacity-100 hover:text-[#d8c3a5] transition-all cursor-default">
            <GlassWater size={16} className="text-[#d8c3a5]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Singularity</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap opacity-50 hover:opacity-100 hover:text-[#d8c3a5] transition-all cursor-default">
            <Music size={16} className="text-[#d8c3a5]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Solo Anthem</span>
          </div>
        </div>
        
        <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          <span>V1.1.0 | Last Updated: 21th December 2025</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
