import { get } from "@vercel/edge-config";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.setHeader("Cache-Control", "no-store");

  try {
    const siteConfig = (await get("site-config")) || {};
    res.status(200).json(siteConfig);
  } catch {
    // Sin Edge Config conectado todavía (ej. antes del setup inicial en Vercel):
    // el front cae a los valores de config.json.
    res.status(200).json({});
  }
}
