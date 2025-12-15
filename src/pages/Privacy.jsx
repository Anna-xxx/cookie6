import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/useLanguage';
import { translations } from '@/components/translations';

export default function Privacy() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="pt-8 pb-20 px-4 min-h-[80vh]">
       <div className="max-w-2xl mx-auto">
         <Link to={createPageUrl('Home')} className="inline-flex items-center text-indigo-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.backToHome}
         </Link>

         <h1 className="text-2xl md:text-3xl font-black text-indigo-100 mb-8 drop-shadow-[0_0_15px_rgba(165,180,252,0.5)]">{t.legalTitle}</h1>

         <div className="bg-indigo-950/40 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-sm border border-indigo-500/30 space-y-8 text-indigo-200 leading-relaxed">
            <section>
                <h2 className="text-xl font-bold text-indigo-100 mb-3">{t.disclaimerTitle}</h2>
                <p className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/30 text-indigo-100 font-medium shadow-inner">
                    {t.disclaimerText}
                </p>
                <p className="mt-3 text-sm text-indigo-300">
                    {t.disclaimerSub}
                </p>
            </section>

            <div className="w-full h-px bg-indigo-500/20" />

            <section>
                <h2 className="text-xl font-bold text-indigo-100 mb-3">{t.privacyTitle}</h2>
                <div className="space-y-4">
                    <p>
                        {t.privacyIntro}
                    </p>
                    <div>
                        <h3 className="font-bold text-indigo-100 mb-1">{t.dataCollectionTitle}</h3>
                        <p>
                            {t.dataCollectionText}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-indigo-100 mb-1">{t.cookiesTitle}</h3>
                        <p>
                            {t.cookiesText}
                        </p>
                    </div>
                </div>
            </section>
         </div>

         <div className="mt-8 text-center text-xs text-indigo-400/60">
            {t.copyright}
         </div>
       </div>
    </div>
  );
}