import { createClient } from "@vercel/edge-config";

// El SDK busca por defecto la connection string en process.env.EDGE_CONFIG,
// pero Vercel nombra esa variable según el store conectado (acá quedó como
// GLOBAL_CONFIG), así que la resolvemos explícitamente en vez de depender
// del nombre por defecto.
const connectionString = process.env.EDGE_CONFIG || process.env.GLOBAL_CONFIG;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.setHeader("Cache-Control", "no-store");

  if (!connectionString) {
    // Sin Edge Config conectado todavía: el front cae a los valores de config.json.
    res.status(200).json({});
    return;
  }

  try {
    const edgeConfig = createClient(connectionString);
    const siteConfig = (await edgeConfig.get("site-config")) || {};
    res.status(200).json(siteConfig);
  } catch {
    res.status(200).json({});
  }
}
