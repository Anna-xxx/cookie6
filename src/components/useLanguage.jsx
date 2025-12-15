import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState('ru'); // Default for hydration match

  useEffect(() => {
    // Client-side detection
    const saved = localStorage.getItem('app_language');
    if (saved) {
      setLanguage(saved);
    } else {
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang && !browserLang.startsWith('ru')) {
        setLanguage('en');
      } else {
        setLanguage('ru');
      }
    }
    
    const handleStorage = () => {
       const saved = localStorage.getItem('app_language');
       if (saved) setLanguage(saved);
    };
    
    window.addEventListener('storage', handleStorage);
    window.addEventListener('language-change', handleStorage);
    
    return () => {
        window.removeEventListener('storage', handleStorage);
        window.removeEventListener('language-change', handleStorage);
    };
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
    // Custom event to sync across components in the same window
    window.dispatchEvent(new Event('language-change'));
  };

  return { language, changeLanguage };
};