import { useEffect, useState } from "react";
import config from "../config.json";
import { useSiteConfig } from "./useSiteConfig";

const BRAND_NAME = config.brandName;
const HERO_IMAGE = config.heroImage;
const LOGO_BLACK = config.logoBlack;
const LOGO_WHITE = config.logoWhite;
const PAYMENT_PROOF_IMAGES = config.comprobantes;

const SOCIAL_LINKS = [
  {
    key: "instagram",
    icon: "📸",
    label: config.socialLinks.instagram,
    href: `https://instagram.com/${config.socialLinks.instagram.replace(/^@/, "")}`,
  },
  {
    key: "tiktok",
    icon: "🎵",
    label: config.socialLinks.tiktok,
    href: `https://tiktok.com/@${config.socialLinks.tiktok.replace(/^@/, "")}`,
  },
  {
    key: "facebook",
    icon: "📘",
    label: config.socialLinks.facebook,
    href: null,
  },
];

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Pagos / Comprobantes", href: "#comprobantes" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Preguntas frecuentes", href: "#faq" },
];

const BENEFITS = [
  {
    icon: "🏆",
    title: "Premios reales y variados",
    desc: "Dinero en efectivo, transferencias, tarjetas de regalo y más. Todos verificables.",
  },
  {
    icon: "💬",
    title: "Solo necesitás WhatsApp",
    desc: "Sin apps extra, sin registros complicados. Participás directo desde tu celular.",
  },
  {
    icon: "🔒",
    title: "Transparencia total",
    desc: "Cada sorteo es público. Los comprobantes de pago se publican en el grupo.",
  },
  {
    icon: "🚀",
    title: "Comunidad activa",
    desc: "Miles de miembros participando a diario. Dinámicas nuevas cada 24 horas.",
  },
];

const PROOFS = [
  {
    name: "Valentina R.",
    amount: "$15.000",
    method: "Transferencia bancaria",
    date: "04 Sep 2026",
    img: PAYMENT_PROOF_IMAGES[0],
  },
  {
    name: "Marcos G.",
    amount: "$22.500",
    method: "Billetera virtual",
    date: "03 Sep 2026",
    img: PAYMENT_PROOF_IMAGES[1],
  },
  {
    name: "Lucía M.",
    amount: "$8.000",
    method: "Transferencia interbancaria",
    date: "02 Sep 2026",
    img: PAYMENT_PROOF_IMAGES[2],
  },
  {
    name: "Diego F.",
    amount: "$30.000",
    method: "Billetera virtual",
    date: "01 Sep 2026",
    img: PAYMENT_PROOF_IMAGES[3],
  },
  {
    name: "Camila P.",
    amount: "$12.000",
    method: "Transferencia instantánea",
    date: "31 Ago 2026",
    img: PAYMENT_PROOF_IMAGES[4],
  },
];

const STATS = [
  { value: "18.400+", label: "Miembros en la comunidad" },
  { value: "1.200+", label: "Dinámicas realizadas" },
  { value: "340", label: "Ganadores este mes" },
  { value: "4.9★", label: "Calificación promedio" },
];

const STEPS = [
  {
    n: "01",
    title: "Unite al grupo de WhatsApp",
    desc: "Hacé clic en el botón y accedé directo al grupo oficial. Es gratis.",
  },
  {
    n: "02",
    title: "Seguí las instrucciones de la dinámica",
    desc: "Cada día publicamos las reglas. Son simples: un mensaje, una foto o una respuesta.",
  },
  {
    n: "03",
    title: "Esperá el sorteo en vivo",
    desc: "El resultado se transmite en tiempo real dentro del grupo. Transparente y verificable.",
  },
  {
    n: "04",
    title: "Recibí tu premio con comprobante",
    desc: "El pago se realiza al instante y el comprobante queda publicado para todos.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "No lo podía creer. Me llegó la transferencia en minutos. El grupo es serio y el equipo muy transparente.",
    name: "Valentina R.",
  },
  {
    quote:
      "Entré desconfiada pero ya gané dos veces. Los comprobantes son reales y la comunidad es increíble.",
    name: "Lucía M.",
  },
  {
    quote:
      "Llevo 3 meses en el grupo y recomiendo a todos mis amigos. Dinámicas todos los días, muy buena onda.",
    name: "Marcos G.",
  },
];

