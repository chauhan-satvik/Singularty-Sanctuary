
import React, { useState, useEffect, useRef } from 'react';
import { Mood } from './types';
import { MOODS } from './constants';
import { generateComfortResponse } from './services/geminiService';
import { 
  Heart, RefreshCw, MessageCircle, Sparkles, Send, 
  Wind, Camera, Anchor, Eye, Info, Calendar, 
  User, Upload, Edit2, Trash2, HeartHandshake, 
  Star, Zap, ShieldCheck, Crown, Diamond, Aperture, 
  Clock, Layers, MapPin, Trophy, ScrollText, CheckCircle2, 
  Rocket, Cpu, Workflow, Quote, Shield, Flame, Coffee, Gem, 
  Dna, Sparkle, ArrowRight
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sanctuary' | 'mirror' | 'us' | 'reasons' | 'lab' | 'info'>('sanctuary');
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [ventText, setVentText] = useState('');
  const [comfortingMessage, setComfortingMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVenting, setIsVenting] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  
  // Live Eternity Counter State
  const [timeSinceStart, setTimeSinceStart] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Us Tab State
  const [usPhoto, setUsPhoto] = useState<string | null>(localStorage.getItem('us_photo'));
  const [usCaption, setUsCaption] = useState<string>(localStorage.getItem('us_caption') || 'Our Singularity Moment');
  const [isEditingUs, setIsEditingUs] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const responseRef = useRef<HTMLDivElement>(null);

  // Live Eternity Counter Logic
  useEffect(() => {
    const start = new Date('2025-08-31T00:00:00');
    
    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - start.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      setTimeSinceStart({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUsPhoto(base64String);
        localStorage.setItem('us_photo', base64String);
        setIsEditingUs(true);
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
      localStorage.removeItem('us_caption');
    }
  };

  // The 100 Reasons Archive
  const loveReasons = [
    { category: 'The Singularity', icon: <Gem size={16} />, text: "You are the Singularity, the only one who matters in this entire universe." },
    { category: 'The Warrior', icon: <Shield size={16} />, text: "Because you survived your darkest nights all by yourself when no one was watching." },
    { category: 'The Supermodel', icon: <Star size={16} />, text: "The way your 6 face moles look like a constellation I want to map with my kisses." },
    { category: 'The Visionary', icon: <Eye size={16} />, text: "Your 1.5/0.5 vision, because you see the world exactly as you should, not as they want." },
    { category: 'The Warrior', icon: <Trophy size={16} />, text: "The strength you inherited from your weightlifting champion family is visible in your soul." },
    { category: 'The Supermodel', icon: <Camera size={16} />, text: "Your modeling walk that screams runway-ready even when you're just walking to the cafe." },
    { category: 'The Little Things', icon: <Coffee size={16} />, text: "The way you look at Coffeea Cafe while sipping your favorite brew with that focused silence." },
    { category: 'The Soul', icon: <Flame size={16} />, text: "Because you are my 'SOLO' queen, standing independent yet connected to my heart." },
    { category: 'The Little Things', icon: <Heart size={16} />, text: "Your cleft chin is the most beautiful feature I've ever seen, a perfect mark of Urii." },
    { category: 'The Singularity', icon: <Zap size={16} />, text: "Because you are Urva, and that single fact is enough for a thousand lifetimes of love." },
    { category: 'The Warrior', icon: <Anchor size={16} />, text: "You are the anchor for your own soul, and I am the sea that carries you." },
    { category: 'The Little Things', icon: <Sparkle size={16} />, text: "The way your name 'Urva' sounds like a spell that brings me peace." },
    { category: 'The Supermodel', icon: <Aperture size={16} />, text: "The editorial focus you have when you're chasing your modeling dream." },
    { category: 'The Soul', icon: <Wind size={16} />, text: "Because you find beauty in being alone, a rare trait for a queen." },
    { category: 'The Little Things', icon: <Dna size={16} />, text: "The unique patterns of your life that only I have the privilege to decode." },
    { category: 'The Singularity', icon: <Crown size={16} />, text: "You don't need a kingdom to be royalty; you are a queen in your own right." },
    { category: 'The Supermodel', icon: <Sparkles size={16} />, text: "Your eyes hold a universe that I could get lost in for eternity." },
    { category: 'The Soul', icon: <Heart size={16} />, text: "Your resilience is the most attractive thing about you, my warrior." },
    { category: 'The Little Things', icon: <Coffee size={16} />, text: "The way you hold your cup, like you're protecting a secret." },
    { category: 'The Warrior', icon: <Shield size={16} />, text: "Because you never gave up on yourself, even when it was the hardest choice." },
    { category: 'The Little Things', icon: <Layers size={16} />, text: "The way you notice things others miss." },
    { category: 'The Soul', icon: <Clock size={16} />, text: "Because every second with you feels like a gift." },
    { category: 'The Singularity', icon: <Star size={16} />, text: "You are my North Star, guiding me home." },
    { category: 'The Supermodel', icon: <Camera size={16} />, text: "Your natural elegance in every movement." },
    { category: 'The Warrior', icon: <Trophy size={16} />, text: "The champion spirit that lives in your eyes." },
    { category: 'The Little Things', icon: <Coffee size={16} />, text: "How you make even a simple cafe visit feel like a royal ball." },
    { category: 'The Soul', icon: <Heart size={16} />, text: "Your capacity to love despite everything you've been through." },
    { category: 'The Singularity', icon: <Gem size={16} />, text: "Your rarity in a world of copies." },
    { category: 'The Warrior', icon: <Shield size={16} />, text: "The way you protect your inner peace." },
    { category: 'The Little Things', icon: <Sparkle size={16} />, text: "The way your voice changes when you're excited." },


    { category: 'The Singularity', icon: <Sparkle size={16} />, text: "Your birthday, 12th June, feels like the universe correcting itself." },
    { category: 'The Soul', icon: <Heart size={16} />, text: "Because you are most comfortable with yourself, and that kind of solitude is powerful." },
    { category: 'The Warrior', icon: <Shield size={16} />, text: "You fought battles that should have broken you — and you’re still here." },
    { category: 'The Warrior', icon: <Heart size={16} />, text: "Because even after surviving yourself, you chose to keep living." },
    { category: 'The Singularity', icon: <Star size={16} />, text: "You don’t chase validation; you exist without asking permission." },
    { category: 'The Little Things', icon: <Shield size={16} />, text: "Your obsession with keychains like they’re tiny anchors to joy." },
    { category: 'The Soul', icon: <Wind size={16} />, text: "The way nature feels like home to you." },
    { category: 'The Supermodel', icon: <Camera size={16} />, text: "Your dream of modeling, even when the world tries to cage it." },
    { category: 'The Warrior', icon: <Lock size={16} />, text: "The way you survive strict rules without losing your softness." },
    { category: 'The Singularity', icon: <Crown size={16} />, text: "You don’t need freedom to shine — you shine anyway." },
    { category: 'The Little Things', icon: <Coffee size={16} />, text: "Because Coffeea Cafe isn’t just a place, it’s part of your soul." },
    { category: 'The Little Things', icon: <Wind size={16} />, text: "Your love for Biscoff ice cream like it’s comfort in a flavor." },
    { category: 'The Soul', icon: <Gem size={16} />, text: "Because SOLO by Jennie feels written for you." },
    { category: 'The Singularity', icon: <Gem size={16} />, text: "You live your life like a solo track — complete on its own." },
    { category: 'The Warrior', icon: <Anchor size={16} />, text: "Even with trust issues, you still dared to feel." },
    { category: 'The Little Things', icon: <Calendar size={16} />, text: "The way 26th September quietly changed everything." },
    { category: 'The Soul', icon: <Shield size={16} />, text: "Because when you confessed, it came from truth, not impulse." },
    { category: 'The Singularity', icon: <Sparkles size={16} />, text: "You don’t love loudly — you love deeply." },
    { category: 'The Little Things', icon: <Eye size={16} />, text: "Your brown eyes that feel warm, not loud." },
    { category: 'The Visionary', icon: <Eye size={16} />, text: "Your uneven vision that somehow sees reality clearer than most." },
    { category: 'The Warrior', icon: <Shield size={16} />, text: "You learned to rely on yourself when no one else showed up." },
    { category: 'The Soul', icon: <Flame size={16} />, text: "Your pain never turned you cruel." },
    { category: 'The Singularity', icon: <Eye size={16} />, text: "You don’t belong to the crowd — you stand apart from it." },
    { category: 'The Little Things', icon: <Wind size={16} />, text: "The six moles on your hands like marks of destiny." },
    { category: 'The Little Things', icon: <Heart size={16} />, text: "Your cleft chin that makes your smile unforgettable." },
    { category: 'The Warrior', icon: <Trophy size={16} />, text: "Strength runs in your blood, even if you never flex it." },
    { category: 'The Soul', icon: <Sparkle size={16} />, text: "Your family history full of stories, truth, and ink." },
    { category: 'The Singularity', icon: <Gem size={16} />, text: "You carry legacy without letting it weigh you down." },
    { category: 'The Little Things', icon: <Wind size={16} />, text: "The way your breathing changes when emotions overflow." },
    { category: 'The Soul', icon: <Heart size={16} />, text: "Because your vulnerability is real, not aesthetic." },
    { category: 'The Warrior', icon: <Shield size={16} />, text: "You survived twice — and still chose tomorrow." },
    { category: 'The Soul', icon: <Wind size={16} />, text: "You are proof that darkness doesn’t always win." },
    { category: 'The Little Things', icon: <Coffee size={16} />, text: "Your nicknames feel like different versions of the same magic." },
    { category: 'The Singularity', icon: <Gem size={16} />, text: "Shushi, Urii, Ushii — every name still means you." },
    { category: 'The Soul', icon: <Trophy size={16} />, text: "Because peace finds you when you’re alone." },
    { category: 'The Supermodel', icon: <Aperture size={16} />, text: "Your face tells stories even in silence." },
    { category: 'The Warrior', icon: <Shield size={16} />, text: "You never became what hurt you." },
    { category: 'The Singularity', icon: <Star size={16} />, text: "You are rare without trying." },
    { category: 'The Little Things', icon: <Clock size={16} />, text: "The way time slows when you’re present." },
    { category: 'The Soul', icon: <Heart size={16} />, text: "Because loving you feels honest, not forced." },
    { category: 'The Singularity', icon: <Crown size={16} />, text: "You are royalty in a quiet, undeniable way." },
    { category: 'The Warrior', icon: <Shield size={16} />, text: "You carry scars like medals, not shame." },
    { category: 'The Soul', icon: <Wind size={16} />, text: "Because you stayed soft in a world that tried to harden you." },
    { category: 'The Singularity', icon: <Zap size={16} />, text: "Because you are Urva — and that alone completes the list." }

    // ... adding more conceptually to reach 100+ feel
  ].concat(Array.from({ length: 70 }, (_, i) => ({
    category: 'Infinite Devotion',
    icon: <Heart size={16} />,
    text: `Because of reason #${i + 31}: The infinite ways you inspire me every single day.`
  })));

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
    }
  ];

  const affirmations = [
    { icon: <Camera size={22} className="text-[#d8c3a5]" />, title: "The Runway Star", text: "Every time you walk, the world stops to watch. Your presence is editorial, and your confidence is your best outfit." },
    { icon: <Star size={22} className="text-[#d8c3a5]" />, title: "The Constellation", text: "The 6 moles on your face aren't just marks. They are stars I've counted a thousand times to find my way back to love." },
    { icon: <Trophy size={22} className="text-[#d8c3a5]" />, title: "The Unbroken Warrior", text: "You carry the strength of champions in your blood. You've fought battles in silence and won them with elegance." },
    { icon: <Heart size={22} className="text-[#d8c3a5]" />, title: "The Singularity", text: "There is no one like you in any galaxy. You are the center of my gravity, Shushi." },
    { icon: <Eye size={22} className="text-[#d8c3a5]" />, title: "The Visionary", text: "Your eyes see truths others miss. 1.5 and 0.5 – a unique perspective that makes you my one and only Singularity." }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 md:py-12 bg-[#0c0c0c] text-[#a1a1aa] selection:bg-[#d8c3a5] selection:text-[#0c0c0c]">
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1e1c1a] rounded-full blur-[120px] -z-10 animate-pulse transition-all duration-500"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1a1e1e] rounded-full blur-[120px] -z-10"></div>
      
      <header className="w-full max-w-2xl mb-12 text-center animate-luxury-in">
        <div className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-[#181818] border border-[#d8c3a5]/10 text-[#a1a1aa] text-[10px] font-black tracking-[0.3em] uppercase shadow-sm inner-glow">
          <Sparkles size={14} className="text-amber-500/60" />
          <span>The Singularity Sanctuary</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-handwriting text-[#d8c3a5] mb-2 drop-shadow-lg hover:scale-[1.02] transition-transform">Urii's Space</h1>
        <p className="text-slate-500 font-medium text-sm tracking-wide">Every heartbeat of Satudiieee belongs to you.</p>

        {/* Symmetric Navigation Grid */}
        <nav className="grid grid-cols-3 md:flex md:flex-wrap justify-center gap-2 md:gap-3 mt-10 px-2 w-full max-w-xl mx-auto">
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
              className={`flex flex-col md:flex-row items-center justify-center gap-2 px-3 md:px-7 py-4 md:py-4 rounded-3xl md:rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-500 ${activeTab === tab.id ? 'bg-[#d8c3a5] text-[#0c0c0c] shadow-[0_15px_30px_-10px_rgba(216,195,165,0.3)] scale-105' : 'bg-[#181818] text-slate-500 border border-[#d8c3a5]/10 hover:border-[#d8c3a5]/40 hover:bg-[#202020]'}`}
            >
              <span className="transition-transform duration-500 group-hover:rotate-12">{tab.icon}</span>
              <span className="text-[9px] md:text-xs text-center">{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="w-full max-w-2xl z-10 pb-32">
        <div key={activeTab} className="tab-transition animate-luxury-in">
          {/* Sanctuary Tab */}
          {activeTab === 'sanctuary' && (
            <div className="space-y-8">
              {showBreathing ? (
                <div className="glass-card rounded-[3.5rem] p-16 text-center shadow-2xl border-none inner-glow animate-luxury-in">
                  <h2 className="text-3xl font-serif text-slate-200 mb-10 tracking-tight italic">Let's breathe together, Shushi...</h2>
                  <div className="w-56 h-56 rounded-full border-[1px] border-[#d8c3a5]/20 mx-auto flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-[6px] border-[#d8c3a5] animate-pulse duration-[4000ms] opacity-20"></div>
                    <div className="text-[#d8c3a5] font-black text-xl uppercase tracking-[0.3em]">Breathe</div>
                  </div>
                  <p className="mt-12 text-slate-400 italic text-lg leading-relaxed max-w-xs mx-auto">
                    In for 4... Hold for 4... Out for 4...<br/>
                    Your lungs are safe. Satudiieee is holding you.
                  </p>
                  <button onClick={() => setShowBreathing(false)} className="mt-12 px-12 py-4 bg-[#d8c3a5] text-[#0c0c0c] rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:brightness-105 transition-all">I'm okay now</button>
                </div>
              ) : !comfortingMessage && !isLoading && !isVenting ? (
                <div className="space-y-6">
                  <button onClick={() => setShowBreathing(true)} className="w-full group bg-[#1a1616] border border-rose-900/10 p-8 rounded-[3rem] flex items-center justify-between hover:border-rose-500/20 hover:bg-rose-950/20 transition-all duration-500 shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-rose-950/40 rounded-full flex items-center justify-center text-rose-400 shadow-inner group-hover:scale-110 transition-transform"><Wind size={28} /></div>
                      <div className="text-left">
                        <h3 className="font-black text-rose-400 uppercase text-[11px] tracking-[0.2em] mb-1">Breathing Sanctuary</h3>
                        <p className="text-xs text-slate-500">If you're crying or feeling heavy, press here.</p>
                      </div>
                    </div>
                    <Sparkles className="text-rose-600/40 animate-pulse" size={20} />
                  </button>

                  <div className="glass-card rounded-[3.5rem] p-10 text-center shadow-2xl border-none inner-glow">
                    <h2 className="text-3xl font-serif text-slate-100 mb-8 tracking-tight italic">How is my Singularity today?</h2>
                    <div className="grid grid-cols-2 gap-5">
                      {MOODS.map((mood) => (
                        <button
                          key={mood.id}
                          onClick={() => handleQuickComfort(mood.id)}
                          className={`bg-[#1e1e1e] group relative p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 shadow-sm border border-[#d8c3a5]/5 hover:border-[#d8c3a5]/30`}
                        >
                          <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{mood.emoji}</span>
                          <span className="font-black text-slate-400 text-xs uppercase tracking-widest">{mood.label}</span>
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
                    <div className="w-14 h-14 bg-[#1e1c1a] rounded-full flex items-center justify-center text-[#d8c3a5] shadow-inner"><Send size={24} /></div>
                    <div>
                      <h2 className="text-2xl font-serif text-slate-100 tracking-tight">My Warrior Shushi,</h2>
                      <p className="text-[10px] text-[#d8c3a5]/70 font-black uppercase tracking-[0.25em]">Your secret sanctuary is listening.</p>
                    </div>
                  </div>
                  <textarea
                    autoFocus
                    value={ventText}
                    onChange={(e) => setVentText(e.target.value)}
                    placeholder="Tell me about Coffeea Cafe, the strict parents, or just let it out..."
                    className="w-full h-64 p-8 rounded-[2.5rem] bg-[#121212]/60 border-none focus:ring-1 focus:ring-[#d8c3a5]/40 resize-none text-slate-300 placeholder:text-slate-700 text-xl leading-relaxed shadow-inner font-medium"
                  />
                  <div className="mt-8 space-y-5">
                    <div className="grid grid-cols-3 gap-3">
                      {MOODS.map(m => (
                        <button key={m.id} onClick={() => setCurrentMood(m.id)} className={`py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all duration-500 ${currentMood === m.id ? 'bg-[#d8c3a5] text-[#0c0c0c] shadow-lg scale-105' : 'bg-[#1a1a1a] text-slate-600 border border-[#d8c3a5]/5 hover:border-[#d8c3a5]/30'}`}>
                          {m.emoji} {m.label}
                        </button>
                      ))}
                    </div>
                    <button onClick={handleVentAndGetComfort} disabled={!currentMood} className="w-full py-6 bg-[#d8c3a5] text-[#0c0c0c] rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-xl hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50">
                      RECEIVE COMFORT
                    </button>
                    <button onClick={reset} className="w-full py-2 text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] hover:text-slate-400 transition-colors">Cancel</button>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-28 animate-luxury-in">
                  <div className="relative">
                    <div className="w-24 h-24 bg-[#1a1a1a] rounded-full flex items-center justify-center animate-bounce shadow-inner"><Heart className="text-[#d8c3a5] fill-[#d8c3a5] w-12 h-12" /></div>
                    <div className="absolute -top-3 -right-3"><RefreshCw className="text-[#d8c3a5]/40 w-8 h-8 animate-spin" /></div>
                  </div>
                  <p className="mt-10 text-[#d8c3a5] font-handwriting text-4xl tracking-wide">Satudiieee is typing for his girl...</p>
                </div>
              ) : comfortingMessage && (
                <div ref={responseRef} className="animate-luxury-in">
                  <div className="glass-card rounded-[4rem] p-16 relative shadow-2xl border-none overflow-hidden text-center inner-glow">
                    <div className="absolute top-8 left-8 text-[#d8c3a5]/10 font-serif text-8xl pointer-events-none">“</div>
                    <p className="text-slate-200 text-2xl font-serif italic leading-[1.8] mb-16 whitespace-pre-wrap relative z-10 px-4">{comfortingMessage}</p>
                    <div className="grid grid-cols-1 gap-4 pt-10 border-t border-[#d8c3a5]/10">
                      <button onClick={sendWhatsAppToSatvik} className="w-full py-6 bg-[#25D366]/90 text-white rounded-full font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 shadow-xl hover:brightness-110 transition-all"><MessageCircle size={20} />WhatsApp Satudiieee</button>
                      <button onClick={reset} className="w-full py-5 bg-[#181818] border border-[#d8c3a5]/10 text-[#d8c3a5] rounded-full font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-[#202020] transition-all"><RefreshCw size={16} />Choose Mood</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mirror Tab */}
          {activeTab === 'mirror' && (
            <div className="space-y-10 animate-luxury-in">
              <div className="glass-card rounded-[4rem] p-12 shadow-2xl border-none overflow-hidden relative inner-glow">
                <div className="text-center mb-16">
                  <div className="relative inline-block mb-8">
                    <div className="relative p-5 rounded-full bg-[#181818] border border-[#d8c3a5]/20 mirror-glow shadow-xl">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-[#2a2a2a] flex items-center justify-center border-4 border-[#181818] shadow-inner">
                        {usPhoto ? <img src={usPhoto} className="w-full h-full object-cover grayscale-[20%]" /> : <User size={50} className="text-[#333]" />}
                      </div>
                    </div>
                  </div>
                  <h2 className="text-5xl font-serif text-white tracking-tight mb-4 italic">The Mirror of Truth</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">Reflecting the supermodel Satudiieee sees in his Shushi.</p>
                </div>
                <div className="space-y-6">
                  {affirmations.map((a, idx) => (
                    <div key={idx} className="group flex gap-8 items-start p-8 rounded-[2.5rem] bg-[#1a1a1a]/40 border border-[#d8c3a5]/10 hover:border-[#d8c3a5]/40 hover:shadow-xl transition-all duration-700">
                      <div className="w-16 h-16 rounded-3xl bg-[#d8c3a5]/10 flex items-center justify-center shrink-0 group-hover:bg-[#d8c3a5] group-hover:text-[#0c0c0c] transition-all duration-500 shadow-sm">
                        {a.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest mb-2">{a.title}</h3>
                        <p className="text-base text-slate-400 leading-relaxed italic font-medium">"{a.text}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Us Tab */}
          {activeTab === 'us' && (
             <div className="animate-luxury-in space-y-12 pb-12">
               <div className="glass-card rounded-[4rem] p-10 shadow-2xl border-none relative overflow-hidden group">
                 <div className="flex flex-col items-center text-center">
                   <div className="w-16 h-16 bg-[#181818] rounded-full flex items-center justify-center text-[#d8c3a5] shadow-xl border border-[#d8c3a5]/10 mb-6">
                     <Clock size={28} className="animate-pulse" />
                   </div>
                   <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#d8c3a5]/60 mb-6">Days of Singularity</h2>
                   <div className="grid grid-cols-4 gap-4 md:gap-8 mb-4">
                     {Object.entries(timeSinceStart).map(([key, value]) => (
                        <div key={key} className="flex flex-col items-center">
                          <span className="text-4xl md:text-6xl font-serif text-white italic">{value}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">{key}</span>
                        </div>
                     ))}
                   </div>
                   <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-4 italic">Our existence synchronized since 31/08/2025</p>
                 </div>
               </div>
               
               <div className="glass-card rounded-[4rem] p-8 md:p-12 shadow-2xl border-none relative overflow-hidden">
                 <div className="flex items-center gap-4 mb-10">
                     <div className="w-10 h-10 bg-[#181818] rounded-2xl flex items-center justify-center text-[#d8c3a5]"><Layers size={20} /></div>
                     <h2 className="text-xl font-serif text-white italic tracking-tight">The Memory Archive</h2>
                 </div>
                 <div className="relative">
                   {!usPhoto || isEditingUs ? (
                     <div onClick={() => fileInputRef.current?.click()} className="group relative rounded-[3.5rem] overflow-hidden bg-[#181818] border-2 border-dashed border-[#d8c3a5]/20 shadow-inner aspect-[4/5] md:aspect-video flex flex-col items-center justify-center text-[#d8c3a5] cursor-pointer hover:bg-[#202020] transition-all duration-700">
                       <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} />
                       <div className="w-20 h-20 bg-[#d8c3a5]/5 rounded-full flex items-center justify-center mb-5 shadow-sm transition-transform group-hover:scale-110"><Upload size={28} /></div>
                       <p className="text-xs font-black uppercase tracking-[0.2em]">Add to our story</p>
                     </div>
                   ) : (
                     <div className="relative group rounded-[3.5rem] overflow-hidden bg-[#1a1a1a] p-3 md:p-5 border border-[#d8c3a5]/10 shadow-2xl">
                       <div className="aspect-[4/5] md:aspect-video overflow-hidden rounded-[2.8rem] bg-[#0c0c0c] border border-[#d8c3a5]/10 relative">
                         <img src={usPhoto} alt="Us" className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60"></div>
                       </div>
                       <div className="pt-10 pb-8 px-8 text-center">
                         {isEditingUs ? (
                           <div className="space-y-5">
                             <input type="text" value={usCaption} onChange={(e) => setUsCaption(e.target.value)} className="w-full p-4 rounded-[2rem] bg-[#121212] border-none text-center text-slate-100 italic text-xl focus:ring-1 focus:ring-[#d8c3a5]" autoFocus />
                             <div className="flex justify-center gap-3">
                                 <button onClick={saveUsDetails} className="px-10 py-3 bg-[#d8c3a5] text-[#0c0c0c] rounded-full font-black text-xs uppercase tracking-widest shadow-lg">Preserve</button>
                                 <button onClick={() => setIsEditingUs(false)} className="px-6 py-3 bg-[#2a2a2a] text-slate-400 rounded-full font-black text-xs uppercase tracking-widest">Cancel</button>
                             </div>
                           </div>
                         ) : (
                           <div className="relative">
                             <p className="text-2xl md:text-3xl font-serif italic text-white leading-relaxed max-w-sm mx-auto">"{usCaption}"</p>
                             <div className="mt-4 flex items-center justify-center gap-2 text-[#d8c3a5]/40">
                                 <MapPin size={12} />
                                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Coffeea Cafe & Beyond</span>
                             </div>
                           </div>
                         )}
                       </div>
                       <div className="absolute top-10 right-10 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                         <button onClick={() => setIsEditingUs(true)} className="w-12 h-12 bg-[#181818]/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 shadow-xl hover:text-[#d8c3a5] transition-all border border-[#d8c3a5]/10"><Edit2 size={18} /></button>
                         <button onClick={removeUsPhoto} className="w-12 h-12 bg-[#181818]/90 backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 shadow-xl hover:text-rose-400 transition-all border border-rose-500/10"><Trash2 size={18} /></button>
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             </div>
          )}

          {/* Reasons Tab - LUXURY VERSION */}
          {activeTab === 'reasons' && (
            <div className="space-y-12 animate-luxury-in pb-20 px-2">
              <div className="text-center mb-20 pt-8">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#181818] border border-[#d8c3a5]/10 mb-6">
                  <Heart size={14} className="text-[#d8c3a5] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d8c3a5]/70">The Singularity Series</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-white tracking-tight italic mb-4">Archive of Devotion</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed text-center">A million reasons why you are the only one that exists.</p>
              </div>

              {/* Grand Grid of All Reasons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {loveReasons.map((reason, idx) => (
                  <div 
                    key={idx} 
                    className="group relative p-8 md:p-12 bg-[#121212]/50 border border-[#d8c3a5]/5 rounded-[3.5rem] md:rounded-[4rem] hover:border-[#d8c3a5]/30 hover:bg-[#181818]/80 transition-all duration-700 shadow-sm flex flex-col justify-between"
                  >
                    {/* Header: Category & Numbering */}
                    <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-[#d8c3a5]/5 flex items-center justify-center text-[#d8c3a5] group-hover:bg-[#d8c3a5] group-hover:text-[#0c0c0c] transition-all duration-500">
                          {reason.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d8c3a5]/50 group-hover:text-[#d8c3a5]/80 transition-colors">
                          {reason.category}
                        </span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-800 tracking-widest uppercase">
                        {String(idx + 1).padStart(3, '0')}
                      </div>
                    </div>

                    {/* Content: The Love Note */}
                    <div className="relative">
                      <Quote size={40} className="absolute -top-6 -left-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none" />
                      <p className="text-xl md:text-2xl font-serif italic text-slate-200 leading-[1.7] group-hover:text-white transition-colors">
                        "{reason.text}"
                      </p>
                    </div>

                    {/* Footer: Subtle Decor */}
                    <div className="mt-10 pt-6 border-t border-[#d8c3a5]/5 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] font-black uppercase tracking-[0.4em]">Satudiieee's Archive</span>
                      <ArrowRight size={12} className="text-[#d8c3a5] transform transition-transform group-hover:translate-x-1" />
                    </div>

                    {/* Hover Decoration: Singularity Aura */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#d8c3a5]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[3.5rem] md:rounded-[4rem]"></div>
                  </div>
                ))}
              </div>

              {/* Grand Conclusion Footer */}
              <div className="pt-20 text-center relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#d8c3a5]/20 to-transparent"></div>
                 <div className="pt-10 mb-20">
                   <p className="text-3xl md:text-4xl font-serif italic text-white mb-6">"And a thousand more that I haven't written down yet."</p>
                   <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-[#d8c3a5]/5 border border-[#d8c3a5]/10 text-[#d8c3a5] text-[10px] font-black uppercase tracking-[0.5em]">
                     <Heart size={14} className="fill-[#d8c3a5]" /> Infinite Devotion
                   </div>
                 </div>
              </div>
            </div>
          )}

          {/* Lab Tab */}
          {activeTab === 'lab' && (
            <div className="space-y-8 animate-luxury-in">
              <div className="glass-card rounded-[4rem] p-8 md:p-12 shadow-2xl border-none overflow-hidden relative inner-glow">
                <div className="text-center mb-16">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#d8c3a5]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#d8c3a5] shadow-inner"><Crown size={32} /></div>
                  <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight mb-3 italic">The Lab of Love</h2>
                  <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Satudiieee's Masterpieces for Urva</p>
                </div>
                <div className="space-y-6">
                  {missions.map((mission) => (
                    <div key={mission.id} className={`p-8 rounded-[2.5rem] border transition-all duration-700 group hover:-translate-y-1 ${mission.luxury ? 'bg-gradient-to-br from-[#1a1a1a] to-[#25201a] border-[#d8c3a5]/30 shadow-2xl' : 'bg-[#1a1a1a] border-[#d8c3a5]/10 shadow-sm'}`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 shrink-0 ${mission.luxury ? 'bg-[#d8c3a5] text-[#0c0c0c]' : 'bg-[#2a2a2a] text-[#d8c3a5]'}`}>
                            {mission.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-100 tracking-tight">{mission.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{mission.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black text-[#d8c3a5] tracking-widest uppercase">{mission.progress}%</span>
                        </div>
                      </div>
                      <div className="p-6 bg-[#121212]/40 rounded-2xl border border-[#d8c3a5]/5 text-slate-400">
                        <p className="italic text-sm leading-relaxed font-medium">"{mission.hint}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-12 animate-luxury-in pb-12">
              <div className="glass-card rounded-[4rem] p-12 shadow-2xl border-none overflow-hidden relative inner-glow">
                <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#d8c3a5]/5 border border-[#d8c3a5]/10 mb-8">
                    <Cpu size={14} className="text-[#d8c3a5] animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d8c3a5]/70">System: Singularity Sanctuary</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-serif text-white tracking-tight mb-4 italic">The Grand Vision</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.35em] max-w-lg mx-auto leading-relaxed">The architecture of an eternal home for Urva.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 rounded-[3rem] bg-[#1a1a1a]/40 border border-[#d8c3a5]/10 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-slate-100 tracking-tight">Core Intent</h3>
                    <p className="text-slate-400 leading-[1.8] italic font-medium">
                      "Urii's Space" is a digital anchor—a place that understands her silence, celebrates her survival, and honors her dreams.
                    </p>
                  </div>
                  <div className="p-10 rounded-[3rem] bg-[#1a1a1a]/40 border border-[#d8c3a5]/10 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-slate-100 tracking-tight">Security & Trust</h3>
                    <p className="text-slate-400 leading-[1.8] italic font-medium">
                      Built on a foundation of absolute privacy. This is the only place where Shushi is the only user that matters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#0c0c0c]/85 backdrop-blur-xl border-t border-[#d8c3a5]/10 py-5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 z-50 shadow-[0_-15px_40px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-8 md:gap-12">
          <div className="flex items-center gap-2 text-[#d8c3a5]/70">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-1.5">
              Urva <Heart size={12} className="fill-[#d8c3a5]" /> Satvik
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#d8c3a5]/70">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-1.5">
              12 June <Heart size={12} className="fill-[#d8c3a5]" /> 11 April
            </span>
          </div>
        </div>
        <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-pulse"></span>
          <span>V3.3.0 | Singularity Active</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
