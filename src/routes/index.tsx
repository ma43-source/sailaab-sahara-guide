import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AlertTriangle, ClipboardList, FileText, LifeBuoy, ListChecks, Loader2 } from "lucide-react";

import { requestAdvice } from "@/lib/advice.functions";
import { provinces, resources, t, type Lang } from "@/lib/content";
import { cn } from "@/lib/utils";

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

function Page() {
  const [lang, setLang] = useState<Lang>("ur");
  const [tab, setTab] = useState<"guide" | "resources">("guide");
  const [situation, setSituation] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const rtl = lang === "ur";
  const L = (k: keyof typeof t) => t[k][lang];

  const advise = useServerFn(requestAdvice);
  const mutation = useMutation({
    mutationFn: (text: string) =>
      advise({
        data: {
          situation: text,
          language: lang,
          ...(province ? { province } : {}),
          ...(district.trim() ? { district: district.trim() } : {}),
        },
      }),
  });


  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      lang={lang}
      className={cn("min-h-screen bg-background text-foreground", rtl && "urdu-text")}
    >
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold leading-tight">{L("appName")}</h1>
            <p className="text-sm opacity-90">{t.subtitle[lang]}</p>
          </div>
          <div
            className="flex overflow-hidden rounded-full border border-primary-foreground/40"
            role="group"
            aria-label={L("langLabel")}
          >
            {(["ur", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  "min-h-11 px-4 text-sm font-semibold transition-colors",
                  lang === l
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground hover:bg-primary-foreground/15",
                )}
              >
                {l === "ur" ? "اردو" : "English"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-16">
        <p className="mt-4 text-lg font-medium text-secondary-foreground">{L("tagline")}</p>

        <div className="mt-4 rounded-xl border-2 border-notice-border bg-notice p-4 text-sm font-medium text-notice-foreground">
          <span className="flex gap-2">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
            <span>{L("disclaimerBanner")}</span>
          </span>
        </div>

        <nav className="mt-5 grid grid-cols-2 gap-2" aria-label="Sections">
          {(["guide", "resources"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              aria-current={tab === key}
              className={cn(
                "min-h-12 rounded-xl border-2 px-3 text-base font-semibold transition-colors",
                tab === key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-secondary",
              )}
            >
              {key === "guide" ? L("tabGuide") : L("tabResources")}
            </button>
          ))}
        </nav>

        {tab === "guide" ? (
          <section className="mt-5">
            {!mutation.data ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (situation.trim().length >= 5) mutation.mutate(situation.trim());
                }}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <label htmlFor="situation" className="block text-lg font-semibold">
                  {L("formLabel")}
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{L("formHelp")}</p>
                <textarea
                  id="situation"
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  rows={6}
                  maxLength={4000}
                  placeholder={L("placeholder")}
                  className="mt-3 w-full rounded-xl border-2 border-input bg-background p-3 text-base outline-none focus:border-ring"
                />

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="province" className="block text-sm font-semibold">
                      {L("provinceLabel")}
                    </label>
                    <select
                      id="province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="mt-1 min-h-12 w-full rounded-xl border-2 border-input bg-background px-3 text-base outline-none focus:border-ring"
                    >
                      <option value="">{L("provinceAny")}</option>
                      {provinces.map((p) => (
                        <option key={p.en} value={p.en}>
                          {p[lang]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="district" className="block text-sm font-semibold">
                      {L("districtLabel")}
                    </label>
                    <input
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      maxLength={60}
                      placeholder={L("districtPlaceholder")}
                      className="mt-1 min-h-12 w-full rounded-xl border-2 border-input bg-background px-3 text-base outline-none focus:border-ring"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending || situation.trim().length < 5}
                  className="mt-3 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {mutation.isPending && <Loader2 className="size-5 animate-spin" aria-hidden />}
                  {mutation.isPending ? L("loading") : L("submit")}
                </button>
                {mutation.isError && (
                  <p className="mt-3 rounded-lg bg-secondary p-3 text-sm font-medium text-secondary-foreground">
                    {L("errorTitle")}: {(mutation.error as Error).message}
                  </p>
                )}
              </form>
            ) : (
              <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {mutation.data.emergency && (
                  <div className="border-b-2 border-notice-border bg-notice p-4">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-notice-foreground">
                      <LifeBuoy className="size-5" aria-hidden />
                      {L("emergency")} — 1122
                    </h2>
                    <p className="mt-1 text-base text-notice-foreground">{mutation.data.emergency}</p>
                  </div>
                )}
                <Section
                  icon={<ClipboardList className="size-5" aria-hidden />}
                  title={L("secEligibility")}
                  items={mutation.data.eligibility}
                />
                <Section
                  icon={<FileText className="size-5" aria-hidden />}
                  title={L("secDocuments")}
                  items={mutation.data.documents}
                />
                <Section
                  icon={<ListChecks className="size-5" aria-hidden />}
                  title={L("secSteps")}
                  items={mutation.data.steps}
                  ordered
                />
                <p className="border-t-2 border-notice-border bg-notice p-4 text-sm font-medium text-notice-foreground">
                  {mutation.data.closing}
                </p>
                <div className="p-4">
                  <button
                    type="button"
                    onClick={() => {
                      mutation.reset();
                      setSituation("");
                    }}
                    className="min-h-12 w-full rounded-xl border-2 border-primary px-4 text-base font-semibold text-primary hover:bg-secondary"
                  >
                    {L("again")}
                  </button>
                </div>
              </article>
            )}
          </section>
        ) : (
          <section className="mt-5">
            <h2 className="text-xl font-bold">{L("resourcesTitle")}</h2>
            <ul className="mt-3 space-y-3">
              {resources.map((r) => (
                <li key={r.title.en} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <h3 className="text-lg font-semibold">{r.title[lang]}</h3>
                  <p className="mt-1 text-base text-foreground/80">{r.desc[lang]}</p>
                  <p className="mt-2 text-sm font-medium text-primary">{r.action[lang]}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl border-2 border-notice-border bg-notice p-4 text-sm font-medium text-notice-foreground">
              {L("resourcesNote")}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

function Section({
  icon,
  title,
  items,
  ordered,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  if (!items.length) return null;
  const List = ordered ? "ol" : "ul";
  return (
    <div className="border-b border-border p-4 last:border-b-0">
      <h2 className="flex items-center gap-2 text-lg font-bold text-primary">
        {icon}
        {title}
      </h2>
      <List
        className={cn(
          "mt-2 space-y-2 text-base",
          ordered ? "list-decimal ps-6" : "list-disc ps-6",
        )}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </List>
    </div>
  );
}
