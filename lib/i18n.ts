// lib/i18n.ts — i18n helpers for postman.khagatara.com

export const SUPPORTED_LANGS = [
  "en","zh","ar","es","fr","hi","pt","de","ru","ja",
  "ko","it","id","vi","th","tr","nl","tl","bn","ur"
] as const;

export type LangCode = typeof SUPPORTED_LANGS[number];

export const RTL_LANGS: LangCode[] = ["ar", "ur"];

export const BASE_URL = "https://postman.khagatara.com";

export interface HreflangTag {
  rel: string;
  hreflang: string;
  href: string;
}

/** Returns all hreflang link tags for a given path e.g. "/" or "/pricing" */
export function hreflangTags(path = "/"): HreflangTag[] {
  const cleanPath = path === "/" ? "" : path;
  return [
    ...SUPPORTED_LANGS.map((lang) => ({
      rel: "alternate",
      hreflang: lang,
      href: `${BASE_URL}/${lang}${cleanPath}`,
    })),
    {
      rel: "alternate",
      hreflang: "x-default",
      href: `${BASE_URL}/en${cleanPath}`,
    },
  ];
}

/** Returns "rtl" or "ltr" for a given lang code */
export function getDir(lang: string): "rtl" | "ltr" {
  return RTL_LANGS.includes(lang as LangCode) ? "rtl" : "ltr";
}

type LocaleData = Record<string, Record<string, string>>;

function deepMerge(base: LocaleData, override: LocaleData): LocaleData {
  const result: LocaleData = { ...base };
  for (const key of Object.keys(override)) {
    if (typeof override[key] === "object" && !Array.isArray(override[key])) {
      result[key] = { ...(base[key] || {}), ...override[key] };
      // keep base value if override value is empty string
      for (const k of Object.keys(result[key])) {
        if (override[key]?.[k] === "" && base[key]?.[k]) {
          result[key][k] = base[key][k];
        }
      }
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

/** Loads a locale, falls back to English for any missing/empty keys */
export async function loadLocale(lang: string): Promise<LocaleData> {
  try {
    const [enModule, langModule] = await Promise.all([
      import("../locales/en.json"),
      import(`../locales/${lang}.json`),
    ]);
    return deepMerge(enModule.default as LocaleData, langModule.default as LocaleData);
  } catch {
    const enModule = await import("../locales/en.json");
    return enModule.default as LocaleData;
  }
}
