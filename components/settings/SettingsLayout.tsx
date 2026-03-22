import type { ReactNode } from 'react';

export default function SettingsLayout({
  title,
  subtitle,
  sidebar,
  children,
}: {
  title: string;
  subtitle: string;
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: 24,
        alignItems: 'start',
      }}
    >
      <aside
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          padding: 20,
          position: 'sticky',
          top: 24,
        }}
      >
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
          Control Center
        </div>
        <h2 style={{ fontSize: 24, margin: '0 0 10px 0' }}>{title}</h2>
        <p style={{ color: '#475569', lineHeight: 1.6, marginTop: 0 }}>{subtitle}</p>
        <div style={{ marginTop: 18 }}>{sidebar}</div>
      </aside>

      <div style={{ display: 'grid', gap: 24 }}>{children}</div>
    </section>
  );
}
