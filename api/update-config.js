export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { password, whatsappLink, phone } = req.body || {};

  if (!process.env.ADMIN_PASSWORD) {
    res.status(500).json({ error: "El servidor no tiene una contraseña configurada." });
    return;
  }

  if (typeof password !== "string" || password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Contraseña incorrecta." });
    return;
  }

  if (typeof whatsappLink !== "string" || typeof phone !== "string") {
    res.status(400).json({ error: "Faltan datos." });
    return;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(whatsappLink);
  } catch {
    res.status(400).json({ error: "El link de WhatsApp no es una URL válida." });
    return;
  }
  if (parsedUrl.protocol !== "https:") {
    res.status(400).json({ error: "El link de WhatsApp debe empezar con https://" });
    return;
  }

  const trimmedPhone = phone.trim();
  if (!trimmedPhone || trimmedPhone.length > 40) {
    res.status(400).json({ error: "El número de teléfono no es válido." });
    return;
  }

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    res.status(500).json({
      error:
        "El servidor no está configurado: falta conectar la base de datos KV (Storage → Redis) al proyecto.",
    });
    return;
  }

  const value = { whatsappLink: parsedUrl.toString(), phone: trimmedPhone };

  try {
    const kvRes = await fetch(`${kvUrl}/set/site-config`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kvToken}`,
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(value),
    });

    if (!kvRes.ok) {
      const errText = await kvRes.text();
      res.status(502).json({ error: `No se pudo guardar: ${errText}` });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Error al guardar los cambios." });
  }
}
