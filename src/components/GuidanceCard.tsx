import React, { useState } from 'react';
import { Language, AssessmentResponse } from '../types';
import { t } from '../data/translations';
import { isEmergencySituation } from '../lib/emergency';
import {
  PhoneCall,
  CheckCircle2,
  FileText,
  ListOrdered,
  AlertCircle,
  BookmarkPlus,
  Copy,
  Check,
  Building2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface GuidanceCardProps {
  language: Language;
  response: AssessmentResponse;
  userSituation: string;
  onSave: (response: AssessmentResponse) => void;
  isSaved?: boolean;
}

export const GuidanceCard: React.FC<GuidanceCardProps> = ({
  language,
  response,
  userSituation,
  onSave,
  isSaved = false,
}) => {
  const [copied, setCopied] = useState(false);
  const isUrdu = language === 'ur';

  // Check if situation suggests immediate physical danger or rescue using shared helper
  const isEmergency = isEmergencySituation(userSituation);

  const handleCopy = () => {
    navigator.clipboard.writeText(response.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper function to render text nicely with bold markdown formatting and lists
  const renderFormattedText = (rawText: string) => {
    const paragraphs = rawText.split('\n\n').filter(Boolean);
    const stripMarks = (s: string) =>
      s.replace(/^#{1,6}\s*/, '').replace(/^[-*•]\s+/, '').replace(/^\d+[\.\)]\s*/, '').trim();

    return (
      <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
        {paragraphs.map((para, idx) => {
          // Check if paragraph looks like a section header
          const isHeader = /^(#{1,6}\s|\(?\d+[\.\)]\s*(likely|documents|concrete|ممکنہ|ضروری|اگلا))/i.test(para.trim())
            && para.trim().split('\n').length === 1;

          if (isHeader) {
            return (
              <h3 key={idx} className="text-teal-800 font-bold text-base sm:text-lg border-l-4 rtl:border-l-0 rtl:border-r-4 border-teal-500 pl-3 rtl:pl-0 rtl:pr-3 mb-2 tracking-wide">
                {stripMarks(para)}
              </h3>
            );
          }

          // Bullet points or normal text
          const lines = para.split('\n');
          return (
            <div key={idx} className="space-y-1.5">
              {lines.map((line, lIdx) => {
                const trimmed = line.trim();
                const isBullet = /^([-*•]\s|\d+[\.\)]\s)/.test(trimmed);
                const content = isBullet ? stripMarks(trimmed) : trimmed.replace(/^#{1,6}\s*/, '');

                // Simple bold replacement for **text**
                const parts = content.split(/(\*\*.*?\*\*)/g);
                const formattedLine = parts.map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pIdx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
                  }
                  return part;
                });

                if (isBullet) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 my-1 bg-slate-50 p-2.5 rounded-md border border-slate-200/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                      <div className="flex-1 text-slate-700 font-medium">{formattedLine}</div>
                    </div>
                  );
                }

                return <p key={lIdx} className="text-slate-700 font-normal">{formattedLine}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  };

            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6" id="guidance-results-card">
      {/* Emergency Helpline Banner if Emergency terms detected */}
      {isEmergency && (
        <div className="bg-red-600 text-white p-4 sm:p-5 rounded-xl shadow-md border-2 border-red-700 animate-bounce-short">
          <div className="flex items-start gap-3">
            <div className="bg-white text-red-600 p-2 rounded-full shrink-0 shadow">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-200" />
                {t(language, 'emergencyAlertTitle')}
              </h3>
              <p className="text-xs sm:text-sm font-semibold mt-1 text-red-50 leading-relaxed">
                {t(language, 'emergencyAlertText')}
              </p>
              <div className="mt-2.5">
                <a
                  href="tel:1122"
                  className="inline-flex items-center gap-2 bg-white text-red-700 hover:bg-red-50 font-bold px-4 py-2 rounded-lg text-sm shadow transition-all active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  <span> Call 1122 Immediately (ریسکیو 1122)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Primary Guidance Card matching Professional Polish Theme */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-teal-100 overflow-hidden flex flex-col">
        {/* Card Header */}
        <div className="bg-teal-50 px-5 py-3.5 border-b border-teal-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-teal-900 font-bold uppercase text-xs tracking-widest flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              {isUrdu ? 'سیلاب سہارا تجزیہ' : 'AI Assistance Result'}
            </span>
            <span className="bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              GENERAL GUIDANCE
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-300 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t(language, 'copiedText') : t(language, 'copyBtn')}</span>
            </button>

            <button
              onClick={() => onSave(response)}
              disabled={isSaved}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border transition-colors ${
                isSaved
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-teal-600 hover:bg-teal-700 text-white border-teal-500 shadow-2xs'
              }`}
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>{isSaved ? t(language, 'savedSuccess') : t(language, 'saveBtn')}</span>
            </button>
          </div>
        </div>

        {/* Structured Sections Body */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Formatted Gemini Guidance Output */}
          <div className="prose prose-teal max-w-none">
            {renderFormattedText(response.text)}
          </div>

          {/* Repeated mandatory disclaimer at bottom of response as requested */}
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium leading-relaxed italic flex items-start gap-2">
            <Building2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-700 not-italic block mb-0.5">
                {t(language, 'bottomDisclaimerTitle')}
              </span>
              {t(language, 'bottomDisclaimerText')}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
