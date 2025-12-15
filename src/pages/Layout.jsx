
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Home, Sparkles, Volume2, VolumeX, History } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/useLanguage';
import { translations } from '@/components/translations';

export default function Layout({ children }) {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-[#1e1b4b] to-[#0f0f20] text-amber-50 overflow-hidden relative font-sans selection:bg-amber-500/40">

      {/* Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         {/* Golden Nebula Effect */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(253,224,71,0.05),transparent_60%)]"></div>
         <div className="absolute top-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(234,179,8,0.15),transparent_70%)]"></div>
         
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40"></div>
         {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_4px_white]"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6 flex justify-center items-center w-full">
        <Link to={createPageUrl('Home')} className="text-4xl font-black tracking-tighter hover:scale-105 transition-transform">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-100 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]">
            {t.appTitle}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] ml-2">
            {t.appTitleHighlight}
          </span>
        </Link>

        <div className="absolute right-4 top-4 flex flex-col gap-2">
           <Link to={createPageUrl('History')}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full transition-all ${
                location.pathname.includes('History') 
                  ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                  : 'bg-white/10 backdrop-blur-md text-indigo-200 hover:text-white hover:bg-white/20 shadow-sm border border-white/10'
              }`}
            >
              <History className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link to={createPageUrl('Settings')}>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full transition-all ${
                location.pathname.includes('Settings') 
                  ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                  : 'bg-white/10 backdrop-blur-md text-indigo-200 hover:text-white hover:bg-white/20 shadow-sm border border-white/10'
              }`}
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        {children}
      </main>
    </div>
  );
}
