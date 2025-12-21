
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
  GlassWater, Sun, Trophy
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sanctuary' | 'mirror' | 'us' | 'reasons' | 'lab'>('sanctuary');
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
      progress: 25,
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
      luxury: true
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
    { icon: <Camera size={20} />, title: "The Runway Star", text: "Your walk isn't just a walk, it's a statement. The camera loves you because you are authentic and breathtaking." },
    { icon: <Star size={20} />, title: "The Constellation", text: "Your 6 face moles are a secret map I follow to find my way home. They are perfectly placed by the stars." },
    { icon: <Trophy size={20} />, title: "The Unbroken", text: "A warrior who survived her own storms with silent grace. You are the strongest person in my universe." },
    { icon: <Heart size={20} />, title: "The Singularity", text: "There is no one like you in any galaxy. You are the center of my gravity, Shushi." },
    { icon: <Eye size={20} />, title: "The Visionary", text: "Your 1.5 and 0.5 eyes see the world with a magic others can't comprehend. You see the soul of things." }
  ];

  // 100 Reasons Why I Love Her
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
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f4ece2] rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#e8f3f1] rounded-full blur-[120px] -z-10"></div>
      
      <header className="w-full max-w-2xl mb-8 text-center animate-in fade-in duration-1000">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white border border-[#d8c3a5] text-[#8e8d8a] text-[10px] font-black tracking-[0.2em] uppercase shadow-sm">
          <Sparkles size={12} className="text-amber-400" />
          <span>The Singularity Sanctuary</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-handwriting text-[#d8c3a5] mb-2 drop-shadow-sm">Urii's Space</h1>
        <p className="text-slate-400 font-medium text-sm">Every heartbeat of Satudiieee belongs to you.</p>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 px-2">
          {[
            { id: 'sanctuary', icon: <Anchor size={16}/>, label: 'Sanctuary' },
            { id: 'lab', icon: <Crown size={16}/>, label: 'The Lab' },
            { id: 'mirror', icon: <Sparkles size={16}/>, label: 'Mirror' },
            { id: 'reasons', icon: <ScrollText size={16}/>, label: 'Reasons' },
            { id: 'us', icon: <Heart size={16}/>, label: 'Us' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 md:px-6 py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#d8c3a5] text-white shadow-lg scale-105' : 'bg-white text-slate-400 border border-[#f4ece2]'}`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="w-full max-w-2xl z-10 pb-20">
        {/* Sanctuary Tab */}
        {activeTab === 'sanctuary' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {showBreathing ? (
              <div className="glass-card rounded-[3rem] p-12 text-center shadow-2xl border-none">
                <h2 className="text-2xl font-serif text-slate-700 mb-8">Let's breathe together, Shushi...</h2>
                <div className="w-48 h-48 rounded-full border-4 border-[#d8c3a5] mx-auto flex items-center justify-center animate-pulse duration-[4000ms]">
                   <div className="text-[#d8c3a5] font-bold text-xl uppercase tracking-widest">Breathe</div>
                </div>
                <p className="mt-10 text-slate-500 italic leading-relaxed">
                  In for 4, Hold for 4, Out for 4.<br/>
                  Your lungs are safe, Satudiieee is holding you.
                </p>
                <button onClick={() => setShowBreathing(false)} className="mt-8 px-10 py-3 bg-[#d8c3a5] text-white rounded-full font-bold shadow-lg">I'm okay now</button>
              </div>
            ) : !comfortingMessage && !isLoading && !isVenting ? (
              <div className="space-y-6">
                <button onClick={() => setShowBreathing(true)} className="w-full group bg-rose-50 border border-rose-100 p-6 rounded-[2.5rem] flex items-center justify-between hover:bg-rose-100 transition-all shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-400 shadow-sm"><Wind size={24} /></div>
                    <div className="text-left">
                      <h3 className="font-bold text-rose-700 uppercase text-[10px] tracking-widest">Breathing Check</h3>
                      <p className="text-xs text-rose-500">If you're crying or panicking, press here.</p>
                    </div>
                  </div>
                  <Sparkles className="text-rose-300 animate-pulse" />
                </button>

                <div className="glass-card rounded-[3rem] p-8 text-center shadow-2xl border-none">
                  <h2 className="text-2xl font-serif text-slate-700 mb-6">How is my Singularity today?</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {MOODS.map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() => handleQuickComfort(mood.id)}
                        className={`${mood.color} group relative p-6 rounded-[2rem] flex flex-col items-center justify-center gap-2 hover:scale-[1.03] transition-all duration-300 shadow-sm border border-transparent hover:border-white`}
                      >
                        <span className="text-4xl">{mood.emoji}</span>
                        <span className="font-bold text-slate-600 text-sm tracking-tight">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setIsVenting(true)} className="mt-8 text-slate-400 hover:text-[#d8c3a5] flex items-center justify-center gap-2 mx-auto transition-colors font-bold text-xs tracking-[0.2em] uppercase">
                    <MessageCircle size={18} />
                    <span>Open Your Heart To Me</span>
                  </button>
                </div>
              </div>
            ) : isVenting ? (
              <div className="glass-card rounded-[3rem] p-8 shadow-2xl animate-in fade-in duration-500 border-none">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#f4ece2] rounded-full flex items-center justify-center"><Send className="text-[#d8c3a5] w-6 h-6" /></div>
                  <div>
                    <h2 className="text-xl font-serif text-slate-800">My Warrior Shushi,</h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Your modeling dreams are safe here.</p>
                  </div>
                </div>
                <textarea
                  autoFocus
                  value={ventText}
                  onChange={(e) => setVentText(e.target.value)}
                  placeholder="Tell me about Coffeea Cafe, or Monginis, or the strict parents, or just vent."
                  className="w-full h-56 p-6 rounded-[2rem] bg-[#fdfdfd]/50 border-none focus:ring-2 focus:ring-[#d8c3a5] resize-none text-slate-700 placeholder:text-slate-300 text-lg leading-relaxed shadow-inner"
                />
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {MOODS.map(m => (
                      <button key={m.id} onClick={() => setCurrentMood(m.id)} className={`py-3 rounded-2xl text-[10px] font-black transition-all ${currentMood === m.id ? 'bg-[#d8c3a5] text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-50'}`}>
                        {m.emoji} {m.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={handleVentAndGetComfort} disabled={!currentMood} className="w-full py-5 bg-[#d8c3a5] text-white rounded-[2rem] font-black shadow-xl transition-all active:scale-[0.98]">
                    RECEIVE LOVE
                  </button>
                  <button onClick={reset} className="w-full py-2 text-slate-400 text-xs font-black uppercase tracking-widest">Cancel</button>
                </div>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                <div className="relative">
                  <div className="w-20 h-20 bg-[#f4ece2] rounded-full flex items-center justify-center animate-bounce"><Heart className="text-[#d8c3a5] fill-[#d8c3a5] w-10 h-10" /></div>
                  <div className="absolute -top-2 -right-2"><RefreshCw className="text-[#8e8d8a] w-6 h-6 animate-spin" /></div>
                </div>
                <p className="mt-8 text-[#d8c3a5] font-handwriting text-3xl">Satudiieee is typing for his girl,</p>
              </div>
            ) : comfortingMessage && (
              <div ref={responseRef} className="space-y-6 animate-in slide-in-from-bottom-12 duration-1000">
                <div className="glass-card rounded-[3.5rem] p-12 relative shadow-2xl border-none overflow-hidden text-center">
                  <p className="text-slate-700 text-2xl font-serif italic leading-[1.6] mb-12 whitespace-pre-wrap">"{comfortingMessage}"</p>
                  <div className="grid grid-cols-1 gap-4 pt-8 border-t border-[#f4ece2]">
                    <button onClick={sendWhatsAppToSatvik} className="w-full py-5 bg-[#25D366] text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"><MessageCircle size={18} />WhatsApp Satudiieee</button>
                    <button onClick={reset} className="w-full py-4 bg-white border border-[#f4ece2] text-[#d8c3a5] rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"><RefreshCw size={14} />Choose Mood</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* The Lab Tab (Missions Only) */}
        {activeTab === 'lab' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
            <div className="glass-card rounded-[3.5rem] p-8 md:p-10 shadow-2xl border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 -z-10">
                <Diamond size={120} className="text-[#d8c3a5]" />
              </div>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-slate-800">The Lab of Love</h2>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Satvik's Projects For Urva</p>
              </div>

              <div className="space-y-6">
                {missions.map((mission) => (
                  <div key={mission.id} className={`p-6 rounded-[2.5rem] border transition-all ${mission.luxury ? 'bg-gradient-to-br from-white to-[#f4ece2]/20 border-[#d8c3a5]/30' : 'bg-white border-[#f4ece2]'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${mission.luxury ? 'bg-[#d8c3a5] text-white' : 'bg-[#f4ece2] text-slate-600'}`}>
                          {mission.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-700">{mission.title}</h3>
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{mission.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-[#d8c3a5] block mb-1">{mission.progress}%</span>
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#d8c3a5]" style={{ width: `${mission.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-500 italic text-sm pl-16">"{mission.hint}"</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-[#f4ece2]/30 rounded-[2.5rem] text-center border border-dashed border-[#d8c3a5]/20">
                <p className="text-xs font-black text-[#d8c3a5] uppercase tracking-widest mb-2">More in progress</p>
                <p className="text-slate-500 italic text-sm">"Every step I take is towards a future that includes you."</p>
              </div>
            </div>
          </div>
        )}

        {/* Mirror of Truth Tab */}
        {activeTab === 'mirror' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="glass-card rounded-[3.5rem] p-10 shadow-2xl border-none overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d8c3a5] to-transparent"></div>
              
              <div className="text-center mb-12">
                <div className="inline-block p-4 rounded-full bg-[#f4ece2]/30 mb-6 border border-[#d8c3a5]/20">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center border-2 border-white shadow-lg">
                    {usPhoto ? <img src={usPhoto} className="w-full h-full object-cover" /> : <User size={40} className="text-white" />}
                  </div>
                </div>
                <h2 className="text-4xl font-serif text-slate-800">The Mirror of Truth</h2>
                <p className="text-slate-400 text-xs font-medium mt-3">What Satudiieee sees when he looks at his Shushi.</p>
              </div>

              <div className="space-y-6">
                {affirmations.map((a, idx) => (
                  <div key={idx} className="flex gap-6 items-start p-6 rounded-3xl bg-white border border-[#f4ece2] hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-[#f4ece2] flex items-center justify-center text-[#d8c3a5] shrink-0 group-hover:rotate-12 transition-transform">
                      {a.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-1">{a.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed italic">"{a.text}"</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-[#d8c3a5]/10 rounded-[2.5rem] text-center border border-[#d8c3a5]/20">
                <p className="text-lg font-serif italic text-slate-700">
                  "You were built to shine, Shushi. Never let the shadows tell you otherwise."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 100 Reasons Tab */}
        {activeTab === 'reasons' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-card rounded-[3.5rem] p-8 shadow-2xl border-none">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif text-slate-800">100 Reasons</h2>
                <p className="text-[#d8c3a5] text-[10px] font-black uppercase tracking-[0.2em] mt-2">Why I'll Love You Throughout My Life</p>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {loveReasons.map((reason, idx) => (
                  <div key={idx} className="p-5 bg-white border border-[#f4ece2] rounded-3xl flex gap-4 items-center group hover:border-[#d8c3a5] transition-all">
                    <div className="w-8 h-8 rounded-full bg-[#f4ece2]/50 flex items-center justify-center text-[10px] font-black text-[#d8c3a5] group-hover:bg-[#d8c3a5] group-hover:text-white transition-colors shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed italic">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Us Tab */}
        {activeTab === 'us' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-card rounded-[3.5rem] p-10 shadow-2xl border-none">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-slate-800">Our Story</h2>
                <p className="text-[#d8c3a5] text-[10px] font-black uppercase tracking-[0.2em] mt-2">Satudiieee & Shushi</p>
              </div>

              {/* Dynamic Us Image Section */}
              <div className="mb-12">
                {!usPhoto || isEditingUs ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative rounded-[2.5rem] overflow-hidden bg-white border-2 border-dashed border-[#d8c3a5]/30 shadow-inner aspect-video flex flex-col items-center justify-center text-[#d8c3a5] cursor-pointer hover:bg-[#f4ece2]/20 transition-all"
                  >
                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} />
                    <div className="w-16 h-16 bg-[#f4ece2] rounded-full flex items-center justify-center mb-4 text-[#d8c3a5] group-hover:scale-110 transition-transform"><Upload size={24} /></div>
                    <p className="text-xs font-black uppercase tracking-widest">Upload our memory</p>
                  </div>
                ) : (
                  <div className="relative group rounded-[2.5rem] overflow-hidden bg-white p-3 border border-[#f4ece2] shadow-xl">
                    <div className="aspect-video overflow-hidden rounded-[2rem] bg-slate-50">
                      <img src={usPhoto} alt="Us" className="w-full h-full object-cover" />
                    </div>
                    <div className="pt-6 pb-4 px-4 text-center">
                      {isEditingUs ? (
                        <div className="space-y-4">
                          <input type="text" value={usCaption} onChange={(e) => setUsCaption(e.target.value)} className="w-full p-3 rounded-2xl bg-slate-50 border-none text-center text-slate-700 italic" autoFocus />
                          <button onClick={saveUsDetails} className="px-6 py-2 bg-[#d8c3a5] text-white rounded-full text-[10px] font-black uppercase shadow-md">Save</button>
                        </div>
                      ) : (
                        <p className="text-xl font-serif italic text-slate-700">"{usCaption}"</p>
                      )}
                    </div>
                    <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setIsEditingUs(true)} className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-slate-600 shadow-sm"><Edit2 size={14} /></button>
                      <button onClick={removeUsPhoto} className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-rose-400 shadow-sm"><Trash2 size={14} /></button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-12 relative pl-8 border-l border-[#f4ece2]">
                {[
                  { date: '31st August 2025', title: 'The First Breath', text: 'When two souls finally spoke. The start of something eternal.', icon: <Calendar size={18}/> },
                  { date: '26th September', title: 'Confession', text: 'When I promised to hold you even when you can\'t breathe.', icon: <HeartHandshake size={18}/> },
                  { date: '26th November', title: 'First Hug', text: 'The day the world went quiet and only our hearts were speaking.', icon: <Sparkles size={18}/> }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white border border-[#d8c3a5] flex items-center justify-center text-[#d8c3a5] shadow-sm">{item.icon}</div>
                    <h3 className="text-lg font-bold text-slate-700">{item.title}</h3>
                    <p className="text-[10px] font-black text-[#d8c3a5] uppercase tracking-widest mb-1">{item.date}</p>
                    <p className="text-sm text-slate-500 italic">"{item.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Luxury Footer Ticker */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#f4ece2] py-4 px-6 flex justify-center gap-8 z-50 overflow-x-auto overflow-y-hidden">
        <div className="flex items-center gap-2 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
          <Eye size={14} className="text-[#d8c3a5]" />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Model Vision</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
          <Sun size={14} className="text-[#d8c3a5]" />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Born 12 June</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
          <GlassWater size={14} className="text-[#d8c3a5]" />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Singularity</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
          <Music size={14} className="text-[#d8c3a5]" />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Solo Anthem</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
