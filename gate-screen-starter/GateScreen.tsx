"use client";
import { useState } from "react";
import styles from "./GateScreen.module.css";

// ── Configure these 5 constants for each app ──────────────────────────────
const PRODUCT_NAME = "Your Tool Name";
const PRODUCT_TAGLINE = "One-line description of what this tool does.";
const FEATURE_LIST = [
  "Feature one",
  "Feature two", 
  "Feature three",
];
const ACCENT_COLOR = "#C4882A"; // mustard — change per app if needed
const GITHUB_URL = "https://github.com/kaitwaite/your-repo";
// ─────────────────────────────────────────────────────────────────────────

interface GateScreenProps {
  onKeySubmit: (key: string) => void;
}

export default function GateScreen({ onKeySubmit }: GateScreenProps) {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!key.trim()) {
      setError("Please enter your Anthropic API key.");
      return;
    }
    if (!key.startsWith("sk-ant-")) {
      setError("That doesn't look like an Anthropic API key. It should start with sk-ant-");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 10,
          messages: [{ role: "user", content: "hi" }],
        }),
      });
      if (res.ok) {
        sessionStorage.setItem("anthropic_key", key);
        onKeySubmit(key);
      } else {
        const data = await res.json();
        setError(data?.error?.message || "Invalid API key. Please check and try again.");
      }
    } catch {
      setError("Couldn't validate the key. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.gate}>
      <div className={styles.inner}>
        <div className={styles.tag}>Bring Your Own Key · Demo</div>
        <h1 className={styles.title}>{PRODUCT_NAME}</h1>
        <p className={styles.tagline}>{PRODUCT_TAGLINE}</p>
        <ul className={styles.features}>
          {FEATURE_LIST.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className={styles.form}>
          <label className={styles.label} htmlFor="apikey">
            Your Anthropic API Key
          </label>
          <input
            id="apikey"
            type="password"
            className={styles.input}
            placeholder="sk-ant-..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button
            className={styles.btn}
            style={{ background: loading ? "#8A8070" : ACCENT_COLOR }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Validating..." : "Enter →"}
          </button>
        </div>
        <p className={styles.note}>
          Your key is used only in this session and never stored on any server.{" "}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            View source on GitHub
          </a>
          {" · "}
          <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">
            Get an API key
          </a>
        </p>
      </div>
    </div>
  );
}
