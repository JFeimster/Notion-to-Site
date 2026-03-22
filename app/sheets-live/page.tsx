export const dynamic = 'force-dynamic';

type Row = Record<string, string>;

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current);
  return result.map((value) => value.trim());
}

function parseCsv(csv: string): Row[] {
  const lines = csv
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (!lines.length) return [];

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Row = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });

    return row;
  });
}

async function getRows(): Promise<Row[]> {
  const csvUrl = process.env.GOOGLE_SHEETS_CSV_URL;

  if (!csvUrl) {
    throw new Error('Missing GOOGLE_SHEETS_CSV_URL');
  }

  const response = await fetch(csvUrl, { cache: 'no-store' });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Sheets fetch failed (${response.status}): ${text.slice(0, 400)}`);
  }

  const csv = await response.text();
  return parseCsv(csv);
}

function getPublishedRows(rows: Row[]) {
  return rows.filter((row) => {
    const published = (row['Published'] || '').toLowerCase();
    const status = (row['Status'] || '').toLowerCase();
    return published === 'true' || published === 'yes' || status === 'ready' || status === 'published';
  });
}

export default async function SheetsLivePage() {
  try {
    const rows = await getRows();
    const publishedRows = getPublishedRows(rows);

    return (
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
              Live Google Sheets Connection
            </div>
            <h1 style={{ fontSize: 32, margin: 0 }}>Sheets CMS Viewer</h1>
          </div>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Back to prototype</a>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>What this route is doing</div>
          <div style={{ color: '#475569' }}>
            Pulling CSV from a Google Sheet, parsing it server-side, and showing rows that are marked Published or Ready.
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {publishedRows.length ? publishedRows.map((row, index) => (
            <article key={`${row['Slug'] || row['Name'] || 'row'}-${index}`} style={{ border: '1px solid #e2e8f0', borderRadius: 10, background: '#fff', padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                <h2 style={{ margin: 0, fontSize: 22 }}>{row['Hero Headline'] || row['Name'] || 'Untitled row'}</h2>
                <span style={{ fontSize: 12, color: '#475569' }}>{row['Status'] || '—'}</span>
              </div>
              <div style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>
                slug: <code>{row['Slug'] || '—'}</code>
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.6, marginTop: 0 }}>{row['Hero Subheadline'] || row['Meta Description'] || 'No summary yet.'}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 10, marginTop: 14 }}>
                <strong>Page Title</strong><span>{row['Page Title'] || '—'}</span>
                <strong>Category</strong><span>{row['Category'] || '—'}</span>
                <strong>CTA Label</strong><span>{row['Primary CTA Label'] || '—'}</span>
                <strong>CTA URL</strong><span style={{ wordBreak: 'break-all' }}>{row['Primary CTA URL'] || '—'}</span>
              </div>
              {row['Primary CTA URL'] ? (
                <div style={{ marginTop: 18 }}>
                  <a href={row['Primary CTA URL']} style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '10px 14px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
                    {row['Primary CTA Label'] || 'Open'}
                  </a>
                </div>
              ) : null}
            </article>
          )) : (
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, background: '#fff', padding: 20 }}>
              No published rows yet. Mark a row as Published=true or set Status to Ready.
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Google Sheets connection not configured yet</h1>
        <p style={{ color: '#475569', marginBottom: 20 }}>
          This route is ready, but it needs a CSV export URL from your sheet.
        </p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Add this env var in Vercel</div>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>GOOGLE_SHEETS_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID</pre>
        </div>
        <ol style={{ lineHeight: 1.7, paddingLeft: 20 }}>
          <li>Open the Google Sheet.</li>
          <li>Set sharing so the CSV URL can be read by the app.</li>
          <li>Use the sheet export URL format shown above.</li>
          <li>Add the URL to Vercel as <code>GOOGLE_SHEETS_CSV_URL</code>.</li>
          <li>Redeploy and revisit <code>/sheets-live</code>.</li>
        </ol>
        <div style={{ marginTop: 24, background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239', borderRadius: 8, padding: 16, whiteSpace: 'pre-wrap' }}>
          {message}
        </div>
      </main>
    );
  }
}
