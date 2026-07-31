import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login — Postman</title>
      </Head>
      <div style={{
        minHeight: "100vh", display: "grid", placeItems: "center",
        background: "#f6f5f1", fontFamily: "Inter, system-ui, sans-serif",
      }}>
        <form onSubmit={handleSubmit} style={{
          background: "#fff", padding: 32, borderRadius: 10,
          border: "1px solid #d8d3c6", width: 340, display: "grid", gap: 14,
        }}>
          <h1 style={{ margin: 0, fontSize: "1.4rem" }}>Postman Admin</h1>
          <label style={{ display: "grid", gap: 6, fontSize: "0.9rem", color: "#66706a" }}>
            Email
            <input
              type="email" value={email} required
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: 10, borderRadius: 6, border: "1px solid #d8d3c6" }}
            />
          </label>
          <label style={{ display: "grid", gap: 6, fontSize: "0.9rem", color: "#66706a" }}>
            Password
            <input
              type="password" value={password} required
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: 10, borderRadius: 6, border: "1px solid #d8d3c6" }}
            />
          </label>
          {error && <p style={{ color: "#b72d32", margin: 0, fontSize: "0.9rem" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            background: "#b72d32", color: "#fff", border: "none",
            borderRadius: 7, padding: "12px 18px", fontWeight: 600, cursor: "pointer",
          }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </>
  );
}