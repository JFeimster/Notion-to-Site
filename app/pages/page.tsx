import Link from 'next/link';
import { getPublishedRows, getRowSlug } from '../../lib/sheets';

export const dynamic = 'force-dynamic';

export default async function PublishedPagesIndex() {
  try {
    const rows = await getPublishedRows();

    return (
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
              Published Pages
            </div>
            <h1 style={{ fontSize: 36, margin: 0 }}>Generated landing pages</h1>
          </div>
          <Link href="/dashboard" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 700 }}>
            Back to dashboard
          </Link>
        </div>

        <p style={{ color: '#475569', lineHeight: 1.6, maxWidth: 760 }}>
          This route lists every published or ready row from the Google Sheets CMS and turns it into an actual site page. This is where the project stops being a spreadsheet viewer and starts acting like a publishing engine.
        </p>

        <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
          {rows.length ? rows.map((row, index) => {
            const slug = getRowSlug(row);
            return (
              <article
                key={`${slug}-${index}`}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 6 }}>
                      {row['Category'] || 'General'}
                    </div>
                    <h2 style={{ fontSize: 28, margin: 0 }}>{row['Hero Headline'] || row['Name'] || 'Untitled page'}</h2>
                  </div>
                  <span style={{ color: '#166534', background: '#dcfce7', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                    {row['Status'] || 'Ready'}
                  </span>
                </div>

                <div style={{ color: '#475569', marginBottom: 12 }}>
                  slug: <code>{slug}</code>
                </div>

                <p style={{ lineHeight: 1.6, color: '#334155' }}>
                  {row['Hero Subheadline'] || row['Meta Description'] || 'No summary yet.'}
                </p>

                <div style={{ marginTop: 16 }}>
                  <Link
                    href={`/pages/${slug}`}
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
                    Open page
                  </Link>
                </div>
              </article>
            );
          }) : (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 22 }}>
              No published rows found yet. Set Status to Ready or Published, or mark Published=true in the sheet.
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Published pages route is not ready yet</h1>
        <p style={{ color: '#475569', marginBottom: 20 }}>
          The page generator exists, but the sheet connection is failing or missing.
        </p>
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239', borderRadius: 8, padding: 16, whiteSpace: 'pre-wrap' }}>
          {message}
        </div>
      </main>
    );
  }
}
