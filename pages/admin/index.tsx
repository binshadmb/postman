import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { getSessionFromReq } from "../../lib/auth";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = getSessionFromReq(req as any);
  if (!session) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  return { props: {} };
};

type Config = {
  bondPaperAvailable: boolean;
  premiumPaperAvailable: boolean;
  standardPaperAvailable: boolean;
  envelopeSizes: string[];
  foldingAvailable: boolean;
  foldTypes: string[];
};

const ALL_ENVELOPE_SIZES = ["C4", "C5", "C6", "DL", "A4", "A5"];
const ALL_FOLD_TYPES = ["No fold", "Single fold", "Tri-fold", "Z-fold"];

export default function AdminPanel() {
  const router = useRouter();
  const [config, setConfig] = useState<Config | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then(setConfig);
  }, []);

  async function save(next: Partial<Config>) {
    if (!config) return;
    const merged = { ...config, ...next };
    setConfig(merged);
    setSaving(true);
    try {
      const res = await fetch("/api/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (res.ok) {
        setSavedAt(new Date().toLocaleTimeString());
      }
    } finally {
      setSaving(false);
    }
  }

  function toggleEnvelopeSize(size: string) {
    if (!config) return;
    const has = config.envelopeSizes.includes(size);
    const next = has
      ? config.envelopeSizes.filter((s) => s !== size)
      : [...config.envelopeSizes, size];
    save({ envelopeSizes: next });
  }

  function toggleFoldType(type: string) {
    if (!config) return;
    const has = config.foldTypes.includes(type);
    const next = has
      ? config.foldTypes.filter((t) => t !== type)
      : [...config.foldTypes, type];
    save({ foldTypes: next });
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (!config) {
    return <div style={{ padding: 40, fontFamily: "Inter, system-ui, sans-serif" }}>Loading…</div>;
  }

  return (
    <>
      <Head><title>Control Panel — Postman Admin</title></Head>
      <div style={{
        maxWidth: 720, margin: "0 auto", padding: "32px 20px",
        fontFamily: "Inter, system-ui, sans-serif", color: "#202124",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.6rem" }}>Postman Control Panel</h1>
          <button onClick={handleLogout} style={{
            background: "transparent", border: "1px solid #d8d3c6",
            borderRadius: 7, padding: "8px 14px", cursor: "pointer",
          }}>
            Log out
          </button>
        </div>

        <p style={{ color: "#66706a", fontSize: "0.9rem" }}>
          {saving ? "Saving…" : savedAt ? `Last saved at ${savedAt}` : "Changes save instantly."}
        </p>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Paper Stock Availability</h2>
          <Toggle
            label="Bond paper"
            checked={config.bondPaperAvailable}
            onChange={(v) => save({ bondPaperAvailable: v })}
          />
          <Toggle
            label="Premium paper"
            checked={config.premiumPaperAvailable}
            onChange={(v) => save({ premiumPaperAvailable: v })}
          />
          <Toggle
            label="Standard paper"
            checked={config.standardPaperAvailable}
            onChange={(v) => save({ standardPaperAvailable: v })}
          />
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Envelope Sizes Offered</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {ALL_ENVELOPE_SIZES.map((size) => (
              <Chip
                key={size}
                label={size}
                active={config.envelopeSizes.includes(size)}
                onClick={() => toggleEnvelopeSize(size)}
              />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Folding</h2>
          <Toggle
            label="Folding available at all"
            checked={config.foldingAvailable}
            onChange={(v) => save({ foldingAvailable: v })}
          />
          {config.foldingAvailable && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
              {ALL_FOLD_TYPES.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  active={config.foldTypes.includes(type)}
                  onClick={() => toggleFoldType(type)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

const sectionStyle: React.CSSProperties = {
  marginTop: 28, padding: 20, background: "#fff",
  border: "1px solid #d8d3c6", borderRadius: 10,
};

const h2Style: React.CSSProperties = { fontSize: "1.05rem", marginTop: 0, marginBottom: 14 };

function Toggle({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: 18, height: 18 }}
      />
      <span>{label}</span>
    </label>
  );
}

function Chip({ label, active, onClick }: {
  label: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 16px", borderRadius: 99, cursor: "pointer",
        border: active ? "1px solid #b72d32" : "1px solid #d8d3c6",
        background: active ? "#b72d32" : "#fff",
        color: active ? "#fff" : "#202124",
        fontWeight: 600, fontSize: "0.9rem",
      }}
    >
      {label}
    </button>
  );
}