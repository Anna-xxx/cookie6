import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Trash2, History as HistoryIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useLanguage } from '@/components/useLanguage';
import { translations } from '@/components/translations';

export default function History() {
  const [history, setHistory] = useState([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const saved = localStorage.getItem('fortune_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing history", e);
      }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('fortune_history');
    setHistory([]);
  };

  const dateLocale = language === 'ru' ? ru : enUS;

  return (
    <div className="pt-4 pb-20 px-4 min-h-[80vh]">
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        <Link to={createPageUrl('Home')} className="p-2 bg-white rounded-full shadow-sm text-slate-600 hover:text-red-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-amber-900 flex items-center gap-2">
          <HistoryIcon className="w-6 h-6 text-amber-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600">
            {t.historyTitle}
          </span>
        </h1>
        {history.length > 0 ? (
          <button onClick={clearHistory} className="p-2 bg-white rounded-full shadow-md text-slate-400 hover:text-red-500 transition-colors border border-amber-100">
            <Trash2 className="w-5 h-5" />
          </button>
        ) : <div className="w-9" />}
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <AnimatePresence>
          {history.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-slate-400 bg-white/50 rounded-2xl border border-red-50"
            >
              <p>{t.emptyHistory}</p>
              <p className="text-sm mt-2">{t.emptyHistorySub}</p>
            </motion.div>
          ) : (
            history.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-yellow-400 to-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {item.date ? format(new Date(item.date), 'd MMMM yyyy, HH:mm', { locale: dateLocale }) : t.unknownDate}
                  {item.theme && (
                    <span className="ml-auto bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                      {item.theme}
                    </span>
                  )}
                </div>
                <p className="text-lg text-slate-800 font-serif leading-relaxed">
                  "{item.text}"
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}