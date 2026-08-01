import React from 'react';
import { Language } from '../types';
import { t } from '../data/translations';
import { PhoneCall, ShieldAlert, AlertTriangle, Building2, ExternalLink } from 'lucide-react';
import { HELPLINES } from '../data/resourcesData';

interface EmergencyCardProps {
  language: Language;
  userSituation: string;
  onReset?: () => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({
  language,
  userSituation,
  onReset,
}) => {
  const isUrdu = language === 'ur';

  const emergencyHelplines = HELPLINES.filter(
    (h) => h.category === 'emergency' || h.urgent
  );

  return (
    <div className="space-y-5" id="emergency-only-card">
      {/* Primary Red Emergency Alert Box */}
      <div className="bg-red-600 text-white p-6 sm:p-7 rounded-xl shadow-lg border-2 border-red-700 animate-bounce-short">
        <div className="flex items-start gap-4">
          <div className="bg-white text-red-600 p-3 rounded-full shrink-0 shadow-md">
            <PhoneCall className="w-8 h-8" />
          </div>
          <div className="space-y-3">
            <div>
              <span className="bg-red-800 text-red-100 text-xs font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded border border-red-500 inline-block mb-1">
                {isUrdu ? 'فوری ہنگامی خطرہ' : 'IMMEDIATE EMERGENCY DETECTED'}
              </span>
              <h2 className="font-extrabold text-xl sm:text-2xl text-white flex items-center gap-2">
                <ShieldAlert className="w-7 h-7 text-red-200" />
                {t(language, 'emergencyAlertTitle')}
              </h2>
            </div>

            <p className="text-sm sm:text-base font-semibold text-red-50 leading-relaxed">
              {t(language, 'emergencyAlertText')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:1122"
                className="inline-flex items-center gap-2.5 bg-white text-red-700 hover:bg-red-50 font-extrabold px-6 py-3 rounded-lg text-base sm:text-lg shadow-md transition-all active:scale-95"
              >
                <PhoneCall className="w-5 h-5 text-red-600" />
                <span>Call 1122 Immediately (ریسکیو 1122)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Banner: AI Bypassed for Human Safety */}
      <div className="bg-amber-50 border-2 border-amber-300 text-amber-950 p-4 sm:p-5 rounded-xl text-xs sm:text-sm font-semibold flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-extrabold text-amber-900 block mb-0.5">
            {isUrdu ? 'اطلاع — AI تجویز روکی گئی:' : 'Notice — AI Guidance Paused:'}
          </span>
          {isUrdu
            ? 'آپ کی تحریر میں ہنگامی ریسکیو یا خطرے کے الفاظ کی نشاندہی کی وجہ سے سسٹمیٹک AI رہنمائی روک دی گئی ہے۔ انسانی زندگی اور حفاظت اولین ترجیح ہے۔ براہ کرم فوری اوپر دیے گئے ہیلپ لائن نمبروں پر رابطہ کریں۔'
            : 'Automated AI analysis was paused because immediate physical danger or rescue keywords were detected. Human safety comes first. Please contact official emergency services immediately.'}
        </div>
      </div>

      {/* Emergency Helplines Quick List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
          <Building2 className="w-4 h-4 text-teal-700" />
          {isUrdu ? 'دیگر ہنگامی کنٹرول روم نمبرز:' : 'Official Disaster Emergency Contacts:'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {emergencyHelplines.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {isUrdu ? item.nameUr : item.nameEn}
                </p>
                <p className="text-sm font-extrabold text-teal-800 tracking-wider">
                  {item.number}
                </p>
              </div>
              <a
                href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                className="bg-teal-700 hover:bg-teal-800 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"
              >
                {t(language, 'callNow')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
