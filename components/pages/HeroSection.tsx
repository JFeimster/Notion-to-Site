export default function HeroSection({
  eyebrow,
  headline,
  subheadline,
  status,
  slug,
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryHref,
  secondaryLabel,
  accent,
}: {
  eyebrow: string;
  headline: string;
  subheadline: string;
  status: string;
  slug: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryHref: string;
  secondaryLabel: string;
  accent: {
    badgeBg: string;
    badgeColor: string;
    primaryBg: string;
    panelBg: string;
    panelBorder: string;
  };
}) {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 32px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <a href="/pages" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 700 }}>
          ← Back to pages
        </a>
        <span
          style={{
            background: accent.badgeBg,
            color: accent.badgeColor,
            padding: '8px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {eyebrow}
        </span>
      </div>

      <div style={{ background: '#ffffff', border: `1px solid ${accent.panelBorder}`, borderRadius: 20, padding: 32 }}>
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 10 }}>
          Generated from Google Sheets CMS
        </div>
        <h1 style={{ fontSize: 48, lineHeight: 1.05, margin: '0 0 16px 0', maxWidth: 900 }}>{headline}</h1>
        <p style={{ fontSize: 20, lineHeight: 1.6, color: '#334155', maxWidth: 860, marginTop: 0 }}>{subheadline}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24, marginBottom: 28 }}>
          <span style={{ background: '#dcfce7', color: '#166534', padding: '8px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700 }}>
            Status: {status}
          </span>
          <span style={{ background: '#e2e8f0', color: '#334155', padding: '8px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700 }}>
            Slug: {slug}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <a
            href={primaryCtaUrl}
            style={{
              display: 'inline-block',
              background: accent.primaryBg,
              color: '#ffffff',
              padding: '12px 18px',
              borderRadius: 10,
              textDecoration: 'none',
              fontWeight: 800,
            }}
          >
            {primaryCtaLabel}
          </a>
          <a
            href={secondaryHref}
            style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#0f172a',
              padding: '12px 18px',
              borderRadius: 10,
              textDecoration: 'none',
              fontWeight: 800,
              border: '1px solid #cbd5e1',
            }}
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
