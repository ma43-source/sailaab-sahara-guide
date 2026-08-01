import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { RESOURCE_CATEGORIES } from '../data/resourcesData';
import { BookOpen, Tent, Banknote, Sprout, Home, Info, ArrowUpRight, Building } from 'lucide-react';

interface ResourcesViewProps {
  language: Language;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ language }) => {
  const isUrdu = language === 'ur';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tent':
        return <Tent className="w-6 h-6 text-teal-700" />;
      case 'Banknote':
        return <Banknote className="w-6 h-6 text-teal-700" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6 text-teal-700" />;
      case 'Home':
        return <Home className="w-6 h-6 text-teal-700" />;
      default:
        return <BookOpen className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <div className="space-y-6" id="resources-view-container">
      {/* Header */}
      <div className="bg-teal-800 text-white p-5 rounded-xl shadow-md border border-teal-700">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-700/80 rounded-lg border border-teal-500/50 text-white">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t(language, 'resourcesHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-0.5 font-medium">
              {t(language, 'resourcesSubheading')}
            </p>
          </div>
        </div>
      </div>

      {/* Grid of 4 Core Static Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {RESOURCE_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl shadow-md border-2 border-slate-200 hover:border-teal-600 transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-teal-50 rounded-lg border border-teal-200">
                    {getIcon(cat.iconName)}
                  </div>
                  <span className="text-xs font-bold bg-teal-100 text-teal-900 px-2.5 py-1 rounded-full border border-teal-300">
                    {isUrdu ? cat.badgeUr : cat.badgeEn}
                  </span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {isUrdu ? cat.titleUr : cat.titleEn}
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {isUrdu ? cat.descUr : cat.descEn}
              </p>
            </div>

            {/* Instruction Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold flex items-start gap-2.5">
              <Building className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-teal-900 font-extrabold block mb-0.5">
                  {isUrdu ? 'کہاں رابطہ کریں؟' : 'Where to Contact:'}
                </span>
                {isUrdu ? cat.instructionUr : cat.instructionEn}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Source & Public Info Citation */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 sm:p-5 text-amber-950 text-xs sm:text-sm font-semibold flex items-start gap-3 shadow-sm">
        <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-extrabold block text-amber-900 mb-1">
            {isUrdu ? 'معلومات کا باضابطہ ماخذ:' : 'Public Data Citation:'}
          </span>
          {t(language, 'citationNotice')}
        </div>
      </div>
    </div>
  );
};
