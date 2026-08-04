import { useRouter } from "next/router";

const LANG_LABELS: Record<string, string> = {
  en: "English", zh: "中文", ar: "العربية", es: "Español", fr: "Français",
  hi: "हिन्दी", pt: "Português", de: "Deutsch", ru: "Русский", ja: "日本語",
  ko: "한국어", it: "Italiano", id: "Bahasa", vi: "Tiếng Việt", th: "ภาษาไทย",
  tr: "Türkçe", nl: "Nederlands", tl: "Filipino", bn: "বাংলা", ur: "اردو",
};

export default function LangSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLang = e.target.value;
    router.push(`/${newLang}`);
  }

  return (
    <label style={{ display: "grid", gap: 4, color: "var(--muted)", fontSize: "0.82rem" }}>
      Lang
      <select
        value={currentLang}
        onChange={handleChange}
        style={{
          minHeight: 38, borderRadius: 8, border: "1px solid var(--line)",
          background: "var(--surface)", color: "var(--ink)", padding: "0 8px",
        }}
      >
        {Object.entries(LANG_LABELS).map(([code, label]) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
    </label>
  );
}
