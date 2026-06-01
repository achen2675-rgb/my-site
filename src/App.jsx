import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const COLORS = {
  stone: "#8B8680",
  stoneDark: "#6B6660",
  stoneLight: "#C8C4BE",
  cream: "#F5F2EE",
  charcoal: "#2C2C2A",
  charcoalLight: "#444441",
  white: "#FFFFFF",
  sage: "#5A7A5A",
  sageDark: "#3B5A3B",
  sageLight: "#8FAF8F",
  sageMuted: "#E8F0E8",
  warmGray: "#9A958E",
  offWhite: "#FAF8F5",
  goldAccent: "#C4A96A",
};

// ─── Animation Hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const translateMap = { up: "translateY(28px)", down: "translateY(-28px)", left: "translateX(28px)", right: "translateX(-28px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      transform: inView ? "translate(0)" : translateMap[direction],
      opacity: inView ? 1 : 0,
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const icons = {
  sparkle: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  leaf: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 22c6-2 12-8 14-16 0 0-8 2-14 16z"/><path d="M2 22l8-8"/></svg>,
  shield: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  heart: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  camera: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  calendar: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  flower: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3z"/><path d="M12 16a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3z"/><path d="M2 12a3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3z"/><path d="M16 12a3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3z"/></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  phone: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  mapPin: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20,6 9,17 4,12"/></svg>,
  menu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  arrowUp: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18,15 12,9 6,15"/></svg>,
  bronze: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 12h10M7 17h6"/></svg>,
  monument: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 21V8l6-6 6 6v13H6z"/><line x1="3" y1="21" x2="21" y2="21"/></svg>,
  plan: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
  snowflake: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5 5-5-5"/><path d="M17 17l-5-5-5 5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M7 7l5 5 5-5"/><path d="M7 17l5-5 5 5"/></svg>,
  globe: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  chevronDown: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9"/></svg>,
};

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav({ currentPage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Services", "Pricing", "Contact"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(250,248,245,0.97)" : "transparent",
      borderBottom: scrolled ? `1px solid ${COLORS.stoneLight}30` : "none",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.35s ease",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <button onClick={() => { setPage("Home"); setMenuOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.sage, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: COLORS.white, fontSize: 16 }}>{icons.leaf}</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: scrolled ? COLORS.charcoal : COLORS.white, lineHeight: 1.2, letterSpacing: "-0.02em" }}>Capital Region</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, color: scrolled ? COLORS.stone : "rgba(255,255,255,0.8)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Memorial Care</div>
          </div>
        </button>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="nav-desktop">
          {links.map(l => (
            <button key={l} onClick={() => setPage(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "8px 14px", borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              color: currentPage === l ? COLORS.sage : (scrolled ? COLORS.charcoal : "rgba(255,255,255,0.9)"),
              borderBottom: currentPage === l ? `2px solid ${COLORS.sage}` : "2px solid transparent",
              transition: "all 0.2s",
            }}>
              {l}
            </button>
          ))}
          <button onClick={() => setPage("Contact")} style={{
            background: COLORS.sage, color: COLORS.white, border: "none", cursor: "pointer",
            padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", marginLeft: 8,
            transition: "all 0.2s", letterSpacing: "0.01em",
            boxShadow: "0 2px 12px rgba(90,122,90,0.3)",
          }}>
            Free Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          color: scrolled ? COLORS.charcoal : COLORS.white,
        }} className="nav-mobile-btn">
          {menuOpen ? icons.close : icons.menu}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: COLORS.offWhite, borderTop: `1px solid ${COLORS.stoneLight}40`,
          padding: "1rem 2rem 1.5rem",
        }}>
          {links.map(l => (
            <button key={l} onClick={() => { setPage(l); setMenuOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              padding: "12px 0", fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 500, color: COLORS.charcoal,
              borderBottom: `1px solid ${COLORS.stoneLight}30`,
            }}>
              {l}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ setPage }) {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #3A4A3A 40%, ${COLORS.sageDark} 100%)`,
      }} />
      {/* Soft texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(ellipse at 30% 60%, rgba(90,122,90,0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
      }} />
      {/* Cemetery path illustration */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", opacity: 0.12 }} viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill={COLORS.sage} d="M0,192L60,186.7C120,181,240,171,360,176C480,181,600,203,720,208C840,213,960,203,1080,181.3C1200,160,1320,128,1380,112L1440,96L1440,320L0,320Z" />
      </svg>
      {/* Decorative cross */}
      <div style={{ position: "absolute", top: "15%", right: "8%", opacity: 0.06 }}>
        <svg width="180" height="240" viewBox="0 0 180 240">
          <rect x="70" y="0" width="40" height="240" fill="white" rx="4"/>
          <rect x="0" y="60" width="180" height="40" fill="white" rx="4"/>
        </svg>
      </div>

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 2rem", paddingTop: 120 }}>
        <div style={{ maxWidth: 680 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "6px 18px", marginBottom: 32 }}>
            <span style={{ color: COLORS.goldAccent }}>{icons.sparkle}</span>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>Albany, NY & Capital Region</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 700, color: COLORS.white, lineHeight: 1.12,
            letterSpacing: "-0.02em", marginBottom: 24,
          }}>
            Restoring Memories<br />
            <em style={{ fontStyle: "italic", color: "#C8D8C8" }}>With Care and Respect</em>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "rgba(255,255,255,0.8)", lineHeight: 1.75, marginBottom: 40, maxWidth: 520,
          }}>
            Professional gravestone cleaning and memorial care services across Albany and the Capital Region. We honor your loved ones with dignity — bringing life back to stone, one memorial at a time.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => setPage("Contact")} style={{
              background: COLORS.sage, color: COLORS.white, border: "none", cursor: "pointer",
              padding: "16px 36px", borderRadius: 50, fontSize: 16, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 8px 32px rgba(90,122,90,0.4)",
              transition: "all 0.25s", letterSpacing: "0.01em",
            }}>
              Get a Free Quote
            </button>
            <button onClick={() => setPage("Services")} style={{
              background: "transparent", color: COLORS.white,
              border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer",
              padding: "16px 36px", borderRadius: 50, fontSize: 16, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s",
            }}>
              View Services
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 24, marginTop: 56, flexWrap: "wrap" }}>
            {[
              { icon: icons.leaf, label: "Respectful Methods" },
              { icon: icons.heart, label: "Family-Owned" },
            ].map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: COLORS.goldAccent }}>{b.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 2s infinite" }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }`}</style>
    </section>
  );
}

