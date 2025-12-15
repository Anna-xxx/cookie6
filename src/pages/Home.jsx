import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { RefreshCcw, X, Share2 } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/useLanguage';
import { translations, fortunes as fortuneDb } from '@/components/translations';

// --- Image-Based Fortune Cookie Component ---
const CookieSVG = ({ isCracked, onClick, className, customAnimation, imgSrc, brokenImgSrc }) => {
  const defaultImg = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f6255e9eff34a5bd5a9a2/0d92ef72c_before2.png";
  const defaultBroken = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f6255e9eff34a5bd5a9a2/e60e00604_after.png";

  const currentImg = imgSrc || defaultImg;
  const currentBroken = brokenImgSrc || defaultBroken;

  // Preload images to prevent flickering
  React.useEffect(() => {
      const img1 = new Image();
      img1.src = currentImg;
      const img2 = new Image();
      img2.src = currentBroken;
  }, [currentImg, currentBroken]);

  return (
    <div className={`relative cursor-pointer select-none ${className}`} onClick={onClick}>
      <AnimatePresence>
        {!isCracked ? (
           <motion.img
             key="whole"
             src={currentImg}
             alt="Fortune Cookie"
             className="w-full h-full object-contain drop-shadow-xl"
             animate={customAnimation || {}}
             whileHover={{ scale: 1.05, rotate: 3 }}
             whileTap={{ scale: 0.97 }}
             exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.1 } }}
           />
        ) : (
           <motion.div 
             key="broken"
             className="relative w-full h-full"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ type: "spring", duration: 0.4 }}
           >
             <img 
                src={currentBroken} 
                alt="Broken Fortune Cookie" 
                className="w-full h-full object-contain drop-shadow-xl"
             />
             {/* Animated Crumbs */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                 {[...Array(6)].map((_, i) => (
                   <motion.circle
                     key={`crumb-${i}`}
                     cx={150} cy={150} r={Math.random() * 4 + 2}
                     fill="#E67E22"
                     initial={{ opacity: 0 }}
                     animate={{ 
                        x: (Math.random() - 0.5) * 150,
                        y: (Math.random() - 0.5) * 150 + 50,
                        opacity: [1, 1, 0]
                     }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                   />
                 ))}
             </svg>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Full Screen Fortune Reveal ---
const FortuneReveal = ({ text, luckyNumbers, isVisible, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const handleShare = async () => {
    const shareData = {
      title: t.shareTitle,
      text: `${t.shareText}\n\n"${text}"\n\n✨ ${t.luckyNumbers}: ${luckyNumbers}\n\n${t.checkYours} ${window.location.origin}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, rotateX: 90, y: 100 }}
            animate={{ scale: 1, rotateX: 0, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative bg-[#FFFDF5] w-full max-w-md p-8 rounded-lg shadow-[0_0_50px_rgba(234,179,8,0.4)] border-y-8 border-amber-500 transform-gpu"
            onClick={(e) => e.stopPropagation()}
          >
             {/* Decorative Patterns */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-amber-400/50 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-amber-400/50 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-amber-400/50 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-amber-400/50 rounded-br-lg" />

            <div className="text-center space-y-6 my-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full opacity-50" />
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                  <p className="font-serif text-2xl md:text-3xl text-slate-800 leading-relaxed font-medium">
                    "{text}"
                  </p>
              </motion.div>

              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full opacity-50" />
              
              <div className="flex justify-center gap-2 text-xs text-amber-600/70 font-mono uppercase tracking-widest mt-4 font-bold">
                <span className="text-amber-500">{t.luckyNumbers}</span>
                <span className="text-amber-300">•</span>
                <span className="text-amber-600">{luckyNumbers}</span>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 flex gap-2">
                <button 
                  onClick={handleShare}
                  className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors border border-blue-100"
                  title="Поделиться"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={onClose}
                  className="bg-white text-slate-800 p-2 rounded-full shadow-lg hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InteractiveConfetti = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 + 2, // falling down
      size: Math.random() * 8 + 4,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFE66D'][Math.floor(Math.random() * 4)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Mouse interaction
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
            const force = (150 - dist) / 150;
            p.vx += (dx / dist) * force * 2;
            p.vy += (dy / dist) * force * 2;
        }

        // Wrap around
        if (p.y > canvas.height) p.y = -20;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;

        // Draw
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
        if (e.touches[0]) {
             mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default function Home() {
  const [cookies, setCookies] = useState([1, 2, 3]); 
  const [selectedCookieId, setSelectedCookieId] = useState(null);
  const [isCracked, setIsCracked] = useState(false);
  const [fortune, setFortune] = useState(null);
  const [luckyNumbers, setLuckyNumbers] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [themes, setThemes] = useState(['motivation']);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [customSoundUrl, setCustomSoundUrl] = useState(null);
  
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const loadGlobalSound = async () => {
      try {
        const settings = await base44.entities.AppSettings.list();
        if (settings && settings.length > 0 && settings[0].crackSoundUrl) {
          setCustomSoundUrl(settings[0].crackSoundUrl);
        }
      } catch (e) {
        console.error("Error loading global sound", e);
      }
    };
    loadGlobalSound();
  }, []);

  const getThemeLabel = (themeId) => {
    if (!themeId) return t.theme_custom;
    
    if (themeId.startsWith('custom_')) {
      try {
        const customList = JSON.parse(localStorage.getItem('fortune_custom_themes') || '[]');
        const customItem = customList.find(item => item.id === themeId);
        return customItem ? customItem.label : t.theme_custom;
      } catch (e) {
        return t.theme_custom;
      }
    }
    
    const key = `theme_${themeId}`;
    return t[key] || t.theme_custom;
  };

  useEffect(() => {
    const savedThemes = localStorage.getItem('fortune_themes');
    if (savedThemes) {
      try {
        const parsed = JSON.parse(savedThemes);
        setThemes(parsed.length > 0 ? parsed : ['motivation']);
      } catch (e) {
        setThemes(['motivation']);
      }
    }
  }, []);

  // --- Local Fortune Generation Logic ---
  const generateFortuneText = (theme) => {
      const currentFortunes = fortuneDb[language] || fortuneDb['ru'];
      
      if (theme && theme.startsWith('custom_')) {
           try {
              const customList = JSON.parse(localStorage.getItem('fortune_custom_themes') || '[]');
              const customItem = customList.find(t => t.id === theme);
              const topic = customItem ? customItem.label : "...";
              
              // Fallback if LLM fails
              const generics = currentFortunes.generics;
              return generics[Math.floor(Math.random() * generics.length)];
           } catch {
              return currentFortunes.generics[Math.floor(Math.random() * currentFortunes.generics.length)];
           }
      }

      const list = currentFortunes[theme] || currentFortunes.generics;
      return list[Math.floor(Math.random() * list.length)];
  };

  const fetchFortune = async () => {
    try {
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      setCurrentTheme(randomTheme);
      
      let text;
      if (randomTheme.startsWith('custom_')) {
          const customList = JSON.parse(localStorage.getItem('fortune_custom_themes') || '[]');
          const customItem = customList.find(t => t.id === randomTheme);
          const topic = customItem ? customItem.label : "Life";
          
          try {
             const res = await base44.integrations.Core.InvokeLLM({
                prompt: t.llmPrompt.replace('{topic}', topic),
                response_json_schema: { type: "object", properties: { fortune: { type: "string" } } }
             });
             text = res.fortune;
          } catch (err) {
             text = generateFortuneText(randomTheme);
          }
      } else {
          // Simulate a tiny delay for "thinking" feeling
          await new Promise(r => setTimeout(r, 300));
          text = generateFortuneText(randomTheme);
      }
      
      const single = Math.floor(Math.random() * 10);
      const double = Math.floor(Math.random() * 90) + 10;
      const triple = Math.floor(Math.random() * 900) + 100;
      setLuckyNumbers([single, double, triple].join(', '));

      setFortune(text);
    } catch (e) {
      const fallback = language === 'ru' ? "Удача на вашей стороне!" : "Luck is on your side!";
      setFortune(fallback);
      setLuckyNumbers("7, 77, 777");
    }
  };

  const handleCookieClick = (id) => {
    if (selectedCookieId) return;
    // Start animation immediately
    setSelectedCookieId(id);
    // Start fetching in background
    fetchFortune();
  };

  const handleCrack = () => {
    if (isCracked) return;
    setIsCracked(true);
    setShowConfetti(true);

    // Play Sound
    const defaultSound = 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c29cc81501.mp3?filename=crunch-2-89523.mp3';

    const audio = new Audio(customSoundUrl || defaultSound);
    audio.volume = 0.6;
    audio.play().catch(e => console.log("Sound play error", e));

    // Play Reveal Sound (Magical Chime)
    setTimeout(() => {
        const revealAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/24/audio_826233a78e.mp3?filename=magic-wand-6338.mp3');
        revealAudio.volume = 0.4;
        revealAudio.play().catch(() => {});
    }, 400);

    // Save to History
    if (fortune) {
        const newRecord = {
            id: Date.now(),
            text: fortune,
            date: new Date().toISOString(),
            theme: getThemeLabel(currentTheme)
        };
        
        const savedHistory = localStorage.getItem('fortune_history');
        const history = savedHistory ? JSON.parse(savedHistory) : [];
        history.unshift(newRecord);
        localStorage.setItem('fortune_history', JSON.stringify(history));
    }

    setTimeout(() => setShowConfetti(false), 3000);
  };

  const reset = () => {
    setSelectedCookieId(null);
    setIsCracked(false);
    setShowConfetti(false);
    setFortune(null);
    setLuckyNumbers(null);
    setCurrentTheme(null);
    setCookies([Date.now(), Date.now()+1, Date.now()+2]);
  };

  return (
    <div className="flex flex-col items-center min-h-[85vh] justify-between py-8">
      
      {/* Interactive Confetti */}
      {showConfetti && <InteractiveConfetti />}

      {/* Top Bar */}
      <div className="w-full flex justify-center items-center mb-8">
        <div className="bg-indigo-950/40 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/30 flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
          <span className="text-xs font-bold text-amber-200/80 uppercase tracking-wider">{t.themesLabel}</span>
          <span className="text-sm font-bold text-amber-100 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            {themes.length} {t.selected}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full relative perspective-1000">
        
        {/* Instructions */}
        <AnimatePresence>
          {!selectedCookieId && (
             <motion.h1
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0 }}
             className="text-4xl md:text-5xl font-black text-center mb-12 drop-shadow-[0_0_25px_rgba(234,179,8,0.4)]"
             >
             {t.chooseLuck.split('\n').map((line, i) => (
                <span key={i} className="bg-clip-text text-transparent bg-gradient-to-b from-amber-100 via-yellow-200 to-amber-400 block">
                    {line}
                </span>
             ))}
             </motion.h1>
          )}
        </AnimatePresence>

        {/* Cookie Selection */}
        {!selectedCookieId && (
          <div className="relative w-full max-w-md mx-auto">
              <motion.div 
                className="grid grid-cols-2 gap-8 place-items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {cookies.map((id, index) => {
                // Unique animation for each cookie
                const animations = [
                    { y: [0, -10, 0], rotate: [0, 3, 0, -3, 0] },
                    { scale: [1, 1.05, 1], rotate: [0, -2, 0, 2, 0] },
                    { y: [0, 5, 0], x: [0, 3, 0, -3, 0] },
                ];
                const anim = animations[index % animations.length];
                const isFirst = index === 0;
                
                return (
                  <motion.div
                    key={id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className={`relative ${isFirst ? 'col-span-2 mb-4' : ''}`}
                  >
                    <CookieSVG 
                      className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-[0_0_25px_rgba(251,191,36,0.3)] filter hover:drop-shadow-[0_0_35px_rgba(251,191,36,0.5)] transition-all duration-300"
                      onClick={() => handleCookieClick(id)} 
                      isCracked={false}
                      customAnimation={{
                          ...anim,
                          transition: { 
                              duration: 4 + index, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                          }
                      }}
                    />
                  </motion.div>
                );
            })}
          </motion.div>
          </div>
        )}

        {/* Selected Cookie View */}
        <AnimatePresence>
          {selectedCookieId && (
            <motion.div
              key="focus-view"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
               <div className="relative">
                 <motion.div
                    animate={!isCracked ? { 
                      y: [0, -10, 0],
                      scale: [1, 1.02, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                 >
                   <CookieSVG 
                      className="w-80 h-80 md:w-96 md:h-96"
                      isCracked={isCracked}
                      onClick={handleCrack}
                      imgSrc="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f6255e9eff34a5bd5a9a2/8f077f39e_before2.png"
                      brokenImgSrc="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f6255e9eff34a5bd5a9a2/8be3643e1_after2.png"
                   />
                 </motion.div>

                 {!isCracked && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                   >
                     <p className="text-indigo-300 text-sm animate-pulse font-medium tracking-wide">{t.tapToReveal}</p>
                   </motion.div>
                 )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fortune Modal */}
        <FortuneReveal 
          text={fortune} 
          luckyNumbers={luckyNumbers}
          isVisible={isCracked} 
          onClose={reset}
        />

      </div>
    </div>
  );
}