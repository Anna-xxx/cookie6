import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, X, ArrowLeft, Globe, Heart, Briefcase, GraduationCap, Users, HeartPulse, Flame, Sparkles, Star, Moon, Sun, Cloud, Zap, Umbrella, Music, Coffee, Anchor, Key, Ghost, Crown, Gem } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/useLanguage';
import { translations } from '@/components/translations';

const PREDEFINED_THEMES = [
  { id: 'love', Icon: Heart, color: 'from-pink-400 to-rose-500' },
  { id: 'career', Icon: Briefcase, color: 'from-blue-400 to-indigo-500' },
  { id: 'education', Icon: GraduationCap, color: 'from-emerald-400 to-teal-500' },
  { id: 'family', Icon: Users, color: 'from-orange-400 to-amber-500' },
  { id: 'health', Icon: HeartPulse, color: 'from-green-400 to-lime-500' },
  { id: 'motivation', Icon: Flame, color: 'from-violet-400 to-purple-500' },
];

const CUSTOM_ICONS = {
  Sparkles, Star, Moon, Sun, Cloud, Zap, Umbrella, Music, Coffee, Anchor, Key, Ghost, Crown, Gem
};
const CUSTOM_ICON_KEYS = Object.keys(CUSTOM_ICONS);

export default function Settings() {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const [selectedThemes, setSelectedThemes] = useState(['motivation']);
  const [customTheme, setCustomTheme] = useState('');
  const [customThemesList, setCustomThemesList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('fortune_themes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedThemes(parsed);
      } catch (e) {
        setSelectedThemes(['motivation']);
      }
    }

    const savedCustom = localStorage.getItem('fortune_custom_themes');
    if (savedCustom) {
      try {
        setCustomThemesList(JSON.parse(savedCustom));
      } catch (e) {
        setCustomThemesList([]);
      }
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('fortune_themes', JSON.stringify(selectedThemes));
    localStorage.setItem('fortune_custom_themes', JSON.stringify(customThemesList));
    navigate(createPageUrl('Home'));
  };

  const toggleTheme = (id) => {
    let newSelection;
    if (selectedThemes.includes(id)) {
      if (selectedThemes.length === 1) return; // Keep at least one
      newSelection = selectedThemes.filter(t => t !== id);
    } else {
      newSelection = [...selectedThemes, id];
    }
    setSelectedThemes(newSelection);
  };

  const addCustomTheme = (e) => {
    e.preventDefault();
    if (!customTheme.trim()) return;
    
    // Pick a random icon
    const randomIconKey = CUSTOM_ICON_KEYS[Math.floor(Math.random() * CUSTOM_ICON_KEYS.length)];

    const newTheme = {
      id: `custom_${Date.now()}`,
      label: customTheme.trim(),
      iconKey: randomIconKey, // Store the string key
      color: 'from-slate-400 to-slate-600',
      isCustom: true
    };
    
    const newList = [...customThemesList, newTheme];
    setCustomThemesList(newList);
    
    // Auto-select new theme
    const newSelection = [...selectedThemes, newTheme.id];
    setSelectedThemes(newSelection);
    
    setCustomTheme('');
  };

  const removeCustomTheme = (e, id) => {
    e.stopPropagation();
    const newList = customThemesList.filter(t => t.id !== id);
    setCustomThemesList(newList);
    
    if (selectedThemes.includes(id)) {
      const newSelection = selectedThemes.filter(t => t !== id);
      if (newSelection.length === 0) newSelection.push('motivation');
      setSelectedThemes(newSelection);
    }
  };

  const handleClose = () => {
    navigate(createPageUrl('Home'));
  };

  return (
    <div className="min-h-screen bg-transparent pt-4 pb-20 px-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
            {t.settingsTitle}
        </h1>
        <button 
          onClick={handleClose}
          className="p-2 bg-indigo-950/50 backdrop-blur-md rounded-full shadow-lg border border-amber-500/30 text-amber-200 hover:text-white hover:bg-indigo-900/80 transition-colors hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* Language Selection */}
        <section>
          <h2 className="text-xl font-bold text-amber-100 mb-4 flex items-center gap-2">
             <Globe className="w-5 h-5 text-amber-400" />
             {t.languageTitle}
          </h2>
          <div className="bg-indigo-950/40 backdrop-blur-md p-1.5 rounded-xl inline-flex shadow-[0_0_15px_rgba(234,179,8,0.1)] border border-amber-500/30">
             <button 
               onClick={() => changeLanguage('ru')}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${language === 'ru' ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg' : 'text-amber-200/70 hover:text-amber-100'}`}
             >
               Русский
             </button>
             <button 
               onClick={() => changeLanguage('en')}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${language === 'en' ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg' : 'text-amber-200/70 hover:text-amber-100'}`}
             >
               English
             </button>
          </div>
        </section>

        {/* Theme Selection */}
        <section>
          <h2 className="text-xl font-bold text-amber-100 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-amber-300 to-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"/>
            {t.chooseThemes}
          </h2>
          <p className="text-amber-200/70 mb-6 text-sm">
            {t.chooseThemesSub}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...PREDEFINED_THEMES, ...customThemesList].map((theme) => {
              const isSelected = selectedThemes.includes(theme.id);
              const label = theme.isCustom ? theme.label : (t[`theme_${theme.id}`] || theme.label);
              
              // Resolve Icon: either direct component (predefined) or look up by string key (custom)
              let Icon = Sparkles;
              if (theme.Icon) {
                Icon = theme.Icon;
              } else if (theme.iconKey && CUSTOM_ICONS[theme.iconKey]) {
                Icon = CUSTOM_ICONS[theme.iconKey];
              }

              return (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleTheme(theme.id)}
                  className={`
                    relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 border
                    ${isSelected ? 'shadow-[0_0_15px_rgba(234,179,8,0.3)] border-amber-400/50 bg-indigo-900/40' : 'shadow-sm hover:shadow-[0_0_10px_rgba(234,179,8,0.1)] border-amber-500/10 bg-indigo-950/20 hover:border-amber-500/30'}
                  `}
                >
                  <div className={`
                    h-full p-4 flex flex-col items-center justify-center gap-2 text-center relative z-10
                    ${isSelected ? 'bg-gradient-to-br from-indigo-900/60 to-purple-900/60' : ''}
                  `}>
                    <Icon className={`w-8 h-8 mb-1 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${isSelected ? 'text-amber-300' : 'text-amber-400/70'}`} />
                    <span className={`font-bold text-sm ${isSelected ? 'text-amber-100' : 'text-amber-200/60'}`}>
                      {label}
                    </span>
                    
                    {/* Checkmark */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-900 p-0.5 rounded-full shadow-lg"
                        >
                          <Check className="w-3 h-3" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Remove Custom Button */}
                    {theme.isCustom && (
                      <button
                        onClick={(e) => removeCustomTheme(e, theme.id)}
                        className="absolute top-2 left-2 text-amber-500/50 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    {/* Active Bottom Bar */}
                    {isSelected && (
                      <motion.div 
                        layoutId="activeBar"
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.color}`} 
                      />
                    )}
                    </div>
                    {/* Shine Effect */}
                    {isSelected && <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-amber-200/5 pointer-events-none" />}
                    </motion.div>
                    );
                    })}
                    </div>
                    </section>

                    {/* Custom Theme Input */}
                    <section className="bg-indigo-950/40 backdrop-blur-md p-6 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.1)] border border-amber-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <h2 className="text-xl font-bold text-amber-100 mb-4 relative z-10">{t.customThemeTitle}</h2>
                    <form onSubmit={addCustomTheme} className="flex flex-col sm:flex-row gap-2 relative z-10">
                    <input
                    type="text"
                    value={customTheme}
                    onChange={(e) => setCustomTheme(e.target.value)}
                    placeholder={t.customThemePlaceholder}
                    className="w-full sm:flex-1 px-4 py-3 rounded-xl border border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-indigo-900/60 text-amber-100 placeholder-amber-400/30 transition-all"
                    />
                    <button 
                    type="submit"
                    disabled={!customTheme.trim()}
                    className="w-full sm:w-auto justify-center bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-xl font-bold hover:from-amber-500 hover:to-yellow-500 disabled:opacity-50 disabled:grayscale transition-all flex items-center gap-2 shadow-lg"
                    >
                    <Plus className="w-5 h-5" />
                    <span>{t.add}</span>
                    </button>
                    </form>
                    </section>



                    <div className="sticky bottom-4 pt-4 flex flex-col gap-3 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-none">
                    <button 
                    onClick={saveSettings}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:scale-[1.02] transition-all active:scale-95 border border-amber-300/30 text-lg tracking-wide uppercase"
                    >
                    {t.save}
                    </button>

                    <Link to={createPageUrl('Privacy')} className="text-center text-xs text-indigo-400 hover:text-white transition-colors py-2">
                    {t.privacyLink}
                    </Link>
                    </div>
        </div>
        </div>
  );
}