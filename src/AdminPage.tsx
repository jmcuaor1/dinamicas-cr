import { useState } from "react";
import config from "../config.json";

type Status =
  | { type: "idle" }
  | { type: "saving" }
  | { type: "ok"; message: string }
  | { type: "error"; message: string };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [whatsappLink, setWhatsappLink] = useState(config.whatsappLink);
  const [phone, setPhone] = useState(config.phone);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/update-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, whatsappLink, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "No se pudo guardar." });
        return;
      }
      setStatus({ type: "ok", message: "Guardado. Ya está visible en el sitio para todos." });
    } catch {
      setStatus({ type: "error", message: "No se pudo conectar con el servidor." });
    }
  }

  return (
    <div
      className="min-h-full flex items-center justify-center bg-[#F3F3F3] px-5 py-12"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl border border-[#DCDADB] shadow-[0_16px_36px_rgba(4,5,7,0.06)] p-6"
      >
        <h1
          className="text-xl font-black text-[#040507] mb-1"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Panel de administración
        </h1>
        <p className="text-sm text-[#252824] mb-6">
          Cambiá el número y el link de WhatsApp que se muestran en el sitio.
        </p>

        <label className="block text-xs font-semibold uppercase tracking-wide text-[#252824] mb-1">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full mb-4 rounded-lg border border-[#DCDADB] px-3 py-2 text-sm outline-none focus:border-[#93C306]"
        />

        <label className="block text-xs font-semibold uppercase tracking-wide text-[#252824] mb-1">
          Link del grupo de WhatsApp
        </label>
        <input
          type="url"
          value={whatsappLink}
          onChange={(e) => setWhatsappLink(e.target.value)}
          required
          placeholder="https://chat.whatsapp.com/xxxxxxxx"
          className="w-full mb-4 rounded-lg border border-[#DCDADB] px-3 py-2 text-sm outline-none focus:border-[#93C306]"
        />

        <label className="block text-xs font-semibold uppercase tracking-wide text-[#252824] mb-1">
          Número visible (texto)
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="+54 9 11 2345-6789"
          className="w-full mb-6 rounded-lg border border-[#DCDADB] px-3 py-2 text-sm outline-none focus:border-[#93C306]"
        />

        <button
          type="submit"
          disabled={status.type === "saving"}
          className="w-full bg-[#B7DE05] hover:bg-[#DBF225] text-[#040507] font-black py-3 rounded-xl transition-colors disabled:opacity-60"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {status.type === "saving" ? "Guardando..." : "Guardar cambios"}
        </button>

        {status.type === "ok" && (
          <p className="mt-4 text-sm text-[#3f6b06] font-medium">{status.message}</p>
        )}
        {status.type === "error" && (
          <p className="mt-4 text-sm text-red-600 font-medium">{status.message}</p>
        )}
      </form>
    </div>
  );
}
