import React, { useState } from 'react';
import { Language, AssessmentRequest } from '../types';
import { t } from '../data/translations';
import { PROVINCES } from '../data/resourcesData';
import { ShieldCheck, Send, Sparkles, AlertCircle, RefreshCw, MapPin } from 'lucide-react';

interface GuidanceFormProps {
  language: Language;
  onSubmit: (data: AssessmentRequest) => void;
  isLoading: boolean;
}

export const GuidanceForm: React.FC<GuidanceFormProps> = ({
  language,
  onSubmit,
  isLoading,
}) => {
  const [situation, setSituation] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');

  const isUrdu = language === 'ur';

  const quickScenarios = [
    { text: t(language, 'quickEx1') },
    { text: t(language, 'quickEx2') },
    { text: t(language, 'quickEx3') },
    { text: t(language, 'quickEx4') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim() || isLoading) return;
    
    onSubmit({
      situation,
      province,
      district,
      language,
    });
  };

  const handleChipClick = (scText: string) => {
    setSituation((prev) => (prev ? `${prev} - ${scText}` : scText));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" id="guidance-form-container">
      {/* Privacy Notice Header */}
      <div className="bg-teal-50/80 border-b border-teal-100 p-4 sm:p-5 flex items-start gap-3 text-teal-900">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-xs sm:text-sm text-teal-900 uppercase tracking-wider">
            {isUrdu ? 'راز داری اور تحفظِ معلومات' : 'Privacy & Safety Guidance'}
          </h3>
          <p className="text-xs text-teal-800 mt-0.5 font-medium leading-relaxed">
            {t(language, 'privacyNotice')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
        
        {/* Main Situation Input */}
        <div>
          <label htmlFor="situation-input" className="block text-sm sm:text-base font-bold text-slate-900 mb-1">
            {t(language, 'formHeading')} <span className="text-red-500">*</span>
          </label>
          <p className="text-xs sm:text-sm text-slate-600 mb-2.5">
            {t(language, 'formSubheading')}
          </p>

          <textarea
            id="situation-input"
            rows={4}
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder={t(language, 'situationPlaceholder')}
            className="w-full p-4 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 text-sm sm:text-base font-medium placeholder:text-slate-400 leading-relaxed transition-all shadow-xs"
            required
            aria-required="true"
          />
        </div>

        {/* Quick Scenario Chips */}
        <div>
          <span className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-600" />
            {t(language, 'quickExamplesLabel')}
          </span>
          <div className="flex flex-wrap gap-2">
            {quickScenarios.map((sc, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleChipClick(sc.text)}
                className="bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-300 hover:border-teal-400 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors text-left rtl:text-right active:scale-95 flex items-center gap-1 shadow-2xs"
              >
                <span className="text-teal-600 font-bold">+</span> {sc.text}
              </button>
            ))}
          </div>
        </div>

        {/* Location Selectors (Province & District) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
          <div>
            <label htmlFor="province-select" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-700" />
              {t(language, 'provinceLabel')}
            </label>
            <select
              id="province-select"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500"
            >
              <option value="">-- {t(language, 'selectProvince')} --</option>
              {PROVINCES.map((p) => (
                <option key={p.id} value={isUrdu ? p.nameUr : p.nameEn}>
                  {isUrdu ? p.nameUr : p.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="district-input" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-700" />
              {t(language, 'districtLabel')}
            </label>
            <input
              type="text"
              id="district-input"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder={isUrdu ? 'مثلاً: مظفر گڑھ، سکھر، سوات، جعفرآباد' : 'e.g. Muzaffargarh, Sukkur, Swat, Jaffarabad'}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={!situation.trim() || isLoading}
            id="submit-guidance-btn"
            className="w-full sm:flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold py-3.5 px-6 rounded-lg text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-teal-100" />
                <span>{t(language, 'submittingBtn')}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 text-teal-100" />
                <span>{t(language, 'submitBtn')}</span>
              </>
            )}
          </button>

          {situation && !isLoading && (
            <button
              type="button"
              onClick={() => {
                setSituation('');
                setProvince('');
                setDistrict('');
              }}
              className="w-full sm:w-auto px-4 py-3 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-semibold transition-colors"
            >
              {t(language, 'clearBtn')}
            </button>
          )}
        </div>

      </form>
    </div>
  );
};
