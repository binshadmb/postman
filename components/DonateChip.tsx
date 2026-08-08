"use client";
import { useState, useEffect, useRef } from "react";
import PayPalButton from "./PayPalButton";

interface DonateChipProps {
  label: string;
  cta: string;
  href: string;
  hostedButtonId?: string; // if set, renders a real embedded PayPal button on expand
  bgColor?: string;
  hoverColor?: string;
}

export default function DonateChip({
  label,
  cta,
  href,
  hostedButtonId,
  bgColor = "#1E88E5",
  hoverColor = "#1565C0",
}: DonateChipProps) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!expanded) {
        setPulse(true);
        setTimeout(() => setPulse(false), 800);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, [expanded]);

  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (chipRef.current && !chipRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const bg = hovered ? hoverColor : bgColor;
  const hoverHandlers = canHover
    ? { onMouseEnter: () => { setHovered(true); setExpanded(true); }, onMouseLeave: () => { setHovered(false); setExpanded(false); } }
    : {};

  return (
    <>
      <style>{`
        @keyframes donate-pulse {
          0%   { box-shadow: 0 0 0 0 ${bgColor}55; }
          70%  { box-shadow: 0 0 0 12px ${bgColor}00; }
          100% { box-shadow: 0 0 0 0 ${bgColor}00; }
        }
        .donate-chip-pulse { animation: donate-pulse 0.8s ease-out; }
        .donate-chip-inner { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .donate-chip-panel { animation: donate-panel-in 0.18s ease-out; }
        @keyframes donate-panel-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        ref={chipRef}
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end" }}
      >
        {expanded && hostedButtonId && (
          <div
            className="donate-chip-panel"
            style={{
              marginBottom: "12px",
              background: "#fff",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              minWidth: "220px",
            }}
          >
            <p style={{ margin: "0 0 10px", fontSize: "14px", fontWeight: 600, color: "#1a1a1a" }}>{label}</p>
            <PayPalButton hostedButtonId={hostedButtonId} />
          </div>
        )}

        <div
          className={`donate-chip-inner${pulse ? " donate-chip-pulse" : ""}`}
          {...hoverHandlers}
          style={{
            display: "flex",
            alignItems: "center",
            gap: expanded ? "10px" : "0",
            background: bg,
            borderRadius: expanded ? "999px" : "50%",
            width: expanded ? "auto" : "52px",
            height: "52px",
            padding: expanded ? "0 20px 0 14px" : "0",
            justifyContent: expanded ? "flex-start" : "center",
            cursor: "pointer",
            boxShadow: "0 4px 18px rgba(0,0,0,0.22)",
            overflow: "hidden",
            whiteSpace: "nowrap",
            userSelect: "none",
            transition: "background 0.2s, border-radius 0.3s cubic-bezier(0.34,1.56,0.64,1), width 0.3s cubic-bezier(0.34,1.56,0.64,1), padding 0.3s ease",
          }}
          onClick={() => {
            if (!expanded) { setExpanded(true); return; }
            if (!hostedButtonId) window.location.href = href;
          }}
          role="button"
          aria-label={label}
          aria-expanded={expanded}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!expanded) { setExpanded(true); return; }
              if (!hostedButtonId) window.location.href = href;
            }
          }}
        >
          <span style={{
            fontSize: "1.1rem", flexShrink: 0,
            transition: "transform 0.3s ease",
            transform: expanded ? "scale(1.15)" : "scale(1)",
          }}>❤️</span>

          <span style={{
            display: "flex", flexDirection: "column", gap: "1px",
            opacity: expanded ? 1 : 0,
            maxWidth: expanded ? "220px" : "0",
            overflow: "hidden",
            transition: "opacity 0.25s ease, max-width 0.3s ease",
          }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem", lineHeight: 1.2 }}>{label}</span>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.75rem", lineHeight: 1.2 }}>{cta}</span>
          </span>
        </div>
      </div>
    </>
  );
}
