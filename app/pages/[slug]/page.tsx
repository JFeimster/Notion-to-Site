import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedRowBySlug, getPublishedRows, getRowSlug } from '../../../lib/sheets';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const rows = await getPublishedRows();
    return rows.map((row) => ({ slug: getRowSlug(row) }));
  } catch {
    return [];
  }
}

export default async function GeneratedPage({ params }: { params: { slug: string } }) {
  const row = await getPublishedRowBySlug(params.slug);

  if (!row) {
    notFound();
  }

  const pageTitle = row['Page Title'] || row['Name'] || row['Hero Headline'] || 'Untitled page';
  const headline = row['Hero Headline'] || row['Name'] || 'Untitled page';
  const subheadline = row['Hero Subheadline'] || row['Meta Description'] || 'No subheadline provided yet.';
  const category = row['Category'] || 'General';
  const status = row['Status'] || 'Ready';
  const ctaLabel = row['Primary CTA Label'] || 'Learn More';
  const ctaUrl = row['Primary CTA URL'] || '/pages';
  const metaDescription = row['Meta Description'] || 'No meta description provided yet.';

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 32px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <Link href="/pages" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 700 }}>
            ← Back to pages
          </Link>
          <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
            {category}
          </span>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32 }}>
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
              Slug: {params.slug}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a
              href={ctaUrl}
              style={{
                display: 'inline-block',
                background: '#2563eb',
                color: '#ffffff',
                padding: '12px 18px',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 800,
              }}
            >
              {ctaLabel}
            </a>
            <Link
              href="/dashboard"
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
              Open dashboard
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: 24 }}>
          <article style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 28 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 10 }}>
              Page Summary
            </div>
            <h2 style={{ fontSize: 28, marginTop: 0 }}>What this page is saying</h2>
            <p style={{ color: '#334155', lineHeight: 1.7 }}>
              {metaDescription}
            </p>
            <p style={{ color: '#334155', lineHeight: 1.7 }}>
              This page is generated directly from the Google Sheets CMS row for <strong>{pageTitle}</strong>. The current implementation turns your spreadsheet content into a real route, which is the first serious step toward a live microsite factory instead of a static mockup farm.
            </p>
          </article>

          <aside style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 28 }}>
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
        </div>
      </section>
    </main>
  );
}
