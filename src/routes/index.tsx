import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { AlertCircle, Building2 } from "lucide-react";

import { requestAdvice } from "@/lib/advice.functions";
import { isEmergencySituation } from "@/lib/emergency";
import { t } from "@/data/translations";
import type {
  AssessmentRequest,
  AssessmentResponse,
  Language,
  SavedGuidance,
  ViewTab,
} from "@/types";
import { Navbar } from "@/components/Navbar";
import { Banner } from "@/components/Banner";
import { GuidanceForm } from "@/components/GuidanceForm";
import { GuidanceCard } from "@/components/GuidanceCard";
import { EmergencyCard } from "@/components/EmergencyCard";
import { ResourcesView } from "@/components/ResourcesView";
import { HelplinesView } from "@/components/HelplinesView";
import { SavedGuidanceView } from "@/components/SavedGuidanceView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sailaab Sahara — Flood Relief Rights Navigator" },
      {
        name: "description",
        content:
          "Plain-language guidance for flood-affected people in Pakistan on relief, compensation and documents. Independent project, Urdu and English.",
      },
      { property: "og:title", content: "Sailaab Sahara — Flood Relief Rights Navigator" },
      {
        property: "og:description",
        content:
          "Understand what flood relief support you may be eligible for and what steps to take next. Urdu and English.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const STORAGE_KEY = "sailaab_sahara_saved";

function Page() {
  const [language, setLanguage] = useState<Language>("ur");
  const [activeTab, setActiveTab] = useState<ViewTab>("navigator");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isEmergencyOnly, setIsEmergencyOnly] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<AssessmentResponse | null>(null);
  const [currentSituation, setCurrentSituation] = useState("");

  const [savedGuidance, setSavedGuidance] = useState<SavedGuidance[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const analyze = useServerFn(requestAdvice);

  // Load saved items after hydration (localStorage is browser-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedGuidance(JSON.parse(stored) as SavedGuidance[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGuidance));
    } catch {
      /* ignore */
    }
  }, [savedGuidance, hydrated]);

  const handleLanguageToggle = () => setLanguage((prev) => (prev === "ur" ? "en" : "ur"));

  const handleFormSubmit = async (data: AssessmentRequest) => {
    setErrorMsg(null);
    setCurrentSituation(data.situation);

    // Stop before calling the AI entirely if danger language is detected locally
    if (isEmergencySituation(data.situation)) {
      setIsEmergencyOnly(true);
      setCurrentResponse(null);
      setIsLoading(false);
      return;
    }

    setIsEmergencyOnly(false);
    setIsLoading(true);

    try {
      const result = await analyze({
        data: {
          situation: data.situation,
          district: data.district || undefined,
          province: data.province || undefined,
          language: data.language,
        },
      });
      setCurrentResponse(result);
    } catch (err) {
      console.error("Error submitting assessment:", err);
      setErrorMsg(
        (err as Error)?.message ||
          (language === "ur"
            ? "رہنمائی حاصل کرنے میں ناکامی ہوئی۔ براہ کرم دوبارہ کوشش کریں یا 1122 پر رابطہ کریں۔"
            : "Failed to generate guidance. Please try again or call emergency helpline 1122."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveGuidance = (resp: AssessmentResponse) => {
    if (!resp) return;
    setSavedGuidance((prev) => [
      {
        id: Date.now().toString(),
        situation: currentSituation,
        response: resp.text,
        timestamp: resp.timestamp,
        language,
      },
      ...prev,
    ]);
  };

  const handleDeleteSaved = (id: string) =>
    setSavedGuidance((prev) => prev.filter((item) => item.id !== id));

  const handleSelectSaved = (item: SavedGuidance) => {
    setIsEmergencyOnly(false);
    setCurrentSituation(item.situation);
    setCurrentResponse({ text: item.response, timestamp: item.timestamp });
    setActiveTab("navigator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isCurrentSaved = !!(
    currentResponse && savedGuidance.some((g) => g.response === currentResponse.text)
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-sans text-slate-900 antialiased">
      <Navbar
        language={language}
        onLanguageToggle={handleLanguageToggle}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={savedGuidance.length}
      />

      <Banner language={language} />

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-6 sm:px-6">
        {activeTab === "navigator" && (
          <div className="space-y-6">
            <GuidanceForm language={language} onSubmit={handleFormSubmit} isLoading={isLoading} />

            {errorMsg && (
              <div className="flex items-start gap-3 rounded-xl border-2 border-red-300 bg-red-50 p-4 text-red-900 shadow-sm">
                <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold">
                    {language === "ur" ? "خامی پیش آئی" : "Error Occurred"}
                  </h4>
                  <p className="text-sm">{errorMsg}</p>
                </div>
              </div>
            )}

            {isEmergencyOnly && !isLoading && (
              <EmergencyCard language={language} userSituation={currentSituation} />
            )}

            {!isEmergencyOnly && currentResponse && !isLoading && (
              <GuidanceCard
                language={language}
                response={currentResponse}
                userSituation={currentSituation}
                onSave={handleSaveGuidance}
                isSaved={isCurrentSaved}
              />
            )}
          </div>
        )}

        {activeTab === "resources" && <ResourcesView language={language} />}

        {activeTab === "helplines" && <HelplinesView language={language} />}

        {activeTab === "history" && (
          <SavedGuidanceView
            language={language}
            savedList={savedGuidance}
            onDelete={handleDeleteSaved}
            onSelect={handleSelectSaved}
          />
        )}
      </main>

      <footer className="mt-12 border-t border-slate-800 bg-slate-900 py-8 text-xs text-slate-400 sm:text-sm">
        <div className="mx-auto max-w-5xl space-y-4 px-4 text-center sm:px-6">
          <div className="flex items-center justify-center gap-2 text-base font-bold text-teal-400">
            <Building2 className="h-5 w-5 text-teal-500" />
            <span>{t(language, "appName")}</span>
          </div>

          <p className="mx-auto max-w-2xl font-medium leading-relaxed text-slate-300">
            {t(language, "independentBanner")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-semibold text-slate-500">
            <span>© {new Date().getFullYear()} Independent Student Initiative</span>
            <span>•</span>
            <span>Rescue Helpline: 1122</span>
            <span>•</span>
            <span>BISP Helpline: 0800-26477</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
