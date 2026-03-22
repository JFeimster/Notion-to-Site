import Link from 'next/link';
import { getPublishedRows, getRowSlug } from '../../lib/sheets';
import { getPageTemplate } from '../../components/templates/pageTemplates';

export const dynamic = 'force-dynamic';

export default async function GeneratedSitesIndex() {
  try {
    const rows = await getPublishedRows();

    return (
      <main style={{ maxWidth: 1180, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
              Template-Aware Pages
            </div>
            <h1 style={{ fontSize: 38, margin: 0 }}>Generated microsites</h1>
          </div>
          <Link href="/dashboard" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 700 }}>
            Back to dashboard
          </Link>
        </div>

        <p style={{ color: '#475569', lineHeight: 1.6, maxWidth: 820 }}>
          This route is the upgraded page index. It groups published sheet rows into real landing pages and shows which template family each page is using so the site factory can evolve beyond one generic page shell.
        </p>

        <div style={{ display: 'grid', gap: 18, marginTop: 28 }}>
          {rows.length ? rows.map((row, index) => {
            const slug = getRowSlug(row);
            const template = getPageTemplate(row);
            const headline = row['Hero Headline'] || row['Name'] || 'Untitled page';
            const subheadline = row['Hero Subheadline'] || row['Meta Description'] || 'No summary yet.';

            return (
              <article
                key={`${slug}-${index}`}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 16,
                  padding: 22,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 6 }}>
                      {row['Category'] || 'General'}
                    </div>
                    <h2 style={{ fontSize: 28, margin: 0 }}>{headline}</h2>
                  </div>
                  <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
                    <span style={{ background: '#e2e8f0', color: '#334155', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                      template: {template}
                    </span>
                    <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                      {row['Status'] || 'Ready'}
                    </span>
                  </div>
                </div>

                <div style={{ color: '#64748b', marginBottom: 12 }}>
                  slug: <code>{slug}</code>
                </div>

                <p style={{ lineHeight: 1.7, color: '#334155', marginTop: 0 }}>{subheadline}</p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 14 }}>
                  <Link
                    href={`/sites/${slug}`}
                    style={{
                      display: 'inline-block',
                      background: '#2563eb',
                      color: '#ffffff',
                      padding: '10px 14px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Open generated page
                  </Link>
                  <Link
                    href={`/pages/${slug}`}
                    style={{
                      display: 'inline-block',
                      background: '#ffffff',
                      color: '#0f172a',
                      padding: '10px 14px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      fontWeight: 700,
                      border: '1px solid #cbd5e1',
                    }}
                  >
                    Open legacy page
                  </Link>
                </div>
              </article>
            );
          }) : (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 22 }}>
              No published rows found yet.
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Generated sites route is not ready yet</h1>
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239', borderRadius: 8, padding: 16, whiteSpace: 'pre-wrap' }}>
          {message}
        </div>
      </main>
    );
  }
}
