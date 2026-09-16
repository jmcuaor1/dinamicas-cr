const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.setHeader("Cache-Control", "no-store");

  if (!KV_URL || !KV_TOKEN) {
    // Sin KV conectado todavía: el front cae a los valores de config.json.
    res.status(200).json({});
    return;
  }

  try {
    const kvRes = await fetch(`${KV_URL}/get/site-config`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    const data = await kvRes.json();
    const siteConfig = data.result ? JSON.parse(data.result) : {};
    res.status(200).json(siteConfig);
  } catch {
    res.status(200).json({});
  }
}
