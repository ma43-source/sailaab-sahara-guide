import React from 'react';
import { Language, ViewTab } from '../types';
import { t } from '../data/translations';
import { ShieldAlert, BookOpen, PhoneCall, BookmarkCheck, Languages, Waves } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageToggle: () => void;
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageToggle,
  activeTab,
  onTabChange,
  savedCount,
}) => {
  const isUrdu = language === 'ur';

  return (
    <header className="bg-teal-800 text-white shadow-md border-b border-teal-700/80 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3.5 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" onClick={() => onTabChange('navigator')}>
              <div className="w-10 h-10 rounded-lg bg-teal-600/80 flex items-center justify-center text-white border border-teal-400/40 shadow-sm">
                <Waves className="w-6 h-6 animate-pulse text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  {t(language, 'appName')}
                  <span className="text-xs bg-teal-900/60 text-teal-100 px-2.5 py-0.5 rounded-md font-semibold hidden sm:inline-block border border-teal-600/50">
                    {isUrdu ? 'غیر سرکاری رہائشی سہولت' : 'Student Project'}
                  </span>
                </h1>
                <p className="text-xs text-teal-100/90 font-medium line-clamp-1">
                  {t(language, 'tagline')}
                </p>
              </div>
            </div>

            {/* Mobile Language Buttons */}
            <div className="sm:hidden flex items-center gap-1.5 bg-teal-900/50 p-1 rounded-md border border-teal-600/40">
              <button
                onClick={() => language !== 'en' && onLanguageToggle()}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  !isUrdu ? 'bg-white text-teal-900 shadow' : 'text-teal-100 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => language !== 'ur' && onLanguageToggle()}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  isUrdu ? 'bg-white text-teal-900 shadow' : 'text-teal-100 hover:text-white'
                }`}
              >
                اردو
              </button>
            </div>
          </div>

          {/* Desktop Language Selector buttons */}
          <div className="hidden sm:flex items-center gap-2 bg-teal-900/50 p-1 rounded-lg border border-teal-600/40">
            <button
              onClick={() => language !== 'en' && onLanguageToggle()}
              id="lang-en-btn"
              className={`px-3.5 py-1.5 rounded text-sm font-bold transition-all ${
                !isUrdu
                  ? 'bg-white text-teal-900 shadow'
                  : 'bg-teal-700/80 text-teal-100 hover:bg-teal-600 hover:text-white border border-teal-500/50'
              }`}
            >
              English
            </button>
            <button
              onClick={() => language !== 'ur' && onLanguageToggle()}
              id="lang-ur-btn"
              className={`px-3.5 py-1.5 rounded text-sm font-bold transition-all ${
                isUrdu
                  ? 'bg-white text-teal-900 shadow'
                  : 'bg-teal-700/80 text-teal-100 hover:bg-teal-600 hover:text-white border border-teal-500/50'
              }`}
            >
              اردو
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-3 pt-2.5 border-t border-teal-700/60 flex items-center justify-between overflow-x-auto no-scrollbar gap-1 text-sm font-medium">
          <button
            onClick={() => onTabChange('navigator')}
            id="tab-navigator"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md whitespace-nowrap transition-all ${
              activeTab === 'navigator'
                ? 'bg-white text-teal-900 font-bold shadow'
                : 'text-teal-100 hover:bg-teal-700/60 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-teal-300" />
            <span>{t(language, 'navNavigator')}</span>
          </button>

          <button
            onClick={() => onTabChange('resources')}
            id="tab-resources"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md whitespace-nowrap transition-all ${
              activeTab === 'resources'
                ? 'bg-white text-teal-900 font-bold shadow'
                : 'text-teal-100 hover:bg-teal-700/60 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-300" />
            <span>{t(language, 'navResources')}</span>
          </button>

          <button
            onClick={() => onTabChange('helplines')}
            id="tab-helplines"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md whitespace-nowrap transition-all ${
              activeTab === 'helplines'
                ? 'bg-white text-teal-900 font-bold shadow'
                : 'text-teal-100 hover:bg-teal-700/60 hover:text-white'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-teal-300" />
            <span>{t(language, 'navHelplines')}</span>
          </button>

          <button
            onClick={() => onTabChange('history')}
            id="tab-history"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md whitespace-nowrap transition-all relative ${
              activeTab === 'history'
                ? 'bg-white text-teal-900 font-bold shadow'
                : 'text-teal-100 hover:bg-teal-700/60 hover:text-white'
            }`}
          >
            <BookmarkCheck className="w-4 h-4 text-teal-300" />
            <span>{t(language, 'navHistory')}</span>
            {savedCount > 0 && (
              <span className="ml-1 rtl:mr-1 bg-amber-400 text-amber-950 font-extrabold text-xs px-1.5 py-0.2 rounded-full shadow-sm">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

      </div>
    </header>
  );
};
