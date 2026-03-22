import Link from 'next/link';
import { getPublishedRows, getRowSlug } from '../../lib/sheets';
import { getPageTemplate } from '../../components/templates/pageTemplates';

function splitPipeList(value: string | undefined) {
  return (value || '')
    .split('||')
    .map((item) => item.trim())
    .filter(Boolean);
}

export const dynamic = 'force-dynamic';

export default async function LaunchpadIndexPage() {
  try {
    const rows = await getPublishedRows();

    return (
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
              Launchpad
            </div>
            <h1 style={{ fontSize: 40, margin: 0 }}>Expanded generated pages</h1>
          </div>
          <Link href="/dashboard" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 700 }}>
            Back to dashboard
          </Link>
        </div>

        <p style={{ color: '#475569', lineHeight: 1.6, maxWidth: 860 }}>
          This route uses the expanded Google Sheets schema so pages can show proof, offer bullets, FAQs, and secondary CTAs. In other words, we are finally graduating from spreadsheet-powered stubs into something that looks like an actual landing page system.
        </p>

        <div style={{ display: 'grid', gap: 18, marginTop: 28 }}>
          {rows.length ? rows.map((row, index) => {
            const slug = getRowSlug(row);
            const template = getPageTemplate(row);
            const proofItems = splitPipeList(row['Proof Points']);
            const bulletItems = splitPipeList(row['Offer Bullets']);

            return (
              <article key={`${slug}-${index}`} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 6 }}>
                      {row['Category'] || 'General'}
                    </div>
                    <h2 style={{ fontSize: 30, margin: 0 }}>{row['Hero Headline'] || row['Name'] || 'Untitled page'}</h2>
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

                <p style={{ lineHeight: 1.7, color: '#334155', marginTop: 0 }}>{row['Hero Subheadline'] || row['Meta Description'] || 'No summary yet.'}</p>

                {bulletItems.length ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
                    {bulletItems.slice(0, 3).map((item, bulletIndex) => (
                      <span key={`${item}-${bulletIndex}`} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '8px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}

                {proofItems.length ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginTop: 16 }}>
                    {proofItems.slice(0, 3).map((item, proofIndex) => (
                      <div key={`${item}-${proofIndex}`} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, fontWeight: 700, color: '#0f172a' }}>
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
                  <Link href={`/launchpad/${slug}`} style={{ display: 'inline-block', background: '#2563eb', color: '#ffffff', padding: '10px 14px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
                    Open expanded page
                  </Link>
                  <Link href={`/sites/${slug}`} style={{ display: 'inline-block', background: '#ffffff', color: '#0f172a', padding: '10px 14px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, border: '1px solid #cbd5e1' }}>
                    Open template page
                  </Link>
                </div>
              </article>
            );
          }) : (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 24 }}>
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
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Launchpad route is not ready yet</h1>
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239', borderRadius: 8, padding: 16, whiteSpace: 'pre-wrap' }}>
          {message}
        </div>
      </main>
    );
  }
}
