import type { SheetRow } from '../../lib/sheets';

export default function SourceRecordPanel({
  row,
  pageTitle,
  category,
  status,
  ctaLabel,
  ctaUrl,
  accentBorder,
}: {
  row: SheetRow;
  pageTitle: string;
  category: string;
  status: string;
  ctaLabel: string;
  ctaUrl: string;
  accentBorder: string;
}) {
  return (
    <aside style={{ background: '#ffffff', border: `1px solid ${accentBorder}`, borderRadius: 20, padding: 28 }}>
      <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 10 }}>
        CMS Fields
      </div>
      <h2 style={{ fontSize: 24, marginTop: 0 }}>Source record</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 10, color: '#334155', lineHeight: 1.6 }}>
        <strong>Name</strong><span>{row['Name'] || '—'}</span>
        <strong>Page Title</strong><span>{pageTitle}</span>
        <strong>Category</strong><span>{category}</span>
        <strong>Status</strong><span>{status}</span>
        <strong>CTA Label</strong><span>{ctaLabel}</span>
        <strong>CTA URL</strong><span style={{ wordBreak: 'break-word' }}>{ctaUrl}</span>
      </div>
    </aside>
  );
}
