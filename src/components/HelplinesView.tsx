import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { HELPLINES } from '../data/resourcesData';
import { PhoneCall, ShieldAlert, Building2, CreditCard, FileCheck2, ExternalLink } from 'lucide-react';

interface HelplinesViewProps {
  language: Language;
}

export const HelplinesView: React.FC<HelplinesViewProps> = ({ language }) => {
  const isUrdu = language === 'ur';

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'emergency':
        return <span className="bg-red-100 text-red-900 border border-red-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-red-600"/> {isUrdu ? 'ہنگامی امداد' : 'Rescue & Emergency'}</span>;
      case 'bisp':
        return <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-emerald-700"/> {isUrdu ? 'مالی امداد (BISP)' : 'Cash Relief'}</span>;
      case 'pdma':
        return <span className="bg-teal-100 text-teal-900 border border-teal-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-teal-700"/> {isUrdu ? 'صوبائی ڈائریکٹوریٹ (PDMA)' : 'Provincial PDMA'}</span>;
      default:
        return <span className="bg-slate-100 text-slate-900 border border-slate-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><FileCheck2 className="w-3.5 h-3.5 text-slate-700"/> {isUrdu ? 'شناختی کارڈ / نادرا' : 'Documents & NADRA'}</span>;
    }
  };

  return (
    <div className="space-y-6" id="helplines-view-container">
      {/* Header */}
      <div className="bg-teal-800 text-white p-5 rounded-xl shadow-md border border-teal-700">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-700/80 rounded-lg border border-teal-500/50 text-white">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t(language, 'helplinesHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-0.5 font-medium">
              {t(language, 'helplinesSubheading')}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Helpline List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HELPLINES.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl border-2 shadow-md transition-all flex flex-col justify-between ${
              item.urgent
                ? 'bg-red-50 border-red-500 hover:border-red-600'
                : 'bg-white border-slate-200 hover:border-teal-500'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                {getCategoryBadge(item.category)}
                {item.urgent && (
                  <span className="animate-pulse bg-red-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded uppercase">
                    Urgent / ہنگامی
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {isUrdu ? item.nameUr : item.nameEn}
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {isUrdu ? item.descriptionUr : item.descriptionEn}
              </p>
            </div>

            {/* Direct Phone Dial Link Button */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
              <div className="text-lg font-extrabold text-slate-900 tracking-wider">
                {item.number}
              </div>

              <a
                href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                className={`inline-flex items-center gap-2 font-bold px-4 py-2 rounded-lg text-sm transition-all active:scale-95 shadow ${
                  item.urgent
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-teal-700 hover:bg-teal-800 text-white'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t(language, 'callNow')}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