const FAQS = [
  {
    q: "¿Es real o es una estafa?",
    a: "100% real. Publicamos todos los comprobantes de pago dentro del grupo y en esta página. Podés verificar cada transferencia y nombre del ganador.",
  },
  {
    q: "¿Tiene algún costo unirse?",
    a: "No. Unirse al grupo es completamente gratuito. Las dinámicas básicas son gratis; algunas especiales pueden requerir participación mínima, pero siempre se aclara antes.",
  },
  {
    q: "¿Qué necesito para participar?",
    a: "Solo tu WhatsApp. No hace falta app extra, ni cuenta bancaria especial. Solo seguís las instrucciones del día.",
  },
  {
    q: "¿Cómo se verifica el pago?",
    a: "Cada pago genera un comprobante oficial (captura + número de transacción) que publicamos en el grupo y en nuestra galería pública de esta página.",
  },
  {
    q: "¿Con qué frecuencia se hacen dinámicas?",
    a: "Todos los días. A veces hay 2 o 3 dinámicas por día dependiendo de la cantidad de miembros activos.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${q.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
  return (
    <div className="border-b border-[#DCDADB] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 px-1 text-left gap-4 cursor-pointer"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span
          className="font-semibold text-[#040507] text-base"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {q}
        </span>
        <span
          className={`text-[#93C306] text-xl font-bold flex-shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <p id={panelId} className="pb-4 px-1 text-[#252824] text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function App() {
  const { whatsappLink: WA_LINK, phone: PHONE } = useSiteConfig();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-full bg-[#F3F3F3]" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ── STICKY TOP BAR ── */}
      <div className="sticky top-0 z-50 bg-[#B7DE05] text-[#040507] px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-3 shadow-[0_6px_20px_rgba(4,5,7,0.08)]">
        <p className="text-xs sm:text-sm font-medium flex items-center gap-2 min-w-0">
          <span className="inline-block w-2 h-2 rounded-full bg-[#101214] animate-pulse flex-shrink-0"></span>
          <span className="truncate">Dinámica activa hoy · Cupos limitados</span>
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 bg-[#101214] text-[#F3F3F3] text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-[#252824] transition-colors"
        >
          Entrar ahora
        </a>
      </div>

      {/* ── HEADER ── */}
      <header className="bg-[#F3F3F3]/90 backdrop-blur-sm border-b border-[#DCDADB] px-5 py-4 flex items-center justify-between relative z-40">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#B7DE05] flex items-center justify-center overflow-hidden shadow-[0_10px_24px_rgba(183,222,5,0.4)]">
            <img
              src={LOGO_BLACK}
              alt={`Logo de ${BRAND_NAME}`}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-lg font-black text-[#040507] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {BRAND_NAME}
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#252824] hover:text-[#93C306] font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex bg-[#B7DE05] hover:bg-[#DBF225] text-[#040507] text-sm font-bold px-4 py-2 rounded-xl shadow-[0_10px_24px_rgba(183,222,5,0.28)] transition-colors"
          >
            Unirme al grupo
          </a>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-5 h-0.5 bg-[#040507] transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-5 h-0.5 bg-[#040507] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-5 h-0.5 bg-[#040507] transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>

        {/* Mobile nav drawer */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 right-0 bg-[#F3F3F3] border-b border-[#DCDADB] shadow-lg lg:hidden"
          >
            <div className="flex flex-col px-5 py-4 gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-[#252824] font-medium hover:text-[#93C306]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B7DE05] text-[#040507] text-sm font-bold px-4 py-2.5 rounded-lg text-center"
              >
                Unirme al grupo
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="inicio"
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #040507 0%, #101214 42%, #252824 100%)",
        }}
      >
        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 bg-[#DBF225] -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 bg-[#B7DE05] translate-y-16 -translate-x-16"></div>

        <div className="relative max-w-6xl mx-auto px-5 pt-12 pb-12 lg:pt-16 lg:pb-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#B7DE05]/10 border border-[#B7DE05]/30 text-[#DBF225] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span>🌎</span> Comunidad 100% online
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F3F3F3] leading-[0.94] mb-5"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Ganá todos los días,
                <span className="block text-[#DBF225]">con pagos 100%</span>
                <span className="block">verificados</span>
              </h1>

              <p className="text-[#DCDADB] text-base leading-relaxed mb-8 max-w-xl">
                Somos una comunidad de WhatsApp con dinámicas y sorteos diarios. Participás gratis, el sorteo es en vivo y los premios se acreditan al instante con comprobante público.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#B7DE05] hover:bg-[#DBF225] text-[#040507] font-black text-lg px-7 py-4 rounded-2xl shadow-[0_18px_40px_rgba(183,222,5,0.26)] transition-all hover:scale-[1.02] active:scale-95"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Unirme gratis al grupo
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-[#F3F3F3] transition-colors hover:bg-white/10"
                >
                  Ver cómo funciona
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#DCDADB]">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#B7DE05]"></span> Más de 18.400 miembros</span>
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#DBF225]"></span> Sorteos diarios</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-[#B7DE05]/10 blur-3xl"></div>
              <div className="relative rounded-[2rem] border border-[#B7DE05]/20 bg-white/5 p-4 backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
                <div className="flex items-center justify-center rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#101214] p-8">
                  <img
                    src={HERO_IMAGE}
                    alt={`Logo de ${BRAND_NAME}`}
                    className="h-[180px] sm:h-[240px] lg:h-[320px] w-auto max-w-full object-contain"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div className="mt-4 rounded-2xl bg-[#040507]/70 border border-[#B7DE05]/20 p-4 text-[#F3F3F3]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#DBF225]">Último premio</p>
                      <p className="mt-1 text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>$22.500</p>
                    </div>
                    <span className="rounded-full bg-[#B7DE05] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#040507]">Verificado</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-[#DCDADB]">
                    <span>Valentina R.</span>
                    <span>Hace 12 minutos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="bg-[#F3F3F3] px-5 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#93C306] mb-3">Beneficios</p>
            <h2
              className="text-2xl sm:text-3xl font-black text-[#040507] mb-2"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              ¿Por qué elegirnos?
            </h2>
            <p className="text-[#252824] text-sm">
              Todo lo que necesitás para confiar y participar
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="group bg-white rounded-[1.5rem] p-5 border border-[#DCDADB] shadow-[0_16px_36px_rgba(4,5,7,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(147,195,6,0.12)] transition-all"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DBF225]/25 text-2xl shadow-inner shadow-[#B7DE05]/20">
                  {b.icon}
                </div>
                <h3
                  className="font-bold text-[#040507] mb-2"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {b.title}
                </h3>
                <p className="text-[#252824] text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / COMPROBANTES ── */}
      <section id="comprobantes" className="bg-[#F3F3F3] px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#93C306] text-center mb-3">Comprobantes</p>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#040507] text-center mb-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Nuestra comunidad ya está ganando
          </h2>
          <p className="text-[#252824] text-center text-sm mb-8">
            Comprobantes reales de pagos recientes
          </p>

          {/* Horizontal scroll gallery */}
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-3 -mx-5 px-5" style={{ scrollSnapType: "x mandatory" }}>
            {PROOFS.map((p) => (
              <div
                key={p.name}
                className="flex-shrink-0 w-64 bg-white rounded-2xl border border-[#DCDADB] shadow-[0_16px_36px_rgba(4,5,7,0.03)] overflow-hidden"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative h-36 bg-[#DBF225]/20">
                  <img
                    src={p.img}
                    alt={`Comprobante de pago de ${p.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-2 left-3">
                    <span className="bg-[#B7DE05] text-[#040507] text-xs font-bold px-2 py-0.5 rounded-full">
                      ✓ Verificado
                    </span>
                  </div>
                </div>
                <div className="p-3.5">
                  <p
                    className="font-black text-[#93C306] text-lg"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {p.amount}
                  </p>
                  <p className="text-[#040507] font-semibold text-sm">{p.name}</p>
                  <p className="text-[#C6C5C6] text-xs">{p.date}</p>
                  <p className="text-[#252824] text-xs mt-1 flex items-center gap-1">
                    <span>💳</span> {p.method}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B7DE05] hover:bg-[#DBF225] text-[#040507] font-bold px-6 py-3 rounded-2xl shadow-[0_10px_24px_rgba(183,222,5,0.28)] transition-all hover:scale-[1.02] active:scale-95"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Quiero participar también →
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="px-5 py-14"
        style={{ background: "linear-gradient(135deg, #040507, #101214, #252824)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#DBF225] text-center mb-8">En números</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={i > 0 ? "sm:border-l sm:border-white/10 sm:pl-2" : ""}
              >
                <p
                  className="text-3xl sm:text-4xl font-black text-[#DBF225] mb-1"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-[#DCDADB] text-xs leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="como-funciona" className="bg-[#F3F3F3] px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#93C306] text-center mb-3">Proceso</p>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#040507] text-center mb-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            ¿Cómo funciona?
          </h2>
          <p className="text-[#252824] text-center text-sm mb-10">
            4 pasos simples para empezar a ganar
          </p>
          <div className="flex flex-col gap-5">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="flex gap-4 items-start bg-white rounded-2xl p-5 border border-[#DCDADB] shadow-[0_16px_36px_rgba(4,5,7,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(147,195,6,0.12)] transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#B7DE05] text-[#040507] font-black text-lg flex items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {s.n}
                </div>
                <div>
                  <h3
                    className="font-bold text-[#040507] mb-1"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[#252824] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B7DE05] hover:bg-[#DBF225] text-[#040507] font-black px-6 py-3.5 rounded-2xl shadow-[0_10px_24px_rgba(183,222,5,0.28)] transition-all hover:scale-[1.02] active:scale-95"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Empezar ahora — es gratis →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="opiniones" className="bg-[#F3F3F3] px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#93C306] text-center mb-3">Testimonios</p>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#040507] text-center mb-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Lo que dicen nuestros ganadores
          </h2>
          <p className="text-[#252824] text-center text-sm mb-10">
            Opiniones reales de miembros activos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-5 border border-[#DCDADB] shadow-[0_16px_36px_rgba(4,5,7,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(147,195,6,0.12)] transition-all"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#B7DE05] text-sm">★</span>
                  ))}
                </div>
                <p className="text-[#252824] text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#DBF225] flex items-center justify-center text-[#040507] font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <p className="font-semibold text-[#040507] text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-[#F3F3F3] px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#93C306] text-center mb-3">Ayuda</p>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#040507] text-center mb-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Preguntas frecuentes
          </h2>
          <p className="text-[#252824] text-center text-sm mb-10">
            Todo lo que necesitás saber antes de unirte
          </p>
          <div className="bg-white rounded-2xl border border-[#DCDADB] shadow-[0_16px_36px_rgba(4,5,7,0.03)] px-5">
            {FAQS.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BAND ── */}
      <section
        className="px-5 py-16 text-center"
        style={{ background: "linear-gradient(160deg, #93C306, #B7DE05, #DBF225)" }}
      >
        <div className="max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#040507]/15 text-[#040507] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-[#040507] animate-pulse inline-block"></span>
            Dinámica activa ahora mismo
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black text-[#040507] mb-4 leading-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Los cupos de hoy se<br />están llenando rápido
          </h2>
          <p className="text-[#101214] text-base mb-8">
            Unite ahora y participá en la dinámica de hoy. Los premios se sortean en minutos.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#040507] hover:bg-[#101214] text-[#F3F3F3] font-black text-lg px-8 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Unirme al grupo ahora
          </a>
          <p className="text-[#101214] text-sm mt-5">
            📞 WhatsApp directo:{" "}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              {PHONE}
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#040507] text-[#C6C5C6] px-5 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Brand */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#B7DE05] flex items-center justify-center overflow-hidden">
              <img
                src={LOGO_WHITE}
                alt={`Logo de ${BRAND_NAME}`}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#F3F3F3] font-black text-base" style={{ fontFamily: "Outfit, sans-serif" }}>
              {BRAND_NAME}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-6 max-w-sm text-[#DCDADB]">
            Comunidad verificada de dinámicas y sorteos diarios. Pagos reales, comprobantes públicos y transparencia total desde 2023 en Dinámicas CR.
          </p>

          {/* Nav anchors */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm hover:text-[#DBF225] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
            <div className="flex flex-col gap-2">
              <p className="text-[#F3F3F3] font-semibold text-xs uppercase tracking-wide mb-1">Contacto</p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DBF225] flex items-center gap-2"
              >
                <span>💬</span> {PHONE}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#F3F3F3] font-semibold text-xs uppercase tracking-wide mb-1">Redes sociales</p>
              {SOCIAL_LINKS.map((s) =>
                s.href ? (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DBF225] flex items-center gap-2"
                  >
                    <span>{s.icon}</span> {s.label}
                  </a>
                ) : (
                  <span key={s.key} className="flex items-center gap-2">
                    <span>{s.icon}</span> {s.label}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Legal */}
          <div className="border-t border-[#252824] pt-6">
            <p className="text-xs leading-relaxed text-[#DCDADB] mb-2">
              ⚖️ Las dinámicas de Dinámicas CR son de participación voluntaria y gratuita. Jugá con responsabilidad. Solo para mayores de 18 años.
            </p>
            <p className="text-xs text-[#C6C5C6]">
              © 2026 Dinámicas CR · Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
        className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#040507] text-[#F3F3F3] shadow-[0_10px_30px_rgba(4,5,7,0.3)] transition-all hover:bg-[#252824] ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-3"
        }`}
      >
        ↑
      </button>
    </div>
  );
}
