
import React, { useState, useRef, useEffect } from 'react';
import { AgeGroup, ChatMessage, TeacherPreferences, ThemeExplanation } from './types';
import { THEMES, THEME_EXPLANATIONS, MODEL_OKKE_INFO, THEORY_IPS, STPPA_INFO, STPPA_AGE_DETAILS } from './constants';
import { generateSocaResponse } from './services/geminiService';

const AGE_GROUP_CARDS = [
  { group: AgeGroup.TPA_0_1, icon: '🍼', color: 'bg-rose-100', text: 'rose-600', label: 'TPA 0-1 Thn' },
  { group: AgeGroup.TPA_1_2, icon: '🧸', color: 'bg-orange-100', text: 'orange-600', label: 'TPA 1-2 Thn' },
  { group: AgeGroup.KOBER_2_3, icon: '🧩', color: 'bg-amber-100', text: 'amber-600', label: 'Kober 2-3 Thn' },
  { group: AgeGroup.KOBER_3_4, icon: '🎨', color: 'bg-emerald-100', text: 'emerald-600', label: 'Kober 3-4 Thn' },
  { group: AgeGroup.TK_A, icon: '🎒', color: 'bg-sky-100', text: 'sky-600', label: 'TK A 4-5 Thn' },
  { group: AgeGroup.TK_B, icon: '🏫', color: 'bg-indigo-100', text: 'indigo-600', label: 'TK B 5-6 Thn' },
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showOKKEModal, setShowOKKEModal] = useState(false);
  const [showIPSModal, setShowIPSModal] = useState(false);
  const [showSTPPADetailModal, setShowSTPPADetailModal] = useState<AgeGroup | null>(null);
  const [prefs, setPrefs] = useState<TeacherPreferences>({
    desa: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    ageGroup: AgeGroup.TK_A,
    theme: THEMES[1]
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent, customMessage?: string) => {
    e?.preventDefault();
    
    const locationInfo = (prefs.desa && prefs.kecamatan && prefs.kabupaten && prefs.provinsi) 
      ? `di Desa/Kelurahan ${prefs.desa}, Kecamatan ${prefs.kecamatan}, ${prefs.kabupaten}, Provinsi ${prefs.provinsi}`
      : '(lokasi belum lengkap)';

    const content = customMessage || `Halo SocaPAUD, saya guru ${locationInfo} mengajar jenjang ${prefs.ageGroup}. Saya ingin merancang kegiatan dengan tema "${prefs.theme}". Tolong buatkan rencana kegiatan menggunakan Model OKKE dengan fokus pada integrasi Studi Sosial.`;
    
    const newUserMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await generateSocaResponse(
        content, 
        messages.map(m => ({ role: m.role, content: m.content }))
      );

      if (response === "ERROR_API_KEY_RESET") {
          alert("Kunci API bermasalah. Silakan hubungi administrator.");
          setIsLoading(false);
          return;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Mohon maaf, terjadi gangguan koneksi. Mari kita coba lagi.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickChat = (text: string) => {
      const newUserMessage: ChatMessage = {
          role: 'user',
          content: text,
          timestamp: Date.now()
      };
      setMessages(prev => [...prev, newUserMessage]);
      setIsLoading(true);
      generateSocaResponse(text, messages.map(m => ({ role: m.role, content: m.content })))
          .then(res => {
              setMessages(prev => [...prev, { role: 'assistant', content: res, timestamp: Date.now() }]);
          })
          .finally(() => setIsLoading(false));
  };

  const handleAgeGroupSelect = (group: AgeGroup) => {
    setPrefs(prev => ({ ...prev, ageGroup: group }));
    setShowSTPPADetailModal(group);
  };

  const confirmAgeSelection = () => {
    const group = showSTPPADetailModal;
    if (!group) return;
    
    setShowSTPPADetailModal(null);
    const locationInfo = (prefs.desa && prefs.kecamatan && prefs.kabupaten && prefs.provinsi) 
      ? `di Desa/Kelurahan ${prefs.desa}, Kecamatan ${prefs.kecamatan}, ${prefs.kabupaten}, Provinsi ${prefs.provinsi}`
      : '(lokasi belum ditentukan)';
      
    handleQuickChat(`Halo SocaPAUD, saya ingin merancang kegiatan untuk jenjang ${group} ${locationInfo}. Fokuskan pada integrasi Studi Sosial menggunakan Model OKKE.`);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Teks berhasil disalin ke clipboard!");
    });
  };

  const formatContentForPrint = (text: string) => {
    return text
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\s*\*\s+(.*$)/gm, '<li>$1</li>')
      .replace(/^\s*-\s+(.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>');
  };

  const handlePrint = (content: string) => {
    const printArea = document.getElementById('print-area');
    if (!printArea) return;
    const formattedHtml = formatContentForPrint(content);
    printArea.innerHTML = `
      <div class="print-header">
        <h1 style="font-size: 22pt; font-weight: 800; margin-bottom: 2px;">Rencana Kegiatan Model OKKE</h1>
        <p style="font-size: 10pt; font-weight: bold; margin-bottom: 5px; color: #333;">SocaPAUD - Social & Culture Assistant for PAUD</p>
        <p style="font-size: 9pt; color: #666; margin: 0;">Integrasi Kurikulum & Kearifan Etnopedagogi</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; background: #f4f4f4; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
        <div>
          <p style="font-size: 7pt; text-transform: uppercase; color: #555; font-weight: 800; margin: 0;">📍 Lokasi Satuan PAUD</p>
          <p style="font-size: 10pt; font-weight: bold; margin: 2px 0 0 0;">${prefs.desa || '-'}, ${prefs.kecamatan || '-'}, ${prefs.kabupaten || '-'}, ${prefs.provinsi || '-'}</p>
        </div>
        <div>
          <p style="font-size: 7pt; text-transform: uppercase; color: #555; font-weight: 800; margin: 0;">🧒 Kelompok Usia</p>
          <p style="font-size: 10pt; font-weight: bold; margin: 2px 0 0 0;">${prefs.ageGroup}</p>
        </div>
        <div style="grid-column: span 2;">
          <p style="font-size: 7pt; text-transform: uppercase; color: #555; font-weight: 800; margin: 0;">📖 Tema Pembelajaran</p>
          <p style="font-size: 10pt; font-weight: bold; margin: 2px 0 0 0;">${prefs.theme}</p>
        </div>
      </div>
      <div class="prose-print" style="font-family: 'Times New Roman', serif;">
        <p>${formattedHtml}</p>
      </div>
      <div class="print-footer">
        <p style="font-weight: bold; margin-bottom: 2px;">Pengembang: Huriah Rachmah, PG PAUD, Unisba</p>
        <p style="margin: 0;">Dicetak pada: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    `;
    setTimeout(() => {
      window.print();
      setTimeout(() => { printArea.innerHTML = ''; }, 1000);
    }, 500);
  };

  const currentThemeExplanation = THEME_EXPLANATIONS[prefs.theme];

  const formatMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**')) {
        return <p key={i} className="font-black text-slate-800 mt-4 mb-2 uppercase tracking-tight text-xs">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="ml-4 text-[11px] font-bold text-slate-600 leading-relaxed mb-1">{line.replace('- ', '')}</li>;
      }
      return <p key={i} className="text-[11px] text-slate-600 font-bold leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFE]">
      <header className="joyful-gradient p-5 shadow-lg flex items-center justify-between sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
            <span className="text-3xl">🧩</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">SocaPAUD</h1>
            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em] mt-1">Model OKKE Assistant</p>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/40">
            <span className="text-[10px] font-black text-slate-700">Pengembang: Huriah Rachmah, PG PAUD, Unisba</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Kiri */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
            <div 
              onClick={() => setShowOKKEModal(true)}
              className="joyful-gradient p-5 cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-xl flex items-center justify-center text-xl font-black text-slate-800">O</div>
                <h3 className="text-sm font-black tracking-tight text-slate-800 uppercase">Model OKKE</h3>
              </div>
              <span className="text-xs font-black text-slate-600 opacity-50 group-hover:opacity-100 transition-opacity">Detail ➔</span>
            </div>
            <div className="p-5 space-y-3">
              {MODEL_OKKE_INFO.pillars.map(p => (
                <div key={p.id} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0">{p.id}</div>
                  <div>
                    <p className="text-[10px] font-black text-slate-800 leading-tight uppercase">{p.name}</p>
                    <p className="text-[9px] text-slate-500 font-bold leading-tight line-clamp-2">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            onClick={() => setShowIPSModal(true)}
            className="bg-emerald-50 p-5 rounded-[2.5rem] shadow-xl border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-all group"
          >
             <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-lg">📚</div>
                <h3 className="text-[10px] font-black tracking-widest text-emerald-700 uppercase">Studi Sosial</h3>
             </div>
             <p className="text-[11px] text-emerald-900 font-black leading-snug">
               Landasan Teoretis: <br/>Prof. Nu'man Somantri
             </p>
             <p className="text-[9px] text-emerald-600 font-bold mt-1 line-clamp-2">
               {THEORY_IPS.shortDefinition}
             </p>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100">
            <h2 className="text-base font-black text-slate-800 mb-4 flex items-center gap-3">
              <span className="bg-sky-100 p-2 rounded-xl text-sky-600">🛠️</span> 
              Profil Pembelajaran
            </h2>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">📍 Desa/Kelurahan</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Sukamaju"
                    className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-100 focus:border-sky-400 focus:bg-white rounded-[1rem] outline-none transition-all font-bold text-slate-700 text-xs"
                    value={prefs.desa}
                    onChange={(e) => setPrefs({...prefs, desa: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">📍 Kecamatan</label>
                  <input 
                    type="text" 
                    placeholder="Cibeunying"
                    className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-100 focus:border-sky-400 focus:bg-white rounded-[1rem] outline-none transition-all font-bold text-slate-700 text-xs"
                    value={prefs.kecamatan}
                    onChange={(e) => setPrefs({...prefs, kecamatan: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">📍 Kota/Kab</label>
                  <input 
                    type="text" 
                    placeholder="Bandung"
                    className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-100 focus:border-sky-400 focus:bg-white rounded-[1rem] outline-none transition-all font-bold text-slate-700 text-xs"
                    value={prefs.kabupaten}
                    onChange={(e) => setPrefs({...prefs, kabupaten: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">📍 Provinsi</label>
                  <input 
                    type="text" 
                    placeholder="Jawa Barat"
                    className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-100 focus:border-sky-400 focus:bg-white rounded-[1rem] outline-none transition-all font-bold text-slate-700 text-xs"
                    value={prefs.provinsi}
                    onChange={(e) => setPrefs({...prefs, provinsi: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">🧒 Kelompok Usia</label>
                <select 
                  className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-100 focus:border-sky-400 focus:bg-white rounded-[1rem] outline-none transition-all font-bold text-slate-700 cursor-pointer text-xs"
                  value={prefs.ageGroup}
                  onChange={(e) => setPrefs({...prefs, ageGroup: e.target.value as AgeGroup})}
                >
                  {Object.values(AgeGroup).map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">📖 Tema Inti</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-100 focus:border-sky-400 focus:bg-white rounded-[1rem] outline-none transition-all font-bold text-slate-700 cursor-pointer text-xs pr-10"
                    value={prefs.theme}
                    onChange={(e) => setPrefs({...prefs, theme: e.target.value})}
                  >
                    {THEMES.map(theme => (
                      <option key={theme} value={theme}>{theme}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => setShowThemeModal(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors text-[10px]"
                  >
                    💡
                  </button>
                </div>
              </div>

              <button 
                onClick={() => handleSubmit()}
                disabled={isLoading}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-[1.2rem] shadow-lg hover:shadow-xl transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-2 text-sm"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="text-lg">✨</span> Orkestrasi
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden h-[600px] lg:h-[calc(100vh-180px)]">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth"
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-start text-center max-w-4xl mx-auto py-6">
                <div className="w-20 h-20 bg-gradient-to-tr from-sky-50 to-indigo-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-sky-100 transform rotate-3">
                  <span className="text-4xl animate-pulse">👩‍🏫</span>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2 leading-tight tracking-tight uppercase tracking-tighter">Apa yang ingin Bapak/Ibu rancang hari ini?</h3>
                
                <div className="mt-4 mb-10 bg-slate-50/80 p-6 md:p-8 rounded-[3rem] border border-slate-200 text-left max-w-3xl mx-auto shadow-inner space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                          <span>📌</span> {STPPA_INFO.title}
                        </h4>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{STPPA_INFO.regulation}</p>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md text-2xl border border-slate-100">🇮🇩</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Definisi</p>
                          <p className="text-[11px] text-slate-700 font-bold leading-relaxed">{STPPA_INFO.definition}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Fokus Utama</p>
                          <p className="text-[11px] text-slate-700 font-bold leading-relaxed">{STPPA_INFO.focus}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Perbedaan</p>
                          <p className="text-[11px] text-slate-700 font-bold leading-relaxed">{STPPA_INFO.difference}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Penggunaan</p>
                          <p className="text-[11px] text-slate-700 font-bold leading-relaxed">{STPPA_INFO.usage}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">8 Aspek Perkembangan (Permendikbudristek 5/2022)</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {STPPA_INFO.aspects.map((aspect, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-100 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                               <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-xl shadow-sm border border-slate-100/50 flex-shrink-0">
                                 {aspect.icon}
                               </div>
                               <div>
                                 <p className="text-[9px] font-black text-slate-800 leading-none mb-1 uppercase tracking-tight">{aspect.name}</p>
                                 <p className="text-[8px] font-bold text-slate-400 leading-tight">{aspect.desc}</p>
                               </div>
                            </div>
                          ))}
                      </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full px-4 max-w-3xl mb-8">
                    {AGE_GROUP_CARDS.map((card, idx) => (
                        <button 
                            key={idx}
                            onClick={() => handleAgeGroupSelect(card.group)}
                            className="flex flex-col items-center gap-2 p-4 rounded-[1.5rem] border-2 border-transparent hover:border-sky-200 hover:bg-sky-50 transition-all group active:scale-95 shadow-sm bg-white"
                        >
                            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wider text-slate-600`}>
                                {card.label}
                            </span>
                            <span className="text-[8px] font-black text-sky-500 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Detail Milestone</span>
                        </button>
                    ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-700`}
                >
                  <div className={`max-w-[95%] md:max-w-[85%] rounded-[2.5rem] p-6 md:p-8 shadow-xl relative group ${
                    msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none shadow-slate-300' 
                    : 'bg-[#FDFDFD] text-slate-800 border border-slate-50 rounded-tl-none shadow-slate-100'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-2xl flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-700 text-xl' : 'bg-sky-500 text-white shadow-lg shadow-sky-200'}`}>
                        {msg.role === 'user' ? '👤' : '🤖'}
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${msg.role === 'user' ? 'text-slate-400' : 'text-sky-600'}`}>
                        {msg.role === 'user' ? 'Guru' : 'SocaPAUD Assist'}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none prose-slate whitespace-pre-wrap leading-relaxed font-bold text-base md:text-lg">
                      {msg.content}
                    </div>

                    {msg.role === 'assistant' && (
                      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleCopy(msg.content)}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-wider transition-all border border-slate-100 active:scale-95"
                        >
                          📋 Salin Teks
                        </button>
                        <button 
                          onClick={() => handlePrint(msg.content)}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-[10px] font-black text-emerald-600 uppercase tracking-wider transition-all border border-emerald-100 shadow-sm active:scale-95"
                        >
                          📄 Cetak Rencana
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-50 rounded-tl-none shadow-2xl flex items-center gap-4">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 bg-sky-400 rounded-full animate-bounce"></div>
                     <div className="w-3 h-3 bg-sky-300 rounded-full animate-bounce delay-150"></div>
                     <div className="w-3 h-3 bg-sky-200 rounded-full animate-bounce delay-300"></div>
                   </div>
                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Orkestrasi Materi...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-slate-50/70 border-t border-slate-100 backdrop-blur-md">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem('chat-input') as HTMLInputElement;
                if (input.value.trim()) {
                  handleQuickChat(input.value);
                  input.value = '';
                }
              }}
              className="flex items-center gap-4 bg-white p-3 rounded-[2rem] shadow-2xl border border-slate-100 ring-offset-2 focus-within:ring-4 focus-within:ring-sky-100 transition-all"
            >
              <input 
                name="chat-input"
                type="text" 
                autoComplete="off"
                placeholder="Tanyakan ide kegiatan atau landasan kurikulum..."
                className="flex-1 px-6 py-4 rounded-2xl outline-none bg-transparent font-bold text-slate-700 placeholder:text-slate-300"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="p-5 bg-sky-500 hover:bg-sky-600 text-white rounded-[1.5rem] shadow-xl shadow-sky-200 transition-all disabled:opacity-50 active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
          </div>
        </div>
      </main>
      
      {showSTPPADetailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowSTPPADetailModal(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
             <div className="joyful-gradient p-10 relative">
               <button onClick={() => setShowSTPPADetailModal(null)} className="absolute top-8 right-8 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">✕</button>
               <h2 className="text-3xl font-black mb-1 leading-none uppercase tracking-tight">{showSTPPADetailModal}</h2>
               <p className="text-slate-600 font-bold opacity-80 text-xs uppercase tracking-widest mt-2">{STPPA_AGE_DETAILS[showSTPPADetailModal].summary}</p>
             </div>
             
             <div className="flex-1 overflow-y-auto p-8 space-y-3 bg-slate-50">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Milestone 8 Aspek Perkembangan (Permendikbudristek 5/2022)</h4>
                <div className="grid grid-cols-1 gap-2">
                  {STPPA_AGE_DETAILS[showSTPPADetailModal].milestones.map((m: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-4 hover:border-sky-100 transition-colors">
                       <div className="w-24 font-black text-[8px] text-sky-600 uppercase border-r border-slate-100 pr-3 flex-shrink-0 mt-1">{m.aspect}</div>
                       <div className="text-[11px] text-slate-700 font-bold leading-relaxed">{m.detail}</div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="p-8 bg-white border-t flex gap-4">
               <button onClick={() => setShowSTPPADetailModal(null)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl">Batal</button>
               <button onClick={confirmAgeSelection} className="flex-1 py-4 bg-sky-500 text-white font-black rounded-2xl shadow-lg shadow-sky-200 active:scale-95 transition-all uppercase text-[10px] tracking-widest">Pilih & Mulai Orkestrasi</button>
             </div>
          </div>
        </div>
      )}

      {showThemeModal && currentThemeExplanation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setShowThemeModal(false)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="joyful-gradient p-10 relative">
              <button onClick={() => setShowThemeModal(false)} className="absolute top-8 right-8 w-12 h-12 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center text-slate-800 transition-all shadow-sm">✕</button>
              <div className="bg-white/90 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-4 shadow-sm">Dashboard Pedagogis</div>
              <h2 className="text-4xl font-black text-slate-800 leading-tight">{currentThemeExplanation.title}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                 <span className="bg-sky-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md">Disiplin: {currentThemeExplanation.discipline}</span>
                 <span className="bg-indigo-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md">Konsep: {currentThemeExplanation.concept}</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-emerald-100 relative overflow-hidden">
                    <h3 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-3"><span className="bg-emerald-100 p-2 rounded-lg">🖋️</span> Wawasan Prof. Nu'man Somantri</h3>
                    <p className="text-slate-700 font-bold leading-relaxed italic text-[11px] border-l-4 border-emerald-200 pl-4">"{currentThemeExplanation.somantriInsight}"</p>
                  </div>
                  <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-indigo-100 relative overflow-hidden">
                    <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-3"><span className="bg-indigo-100 p-2 rounded-lg">✨</span> Relevansi Model OKKE</h3>
                    <p className="text-slate-600 font-semibold leading-relaxed text-[11px]">{currentThemeExplanation.okkeRelevance}</p>
                  </div>
                  <div className="bg-gradient-to-br from-sky-50 to-indigo-50 p-7 rounded-[2rem] shadow-sm border border-sky-100 relative overflow-hidden">
                    <h3 className="text-[11px] font-black text-sky-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-3"><span className="bg-sky-100 p-2 rounded-lg">👶</span> Penerapan Praktis di PAUD</h3>
                    <div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-white">
                      <p className="text-slate-800 font-bold leading-relaxed text-[11px]">{currentThemeExplanation.paudImplementation}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-[2.5rem] shadow-inner border border-slate-200 h-full overflow-y-auto">
                  <h3 className="text-[11px] font-black text-rose-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                    <span className="bg-rose-100 p-2 rounded-lg">🧠</span> Konteks Psikologis (Piaget, Vygotsky, Al-Ghazali)
                  </h3>
                  <div className="space-y-4">
                    {formatMarkdown(currentThemeExplanation.psychologicalContext)}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white border-t border-slate-100 text-center">
              <button onClick={() => setShowThemeModal(false)} className="px-12 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl uppercase text-xs tracking-widest">Selesai Membaca</button>
            </div>
          </div>
        </div>
      )}

      {showIPSModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowIPSModal(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-10 text-white relative">
               <button onClick={() => setShowIPSModal(false)} className="absolute top-8 right-8 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">✕</button>
               <h2 className="text-3xl font-black mb-1 leading-none uppercase tracking-tight">Prof. Nu'man Somantri</h2>
               <p className="text-emerald-100 font-bold opacity-80 text-[10px] uppercase tracking-widest mt-2">Pilar Utama Pendidikan IPS Indonesia</p>
            </div>
            <div className="p-10 space-y-6">
               <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                  <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-3">Definisi Teoretis (Organisasi Psikologis)</h4>
                  <p className="text-slate-700 font-bold italic leading-relaxed text-sm md:text-base">"{THEORY_IPS.definition}"</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Aplikasi pada Jenjang PAUD</h4>
                  <p className="text-slate-600 font-bold leading-relaxed text-sm">{THEORY_IPS.paudRelevance}</p>
               </div>
               <button onClick={() => setShowIPSModal(false)} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95 uppercase text-xs tracking-widest">Pahami Landasan IPS</button>
            </div>
          </div>
        </div>
      )}

      {showOKKEModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowOKKEModal(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 p-10 text-white relative">
               <button onClick={() => setShowOKKEModal(false)} className="absolute top-8 right-8 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">✕</button>
               <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-[1.5rem] border border-white/20 flex items-center justify-center text-3xl font-black tracking-tighter">OKKE</div>
                  <div>
                    <h2 className="text-3xl font-black leading-none uppercase tracking-tight">Model OKKE</h2>
                    <p className="text-indigo-100 font-bold opacity-80 text-[10px] uppercase tracking-[0.2em] mt-1">Orkestrasi Kurikulum & Kearifan Etnopedagogi</p>
                  </div>
               </div>
               <div className="mt-6 bg-white/10 p-5 rounded-2xl border border-white/20 shadow-inner">
                  <p className="text-white text-xs font-bold leading-relaxed italic">"{MODEL_OKKE_INFO.definition}"</p>
               </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50">
               {MODEL_OKKE_INFO.pillars.map(pillar => (
                 <div key={pillar.id} className="bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm flex items-start gap-5 hover:border-indigo-200 transition-colors">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center border border-indigo-100 shadow-sm">
                        <span className="text-2xl font-black leading-none">{pillar.id}</span>
                        <span className="text-[7px] font-black uppercase tracking-tighter mt-1">{pillar.name.slice(0,3)}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-sm mb-1 uppercase tracking-tight">{pillar.name}</h4>
                      <p className="text-slate-500 text-[10px] font-bold leading-relaxed">{pillar.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
            <div className="p-8 bg-white border-t text-center">
               <button onClick={() => setShowOKKEModal(false)} className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 active:scale-90 transition-all uppercase text-[10px] tracking-widest">Tutup Penjelasan</button>
            </div>
          </div>
        </div>
      )}

      <footer className="p-6 text-center border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">SocaPAUD &bull; Social Culture Assistant</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 text-[9px] text-slate-400 font-bold uppercase">
           <span>Pengembang: Huriah Rachmah, PG PAUD, Unisba</span>
           <span className="hidden md:block">|</span>
           <span>Model OKKE &copy; 2025</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
