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

  const edgeConfigId = process.env.EDGE_CONFIG_ID;
  const token = process.env.VERCEL_EDGE_CONFIG_TOKEN;

  if (!edgeConfigId || !token) {
    res.status(500).json({
      error:
        "El servidor no está configurado: faltan EDGE_CONFIG_ID o VERCEL_EDGE_CONFIG_TOKEN.",
    });
    return;
  }

  const value = { whatsappLink: parsedUrl.toString(), phone: trimmedPhone };

  const patchItem = (operation) =>
    fetch(`https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ operation, key: "site-config", value }],
      }),
    });

  try {
    // El item "site-config" no existe todavía la primera vez que se guarda,
    // así que primero intentamos crearlo. Si ya existe (guardados
    // posteriores), "create" falla y reintentamos con "update".
    let response = await patchItem("create");
    if (!response.ok) {
      response = await patchItem("update");
    }

    if (!response.ok) {
      const errText = await response.text();
      res.status(502).json({ error: `No se pudo guardar: ${errText}` });
      return;
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ error: "Error al guardar los cambios." });
  }
}
