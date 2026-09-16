import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL;
let client;

function getClient() {
  if (!client && REDIS_URL) client = new Redis(REDIS_URL);
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.setHeader("Cache-Control", "no-store");

  const redis = getClient();
  if (!redis) {
    // Sin Redis conectado todavía: el front cae a los valores de config.json.
    res.status(200).json({});
    return;
  }

  try {
    const raw = await redis.get("site-config");
    res.status(200).json(raw ? JSON.parse(raw) : {});
  } catch {
    res.status(200).json({});
  }
}
