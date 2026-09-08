import { useEffect, useState } from "react";
import config from "../config.json";

export type SiteConfig = {
  whatsappLink: string;
  phone: string;
};

const DEFAULT_CONFIG: SiteConfig = {
  whatsappLink: config.whatsappLink,
  phone: config.phone,
};

export function useSiteConfig(): SiteConfig {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Partial<SiteConfig> | null) => {
        if (!cancelled && data?.whatsappLink && data?.phone) {
          setSiteConfig({ whatsappLink: data.whatsappLink, phone: data.phone });
        }
      })
      .catch(() => {
        // Sin conexión al endpoint (ej. en el preview de Figma Make sin Vercel):
        // se mantienen los valores por defecto de config.json.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return siteConfig;
}
