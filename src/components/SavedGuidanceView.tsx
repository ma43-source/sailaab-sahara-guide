import React from 'react';
import { Language, SavedGuidance } from '../types';
import { t } from '../data/translations';
import { BookmarkCheck, Trash2, Calendar, FileText } from 'lucide-react';

interface SavedGuidanceViewProps {
  language: Language;
  savedList: SavedGuidance[];
  onDelete: (id: string) => void;
  onSelect: (item: SavedGuidance) => void;
}

export const SavedGuidanceView: React.FC<SavedGuidanceViewProps> = ({
  language,
  savedList,
  onDelete,
  onSelect,
}) => {
  const isUrdu = language === 'ur';

  if (savedList.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 text-center space-y-3" id="saved-empty-container">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
          <BookmarkCheck className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">
          {t(language, 'noHistory')}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {isUrdu
            ? 'جب بھی آپ کسی صورتحال کے لیے رہنمائی حاصل کریں تو "یہ رہنمائی محفوظ کریں" بٹن دبا کر اسے یہاں رکھ سکتے ہیں۔'
            : 'Whenever you generate guidance, click "Save Guidance Offline" to store it here for offline viewing.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="saved-view-container">
      {/* Header */}
      <div className="bg-teal-800 text-white p-5 rounded-xl shadow-md border border-teal-700">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-700/80 rounded-lg border border-teal-500/50 text-white">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t(language, 'historyHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-0.5 font-medium">
              {t(language, 'historySubheading')}
            </p>
          </div>
        </div>
      </div>

      {/* List of Saved Cards */}
      <div className="space-y-4">
        {savedList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md border border-slate-200 p-5 hover:border-teal-500 transition-all flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span className="flex items-center gap-1 font-semibold text-teal-800">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(item.timestamp).toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>

                <div className="flex items-center gap-2">
                  <span className="bg-teal-50 text-teal-800 border border-teal-200/80 px-2 py-0.5 rounded text-[11px] font-semibold">
                    {isUrdu
                      ? `زبان: ${item.language === 'ur' ? 'اردو' : 'English'}`
                      : `Language: ${item.language === 'ur' ? 'Urdu' : 'English'}`}
                  </span>

                  {(item.district || item.province) && (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                      {[item.district, item.province].filter(Boolean).join(', ')}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 font-semibold italic">
                "{item.situation}"
              </div>

              <div className="text-xs sm:text-sm text-slate-700 line-clamp-3 font-medium leading-relaxed pt-1">
                {item.response}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => onSelect(item)}
                className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>{isUrdu ? 'مکمل رہنمائی دیکھیں' : 'View Full Notes'}</span>
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="text-xs text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition-colors flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t(language, 'deleteBtn')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
