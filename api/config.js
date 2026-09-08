import { createClient } from "@vercel/global-config";

// Vercel renombró "Edge Config" a "Global Config"; la connection string que
// Vercel inyecta automáticamente al conectar el store queda en
// process.env.GLOBAL_CONFIG (se soporta EDGE_CONFIG también por si el store
// se conectó con el nombre viejo).
const connectionString = process.env.GLOBAL_CONFIG || process.env.EDGE_CONFIG;

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
