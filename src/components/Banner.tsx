import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { AlertTriangle } from 'lucide-react';

interface BannerProps {
  language: Language;
}

export const Banner: React.FC<BannerProps> = ({ language }) => {
  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 sm:px-6 shadow-xs" id="mandatory-disclaimer-banner">
      <div className="max-w-5xl mx-auto flex items-start sm:items-center gap-3">
        <div className="p-1 rounded bg-amber-200/80 text-amber-800 shrink-0 mt-0.5 sm:mt-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-xs font-medium leading-relaxed">
          <span className="font-bold uppercase tracking-wide inline mr-2 rtl:ml-2 text-amber-900">
            {language === 'ur' ? 'اہم اطلاع:' : 'Notice:'}
          </span>
          {t(language, 'independentBanner')}
        </div>
      </div>
    </div>
  );
};