// ─── Before/After Slider ──────────────────────────────────────────────────────
function BeforeAfterSlider({ label = "" }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };
  const onMouseDown = () => { dragging.current = true; };
  const onMouseUp = () => { dragging.current = false; };
  const onMouseMove = (e) => { if (dragging.current) handleMove(e.clientX); };
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => { window.removeEventListener("mouseup", onMouseUp); window.removeEventListener("mousemove", onMouseMove); };
  }, []);

  return (
    <div ref={containerRef} onMouseDown={onMouseDown} onTouchMove={onTouchMove} style={{
      position: "relative", height: 260, borderRadius: 16, overflow: "hidden", cursor: "ew-resize",
      userSelect: "none", boxShadow: "0 8px 32px rgba(44,44,42,0.15)",
    }}>
      {/* AFTER (right side / sage green with texture) */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${COLORS.sage} 0%, ${COLORS.sageDark} 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🪦</div>
          <span style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>After</span>
        </div>
      </div>
      {/* BEFORE (left side) */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, background: `linear-gradient(135deg, ${COLORS.warmGray} 0%, #6B6660 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8, filter: "grayscale(1) brightness(0.6)" }}>🪦</div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Before</span>
        </div>
      </div>
      {/* Divider */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 3, background: COLORS.white, transform: "translateX(-50%)", boxShadow: "0 0 12px rgba(0,0,0,0.3)" }} />
      <div style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%, -50%)", width: 44, height: 44, borderRadius: "50%", background: COLORS.white, boxShadow: "0 4px 20px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <span style={{ fontSize: 10, color: COLORS.charcoal }}>◀ ▶</span>
      </div>
      {label && <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 11, padding: "4px 12px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{label}</div>}
    </div>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const reasons = [
    { icon: icons.leaf, title: "Safe Preservation Methods", desc: "We never use bleach, pressure washers, or harmful chemicals — only approved, stone-safe solutions." },
    { icon: icons.heart, title: "Family-Owned & Local", desc: "Based right here in Albany, NY. We treat every memorial as if it were our own family's." },
    { icon: icons.camera, title: "Photo Documentation", desc: "We photograph each memorial before and after service and email you the results." },
    { icon: icons.calendar, title: "Flexible Care Plans", desc: "One-time visits or recurring annual care subscriptions — whatever fits your needs." },

  ];

  return (
    <section style={{ padding: "100px 2rem", background: COLORS.offWhite }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 16 }}>Why Families Choose Us</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: COLORS.charcoal, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Trusted by Families<br />Across the Capital Region
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.08} direction="up">
              <div style={{
                background: COLORS.white, borderRadius: 20, padding: "32px 28px",
                boxShadow: "0 2px 20px rgba(44,44,42,0.06)",
                border: `1px solid ${COLORS.stoneLight}30`,
                transition: "all 0.25s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(44,44,42,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(44,44,42,0.06)"; }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: COLORS.sageMuted, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.sage, marginBottom: 20 }}>
                  {r.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: COLORS.charcoal, marginBottom: 10, fontWeight: 700 }}>{r.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: COLORS.warmGray, lineHeight: 1.7 }}>{r.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { name: "Margaret T.", location: "Albany, NY", text: "They restored my mother's headstone beautifully. After years of moss and weathering, it looks as dignified as the day it was placed. I was moved to tears.", rating: 5 },
    { name: "Robert & Linda K.", location: "Saratoga Springs, NY", text: "We live out of state and can't visit Dad's grave as often as we'd like. Capital Region Memorial Care sends us photos after each visit. It's an incredible service.", rating: 5 },
    { name: "James O.", location: "Troy, NY", text: "Absolutely professional. They explained every step of the cleaning process and made sure I was comfortable before they started. Truly exceptional care.", rating: 5 },
    { name: "Susan F.", location: "Schenectady, NY", text: "The bronze plaque on my husband's marker hadn't been cleaned in years. The transformation was remarkable. I highly recommend this service to any family.", rating: 5 },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: "100px 2rem", background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #2F3A2F 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(90,122,90,0.08)" }} />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sageLight, marginBottom: 16 }}>What Families Say</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: COLORS.white, fontWeight: 700, marginBottom: 56, letterSpacing: "-0.02em" }}>
            Words From the Families We Serve
          </h2>
        </FadeIn>

        <div style={{ position: "relative", minHeight: 200 }}>
          {testimonials.map((t, i) => (
            <div key={t.name} style={{
              position: i === active ? "relative" : "absolute",
              opacity: i === active ? 1 : 0,
              transform: i === active ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease",
              top: 0, left: 0, right: 0,
            }}>
              <div style={{ color: COLORS.goldAccent, display: "flex", justifyContent: "center", gap: 4, marginBottom: 24 }}>
                {[...Array(t.rating)].map((_, j) => <span key={j}>{icons.star}</span>)}
              </div>
              <blockquote style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontStyle: "italic",
                color: "rgba(255,255,255,0.9)", lineHeight: 1.7,
                marginBottom: 32,
              }}>
                "{t.text}"
              </blockquote>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: COLORS.white, fontSize: 15 }}>{t.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.sageLight, fontSize: 13, marginTop: 4 }}>{t.location}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 48 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 28 : 8, height: 8, borderRadius: 50,
              background: i === active ? COLORS.sage : "rgba(255,255,255,0.25)",
              border: "none", cursor: "pointer", transition: "all 0.3s",
              padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Service Areas ────────────────────────────────────────────────────────────
function ServiceAreas() {
  const areas = ["Albany", "Troy", "Schenectady", "Saratoga Springs", "Colonie", "Latham", "Clifton Park", "Guilderland"];
  return (
    <section style={{ padding: "80px 2rem", background: COLORS.cream }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 16 }}>Where We Serve</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: COLORS.charcoal, fontWeight: 700, marginBottom: 48, letterSpacing: "-0.02em" }}>
            Serving the Capital Region
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            {areas.map(a => (
              <div key={a} style={{
                background: COLORS.white, border: `1px solid ${COLORS.stoneLight}50`,
                borderRadius: 50, padding: "12px 28px",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: COLORS.charcoalLight,
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 2px 12px rgba(44,44,42,0.05)",
              }}>
                <span style={{ color: COLORS.sage }}>{icons.mapPin}</span> {a}
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.warmGray, fontSize: 14, marginTop: 28 }}>
            Not seeing your area? <span style={{ color: COLORS.sage, fontWeight: 600, cursor: "pointer" }}>Contact us</span> — we may still be able to help.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Pricing Preview ──────────────────────────────────────────────────────────
function PricingPreview({ setPage }) {
  const plans = [
    { name: "Flat Marker", price: "$75–$120", desc: "Bronze or granite flat ground markers", popular: false },
    { name: "Upright Headstone", price: "$125–$200", desc: "Standard upright granite or marble headstones", popular: true },
    { name: "Family Monument", price: "$250–$500+", desc: "Large family plots and monument structures", popular: false },
  ];
  return (
    <section style={{ padding: "100px 2rem", background: COLORS.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 16 }}>Simple Pricing</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: COLORS.charcoal, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Transparent, Fair Pricing
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {plans.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08}>
              <div style={{
                background: p.popular ? COLORS.charcoal : COLORS.white,
                borderRadius: 20, padding: "36px 32px",
                border: p.popular ? "none" : `1px solid ${COLORS.stoneLight}40`,
                boxShadow: p.popular ? "0 20px 60px rgba(44,44,42,0.25)" : "0 2px 20px rgba(44,44,42,0.06)",
                position: "relative", overflow: "hidden",
              }}>
                {p.popular && (
                  <div style={{ position: "absolute", top: 20, right: -28, background: COLORS.sage, color: "#fff", fontSize: 11, padding: "4px 40px", transform: "rotate(45deg)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>POPULAR</div>
                )}
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: p.popular ? COLORS.white : COLORS.charcoal, marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: p.popular ? "rgba(255,255,255,0.6)" : COLORS.warmGray, marginBottom: 24 }}>{p.desc}</p>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 700, color: p.popular ? COLORS.sageLight : COLORS.sage, marginBottom: 28 }}>{p.price}</div>
                <button onClick={() => setPage("Contact")} style={{
                  width: "100%", padding: "14px", borderRadius: 50,
                  background: p.popular ? COLORS.sage : "transparent",
                  border: p.popular ? "none" : `2px solid ${COLORS.stone}40`,
                  color: p.popular ? COLORS.white : COLORS.charcoal,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                  Request Quote
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", color: COLORS.warmGray, fontSize: 13, marginTop: 32, fontStyle: "italic" }}>
            * Pricing varies by stone size, condition, cemetery regulations, and travel distance. Free estimates provided.
          </p>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={() => setPage("Pricing")} style={{ background: "none", border: `1.5px solid ${COLORS.sage}`, color: COLORS.sage, borderRadius: 50, padding: "12px 32px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              View Full Pricing
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What types of stones do you clean?", a: "We safely clean granite, marble, limestone, sandstone, slate, and bronze markers. Each material requires a specific approach, and we tailor our methods accordingly." },
    { q: "Do you use pressure washers or bleach?", a: "Never. We use only pH-neutral, stone-safe biological cleaners and soft brushes. Bleach and pressure washers cause irreversible damage to memorials." },
    { q: "How long does a cleaning appointment take?", a: "Most headstone cleanings take 1–3 hours depending on size, condition, and level of biological growth (moss, lichen, algae)." },
    { q: "Do I need to be present for the visit?", a: "Not at all. Simply provide the cemetery name and location. We handle everything and send you photos when complete." },
    { q: "Do you work with cemeteries directly?", a: "We coordinate with cemetery management as needed to ensure we comply with all regulations and restrictions." },
    { q: "Do you offer subscription or recurring care plans?", a: "Yes! Our annual care plans include scheduled visits throughout the year for ongoing maintenance, keeping memorials looking their best." },
  ];

  return (
    <section style={{ padding: "100px 2rem", background: COLORS.cream }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 16 }}>Questions & Answers</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: COLORS.charcoal, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{ background: COLORS.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(44,44,42,0.05)", border: `1px solid ${COLORS.stoneLight}30` }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", textAlign: "left", padding: "22px 28px",
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, fontWeight: 600, color: COLORS.charcoal }}>{f.q}</span>
                  <span style={{ color: COLORS.sage, transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0 }}>{icons.chevronDown}</span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 28px 22px", borderTop: `1px solid ${COLORS.stoneLight}20` }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: COLORS.warmGray, lineHeight: 1.75, marginTop: 16 }}>{f.a}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA Banner ────────────────────────────────────────────────────────
function CTABanner({ setPage }) {
  return (
    <section style={{ padding: "80px 2rem", background: `linear-gradient(135deg, ${COLORS.sage} 0%, ${COLORS.sageDark} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: COLORS.white, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.02em" }}>
            Ready to Honor Their Memory?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 40 }}>
            Contact us today for a free, no-obligation quote. We'll respond within one business day.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("Contact")} style={{
              background: COLORS.white, color: COLORS.sage, border: "none", cursor: "pointer",
              padding: "16px 40px", borderRadius: 50, fontSize: 16, fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif", boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}>
              Get a Free Quote
            </button>
            <a href="tel:+15189519503" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: COLORS.white,
              border: "2px solid rgba(255,255,255,0.6)", cursor: "pointer",
              padding: "16px 40px", borderRadius: 50, fontSize: 16, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
            }}>
              {icons.phone} (518) 951-9503
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      {/* Image Placeholder Gallery */}
      <section style={{ padding: "100px 2rem", background: COLORS.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 16 }}>The Transformation</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: COLORS.charcoal, fontWeight: 700, letterSpacing: "-0.02em" }}>
                Before & After Results
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.warmGray, fontSize: 15, marginTop: 16 }}>Real results from our memorial care services across the Capital Region</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              { label: "Granite Headstone", tag: "Cleaning", icon: "🪦", bg: `linear-gradient(135deg, #7A8B7A 0%, #4A6A4A 100%)` },
              { label: "Family Monument", tag: "Monument", icon: "🏛️", bg: `linear-gradient(135deg, ${COLORS.stone} 0%, ${COLORS.stoneDark} 100%)` },
              { label: "Bronze Flat Marker", tag: "Bronze", icon: "⬛", bg: `linear-gradient(135deg, #8B7355 0%, #6B5535 100%)` },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <div style={{
                  borderRadius: 16, overflow: "hidden", height: 260,
                  background: item.bg, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", position: "relative",
                  boxShadow: "0 8px 32px rgba(44,44,42,0.15)",
                }}>
                  {/* Placeholder pattern */}
                  <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
                    <svg width="100%" height="100%"><defs><pattern id={`grid-${i}`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill={`url(#grid-${i})`}/></svg>
                  </div>
                  <div style={{ textAlign: "center", position: "relative" }}>
                    <div style={{ fontSize: 52, marginBottom: 12 }}>{item.icon}</div>
                    <div style={{ background: "rgba(255,255,255,0.15)", border: "1px dashed rgba(255,255,255,0.4)", borderRadius: 12, padding: "12px 24px" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>📸 Photo Coming Soon</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 4 }}>{item.label}</div>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                    <span style={{ background: COLORS.sage, color: "#fff", fontSize: 10, padding: "4px 12px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{item.tag}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.warmGray, fontSize: 13, fontStyle: "italic" }}>
                Photos of completed work will be added soon. Contact us to see examples specific to your memorial type.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      <WhyChooseUs />
      <ServiceAreas />
      <PricingPreview setPage={setPage} />
      <FAQ />
      <CTABanner setPage={setPage} />
    </>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  const services = [
    { icon: icons.monument, name: "Gravestone Cleaning", desc: "Comprehensive cleaning of all headstone types using bio-safe, stone-appropriate solutions. Removes lichen, algae, moss, and environmental staining.", price: "$75–$200" },
    { icon: icons.sparkle, name: "Family Monument Cleaning", desc: "Full-service restoration for large family monuments, multi-grave plots, and complex stone structures. Detailed and thorough work.", price: "$250–$500+" },
    { icon: icons.bronze, name: "Bronze Marker Cleaning", desc: "Specialized care for bronze memorial plaques and markers. We restore the original patina and apply protective wax coating.", price: "$85–$150" },
    { icon: icons.flower, name: "Flower Placement", desc: "Fresh or artificial flower arrangements placed at the grave on your schedule or for special occasions. We photograph and send you confirmation.", price: "$35–$75" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ padding: "80px 2rem 60px", background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #2F3A2F 100%)`, textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sageLight, marginBottom: 16 }}>What We Offer</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: COLORS.white, fontWeight: 700, letterSpacing: "-0.02em" }}>Our Services</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)", fontSize: 16, marginTop: 20, maxWidth: 560, margin: "20px auto 0" }}>
          Compassionate, professional memorial care services tailored to your family's needs.
        </p>
      </div>

      <section style={{ padding: "80px 2rem", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.05}>
                <div style={{
                  background: COLORS.white, borderRadius: 20, padding: "32px 28px",
                  boxShadow: "0 2px 20px rgba(44,44,42,0.06)", border: `1px solid ${COLORS.stoneLight}30`,
                  display: "flex", flexDirection: "column", gap: 16,
                  transition: "all 0.25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(44,44,42,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 20px rgba(44,44,42,0.06)"; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: COLORS.sageMuted, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.sage }}>
                    {s.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 19, fontWeight: 700, color: COLORS.charcoal, marginBottom: 8 }}>{s.name}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.warmGray, lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                  <div style={{ borderTop: `1px solid ${COLORS.stoneLight}30`, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: COLORS.sage }}>{s.price}</span>
                    <button onClick={() => setPage("Contact")} style={{
                      background: COLORS.sage, color: "#fff", border: "none", cursor: "pointer",
                      padding: "10px 22px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                    }}>
                      Request Quote
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section style={{ padding: "80px 2rem", background: `linear-gradient(135deg, ${COLORS.sageMuted} 0%, ${COLORS.cream} 100%)` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 16 }}>Ongoing Peace of Mind</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: COLORS.charcoal, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20 }}>
              Recurring Memorial Care Plans
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, color: COLORS.warmGray, lineHeight: 1.75, maxWidth: 600, margin: "0 auto 48px" }}>
              Our subscription plans provide year-round care so you never have to worry. Enroll once and we'll handle everything — from spring cleanings to holiday arrangements.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              { name: "Essential", visits: "2 visits/year", price: "$199", features: ["Spring & Fall cleaning", "Photo report"] },
              { name: "Premium", visits: "4 visits/year", price: "$349", features: ["Quarterly cleanings", "Flower placement included", "Priority scheduling"] },
              { name: "Family", visits: "6 visits/year", price: "$499", features: ["Bi-monthly visits", "Seasonal decorations", "Multiple markers", "Dedicated care coordinator"] },
            ].map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.1}>
                <div style={{ background: COLORS.white, borderRadius: 20, padding: "32px 24px", boxShadow: "0 4px 24px rgba(44,44,42,0.08)", textAlign: "left" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: COLORS.charcoal, marginBottom: 4 }}>{plan.name}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.warmGray, marginBottom: 20 }}>{plan.visits}</p>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, color: COLORS.sage, marginBottom: 24 }}>{plan.price}<span style={{ fontSize: 14, color: COLORS.warmGray, fontFamily: "'DM Sans', sans-serif" }}>/yr</span></div>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.charcoalLight }}>
                        <span style={{ color: COLORS.sage, flexShrink: 0 }}>{icons.check}</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setPage("Contact")} style={{ width: "100%", padding: "13px", borderRadius: 50, background: i === 1 ? COLORS.sage : "transparent", border: `1.5px solid ${i === 1 ? COLORS.sage : COLORS.stone}`, color: i === 1 ? "#fff" : COLORS.charcoal, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                    Get Started
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <CTABanner setPage={setPage} />
    </div>
  );
}

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────
function PricingPage({ setPage }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ padding: "80px 2rem 60px", background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #2F3A2F 100%)`, textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sageLight, marginBottom: 16 }}>Transparent Pricing</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: COLORS.white, fontWeight: 700, letterSpacing: "-0.02em" }}>Service Pricing</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)", fontSize: 16, maxWidth: 560, margin: "20px auto 0" }}>
          No hidden fees. Clear pricing so you can plan with confidence.
        </p>
      </div>

      <section style={{ padding: "80px 2rem", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Cleaning */}
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: COLORS.charcoal, fontWeight: 700, marginBottom: 32 }}>Memorial Cleaning Services</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 64 }}>
            {[
              { label: "Flat Marker", sub: "Bronze or granite ground markers", price: "$75–$120" },
              { label: "Upright Headstone", sub: "Standard granite or marble", price: "$125–$200" },
              { label: "Double Headstone", sub: "Companion stones", price: "$175–$280" },
              { label: "Large Monument", sub: "Full monument or obelisk", price: "$250–$500+" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.07}>
                <div style={{ background: COLORS.white, borderRadius: 18, padding: "28px 24px", boxShadow: "0 2px 20px rgba(44,44,42,0.06)", border: `1px solid ${COLORS.stoneLight}30`, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, color: COLORS.sage, marginBottom: 8 }}>{item.price}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: COLORS.charcoal, fontSize: 16, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.warmGray, fontSize: 13 }}>{item.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Add-ons */}
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: COLORS.charcoal, fontWeight: 700, marginBottom: 32 }}>Add-On Services</h2>
          </FadeIn>
          <div style={{ background: COLORS.white, borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 20px rgba(44,44,42,0.06)", marginBottom: 64 }}>
            {[
              { service: "Flower Placement", price: "$35–$75" },
              { service: "Holiday Decoration Placement", price: "$45–$95" },
              { service: "Leveling/Flag holder installation", price: "$25–$50" },
              { service: "Bronze wax coating", price: "$30–$60" },
            ].map((row, i) => (
              <FadeIn key={row.service} delay={i * 0.04}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px", borderBottom: i < 3 ? `1px solid ${COLORS.stoneLight}20` : "none" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.charcoal }}>{row.service}</span>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: COLORS.sage }}>{row.price}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Annual Plans */}
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: COLORS.charcoal, fontWeight: 700, marginBottom: 32 }}>Annual Care Plans</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 48 }}>
            {[
              { name: "Essential", price: "$199/yr", desc: "2 visits, cleaning, photo report" },
              { name: "Premium", price: "$349/yr", desc: "4 visits + flowers + priority scheduling" },
              { name: "Family", price: "$499/yr", desc: "6 visits, decorations, multiple markers" },
            ].map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.08}>
                <div style={{ background: i === 1 ? COLORS.charcoal : COLORS.white, borderRadius: 18, padding: "28px 24px", textAlign: "center", boxShadow: "0 4px 24px rgba(44,44,42,0.1)" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: i === 1 ? COLORS.sageLight : COLORS.sage, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{p.name}</div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, color: i === 1 ? COLORS.white : COLORS.charcoal, marginBottom: 12 }}>{p.price}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: i === 1 ? "rgba(255,255,255,0.6)" : COLORS.warmGray, marginBottom: 24 }}>{p.desc}</div>
                  <button onClick={() => setPage("Contact")} style={{ width: "100%", padding: "12px", borderRadius: 50, background: i === 1 ? COLORS.sage : "transparent", border: `1.5px solid ${i === 1 ? COLORS.sage : COLORS.stone}40`, color: i === 1 ? "#fff" : COLORS.charcoal, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    Select Plan
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ background: COLORS.cream, borderRadius: 16, padding: "24px 28px", border: `1px solid ${COLORS.stoneLight}40`, borderLeft: `4px solid ${COLORS.sage}` }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.warmGray, lineHeight: 1.7, fontStyle: "italic" }}>
                <strong style={{ color: COLORS.charcoal }}>Pricing disclaimer:</strong> All prices are estimates. Final pricing depends on stone type and size, condition and level of biological growth, cemetery regulations, and travel distance from Albany. We provide free, detailed quotes before any work begins.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      <CTABanner setPage={setPage} />
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  const items = [
    { label: "Granite Headstone Restoration", tag: "Cleaning" },
    { label: "Family Monument — Before & After", tag: "Monument" },
    { label: "Bronze Marker Polish", tag: "Bronze" },
    { label: "Marble Memorial Cleaning", tag: "Cleaning" },
    { label: "Spring Flower Placement", tag: "Flowers" },
    { label: "Holiday Wreath Installation", tag: "Seasonal" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ padding: "80px 2rem 60px", background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #2F3A2F 100%)`, textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sageLight, marginBottom: 16 }}>Our Work</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: COLORS.white, fontWeight: 700, letterSpacing: "-0.02em" }}>Photo Gallery</h1>
      </div>

      <section style={{ padding: "80px 2rem", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Before/After sliders */}
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: COLORS.charcoal, marginBottom: 32 }}>Before & After Comparisons</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 72 }}>
            {["Granite Headstone", "Family Monument", "Bronze Flat Marker", "Marble Upright"].map((l, i) => (
              <FadeIn key={l} delay={i * 0.08}>
                <BeforeAfterSlider label={l} />
              </FadeIn>
            ))}
          </div>

          {/* Masonry gallery */}
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: COLORS.charcoal, marginBottom: 32 }}>Service Gallery</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, gridAutoRows: "240px" }}>
            {items.map((item, i) => {
              const colors = [
                `linear-gradient(135deg, ${COLORS.sage} 0%, ${COLORS.sageDark} 100%)`,
                `linear-gradient(135deg, ${COLORS.stone} 0%, ${COLORS.stoneDark} 100%)`,
                `linear-gradient(135deg, #8B7355 0%, #6B5535 100%)`,
                `linear-gradient(135deg, #7A8B7A 0%, #4A6A4A 100%)`,
                `linear-gradient(135deg, ${COLORS.goldAccent} 0%, #A48950 100%)`,
                `linear-gradient(135deg, #6A8A7A 0%, #4A6A5A 100%)`,
              ];
              const isLarge = i === 0 || i === 3;
              return (
                <FadeIn key={item.label} delay={i * 0.07} style={{ gridColumn: isLarge ? "span 1" : "span 1", gridRow: isLarge ? "span 2" : "span 1" }}>
                  <div
                    onClick={() => { setLightboxItem(item); setLightboxOpen(true); }}
                    style={{
                      borderRadius: 16, overflow: "hidden", cursor: "pointer",
                      background: colors[i], height: isLarge ? "auto" : "240px",
                      minHeight: isLarge ? "504px" : "240px",
                      display: "flex", alignItems: "flex-end",
                      position: "relative", boxShadow: "0 4px 24px rgba(44,44,42,0.15)",
                      transition: "transform 0.25s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.15 }}>
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="white"><path d="M6 21V8l6-6 6 6v13H6z"/></svg>
                    </div>
                    <div style={{ padding: "20px", background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", width: "100%" }}>
                      <span style={{ background: COLORS.sage, color: "#fff", fontSize: 10, padding: "3px 10px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.08em" }}>{item.tag}</span>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: COLORS.white, fontSize: 14, marginTop: 8 }}>{item.label}</div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && lightboxItem && (
        <div onClick={() => setLightboxOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
        }}>
          <div onClick={e => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 20, padding: "40px", maxWidth: 600, width: "100%", textAlign: "center" }}>
            <BeforeAfterSlider label={lightboxItem.label} />
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: COLORS.charcoal, marginTop: 24, marginBottom: 8 }}>{lightboxItem.label}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.warmGray, fontSize: 14, marginBottom: 24 }}>Drag the slider to compare before and after results.</p>
            <button onClick={() => setLightboxOpen(false)} style={{ background: COLORS.charcoal, color: "#fff", border: "none", cursor: "pointer", padding: "12px 32px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ padding: "80px 2rem 60px", background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #2F3A2F 100%)`, textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sageLight, marginBottom: 16 }}>Our Story</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: COLORS.white, fontWeight: 700, letterSpacing: "-0.02em" }}>About Us</h1>
      </div>

      <section style={{ padding: "80px 2rem", background: COLORS.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <FadeIn direction="right">
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 20 }}>Our Mission</p>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: COLORS.charcoal, fontWeight: 700, lineHeight: 1.3, marginBottom: 24, letterSpacing: "-0.02em" }}>
                  Honoring Lives Through Dignified Memorial Care
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, color: COLORS.warmGray, lineHeight: 1.8, marginBottom: 20 }}>
                  Capital Region Memorial Care was founded by the Brennan family after experiencing firsthand how difficult it is to maintain a loved one's memorial from a distance. What started as a personal mission became a calling.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, color: COLORS.warmGray, lineHeight: 1.8 }}>
                  For over two decades, we've served families across Albany and the Capital Region with a simple promise: every memorial deserves care, dignity, and respect — regardless of its age or condition.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div style={{ background: `linear-gradient(135deg, ${COLORS.sage} 0%, ${COLORS.sageDark} 100%)`, borderRadius: 24, padding: "48px 40px", textAlign: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>🌿</div>
                <blockquote style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontStyle: "italic", color: COLORS.white, lineHeight: 1.6 }}>
                  "Every stone tells a story. We help make sure that story is preserved with the care it deserves."
                </blockquote>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 20 }}>— The Brennan Family, Founders</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 2rem", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, color: COLORS.charcoal, fontWeight: 700, marginBottom: 48, textAlign: "center" }}>Our Approach to Preservation</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { title: "Safe Chemistry Only", body: "We use pH-neutral, stone-safe biological cleaners developed specifically for memorial preservation. No bleach. No acids. No harsh chemicals.", icon: "🧪" },
              { title: "No Pressure Washing", body: "High-pressure water can erode stone, remove engravings, and cause invisible structural damage. We rely on soft brushes and gentle solutions.", icon: "💧" },
              { title: "Material-Specific Care", body: "Granite, marble, limestone, sandstone, and bronze each require different approaches. We tailor our method to the specific material.", icon: "🪨" },
              { title: "Documentation & Transparency", body: "We photograph every memorial before, during, and after work. You receive a full photo report and can trust exactly what was done.", icon: "📷" },
              { title: "Cemetery Compliance", body: "We work within the regulations of each cemetery and obtain any necessary permissions before beginning service.", icon: "📋" },
              { title: "Long-Term Stewardship", body: "Our goal isn't just a one-time clean — it's the long-term preservation of a memorial for generations to come.", icon: "🌱" },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.07}>
                <div style={{ background: COLORS.white, borderRadius: 18, padding: "28px 24px", boxShadow: "0 2px 16px rgba(44,44,42,0.06)" }}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{card.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: COLORS.charcoal, marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.warmGray, lineHeight: 1.7 }}>{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.sageMuted} 0%, ${COLORS.cream} 100%)`, borderRadius: 20, padding: "36px", marginTop: 48, textAlign: "center", border: `1px solid ${COLORS.sage}30` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: COLORS.sage, marginBottom: 12, fontWeight: 700 }}>Our Promise</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, color: COLORS.charcoalLight, lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
                We never use bleach, pressure washers, or damaging chemicals — ever. Every product we use is tested and approved for historical and modern memorial preservation. Your loved one's memorial is in safe hands.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      <CTABanner setPage={() => {}} />
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", cemetery: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Please describe what you need";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "14px 18px", borderRadius: 12,
    border: `1.5px solid ${errors[field] ? "#E24B4A" : COLORS.stoneLight}`,
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.charcoal,
    background: COLORS.white, outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  });

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ padding: "80px 2rem 60px", background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #2F3A2F 100%)`, textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.sageLight, marginBottom: 16 }}>Reach Out</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: COLORS.white, fontWeight: 700, letterSpacing: "-0.02em" }}>Contact Us</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)", fontSize: 16, marginTop: 16 }}>We respond to all inquiries within one business day.</p>
      </div>

      <section style={{ padding: "80px 2rem", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 56, alignItems: "start" }}>
          {/* Left column */}
          <FadeIn direction="right">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: COLORS.charcoal, marginBottom: 32, fontWeight: 700 }}>Get in Touch</h2>
              {[
                { icon: icons.phone, label: "Phone", value: "(518) 951-9503", href: "tel:+15189519503" },
                { icon: icons.mail, label: "Email", value: "capitalmemorialcare@gmail.com", href: "mailto:capitalmemorialcare@gmail.com" },
                { icon: icons.mapPin, label: "Service Area", value: "Albany & Capital Region, NY", href: null },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 16, marginBottom: 28, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.sageMuted, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.sage, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.warmGray, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.charcoal, fontWeight: 600, textDecoration: "none" }}>{c.value}</a>
                    ) : (
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.charcoal, fontWeight: 600 }}>{c.value}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Map embed placeholder */}
              <div style={{ borderRadius: 16, overflow: "hidden", marginTop: 32, height: 200, background: `linear-gradient(135deg, ${COLORS.sage} 0%, ${COLORS.sageDark} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
                  <svg viewBox="0 0 400 200" width="100%" height="100%">
                    <path d="M0,80 Q100,40 200,70 T400,50 L400,200 L0,200Z" fill="white"/>
                    <circle cx="200" cy="90" r="15" fill="white" opacity="0.5"/>
                  </svg>
                </div>
                <div style={{ textAlign: "center", color: COLORS.white }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>Albany, New York</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, opacity: 0.8, marginTop: 4 }}>Serving the Capital Region</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="left">
            {submitted ? (
              <div style={{ background: COLORS.white, borderRadius: 24, padding: "64px 40px", textAlign: "center", boxShadow: "0 4px 32px rgba(44,44,42,0.08)" }}>
                <div style={{ fontSize: 56, marginBottom: 24 }}>🌿</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: COLORS.charcoal, marginBottom: 16 }}>Thank You</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.warmGray, lineHeight: 1.7 }}>
                  We've received your message and will respond within one business day. We look forward to helping you care for your loved one's memorial.
                </p>
              </div>
            ) : (
              <div style={{ background: COLORS.white, borderRadius: 24, padding: "40px", boxShadow: "0 4px 32px rgba(44,44,42,0.08)" }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: COLORS.charcoal, marginBottom: 28, fontWeight: 700 }}>Request a Free Quote</h3>
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.charcoalLight, display: "block", marginBottom: 8 }}>Full Name *</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={inputStyle("name")} />
                      {errors.name && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#E24B4A", marginTop: 4 }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.charcoalLight, display: "block", marginBottom: 8 }}>Email *</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" style={inputStyle("email")} />
                      {errors.email && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#E24B4A", marginTop: 4 }}>{errors.email}</p>}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.charcoalLight, display: "block", marginBottom: 8 }}>Phone</label>
                      <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(518) 000-0000" style={inputStyle("phone")} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.charcoalLight, display: "block", marginBottom: 8 }}>Cemetery Name</label>
                      <input value={form.cemetery} onChange={e => setForm(f => ({ ...f, cemetery: e.target.value }))} placeholder="Cemetery name or city" style={inputStyle("cemetery")} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.charcoalLight, display: "block", marginBottom: 8 }}>Message *</label>
                    <textarea
                      rows={5} value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Please describe the memorial type, its condition, and what services you're interested in..."
                      style={{ ...inputStyle("message"), resize: "vertical", minHeight: 120 }}
                    />
                    {errors.message && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#E24B4A", marginTop: 4 }}>{errors.message}</p>}
                  </div>
                  <button type="submit" style={{
                    width: "100%", padding: "16px", borderRadius: 50,
                    background: COLORS.sage, color: COLORS.white, border: "none",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(90,122,90,0.3)", transition: "all 0.2s",
                  }}>
                    Send Message — Free Quote
                  </button>
                </form>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: COLORS.charcoal, padding: "60px 2rem 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.sage, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: COLORS.white }}>{icons.leaf}</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, color: COLORS.white }}>Capital Region Memorial Care</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.sageLight, letterSpacing: "0.1em" }}>Albany, New York</div>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 280 }}>
              Professional memorial care and gravestone restoration services across the Capital Region since 2001.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              {[icons.shield, icons.leaf, icons.heart].map((icon, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.sageLight }}>{icon}</div>
              ))}
            </div>
          </div>
          {[
            { title: "Services", links: ["Gravestone Cleaning", "Bronze Markers", "Flower Placement", "Care Plans"] },
            { title: "Company", links: ["Pricing", "Contact", "Free Quote"] },
            { title: "Service Areas", links: ["Albany", "Troy", "Schenectady", "Saratoga Springs", "Colonie & Latham"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.sageLight, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <button onClick={() => setPage(col.title === "Company" ? l : col.title === "Service Areas" ? "Contact" : "Services")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", padding: 0, textAlign: "left", transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = COLORS.white}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                    >{l}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            © 2025 Capital Region Memorial Care. All rights reserved.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            Serving Albany, NY & surrounding communities with dignity.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating Buttons ─────────────────────────────────────────────────────────
function FloatingButtons({ setPage }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Request Quote Button */}
      <button onClick={() => setPage("Contact")} style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 999,
        background: COLORS.sage, color: COLORS.white,
        border: "none", cursor: "pointer", padding: "14px 28px",
        borderRadius: 50, fontFamily: "'DM Sans', sans-serif",
        fontSize: 14, fontWeight: 700, boxShadow: "0 8px 32px rgba(90,122,90,0.4)",
        display: "flex", alignItems: "center", gap: 8,
        transition: "all 0.2s",
      }}>
        {icons.sparkle} Request Quote
      </button>
      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
          position: "fixed", bottom: 100, right: 32, zIndex: 999,
          width: 44, height: 44, borderRadius: "50%",
          background: COLORS.white, color: COLORS.charcoal,
          border: `1.5px solid ${COLORS.stoneLight}`, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(44,44,42,0.12)", transition: "all 0.2s",
        }}>
          {icons.arrowUp}
        </button>
      )}
    </>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");

  const setPageAndScroll = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "Services": return <ServicesPage setPage={setPageAndScroll} />;
      case "Pricing": return <PricingPage setPage={setPageAndScroll} />;
      case "Contact": return <ContactPage />;
      default: return <HomePage setPage={setPageAndScroll} />;
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: COLORS.offWhite, minHeight: "100vh" }}>
      <Nav currentPage={page} setPage={setPageAndScroll} />
      <main>{renderPage()}</main>
      <Footer setPage={setPageAndScroll} />
      <FloatingButtons setPage={setPageAndScroll} />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${COLORS.offWhite}; }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
