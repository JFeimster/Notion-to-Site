type NotionProperty = {
  id: string;
  name?: string;
  type: string;
};

type NotionDatabaseResponse = {
  title?: Array<{ plain_text?: string }>;
  properties?: Record<string, NotionProperty>;
};

type NotionQueryResponse = {
  results?: Array<{
    id: string;
    url?: string;
    properties?: Record<string, any>;
  }>;
};

const NOTION_VERSION = '2022-06-28';

function getDatabaseTitle(data: NotionDatabaseResponse) {
  return data.title?.map((item) => item.plain_text || '').join('') || 'Untitled database';
}

function getPlainPropertyValue(prop: any): string {
  if (!prop || !prop.type) return '—';

  switch (prop.type) {
    case 'title':
      return prop.title?.map((x: any) => x.plain_text || '').join('') || '—';
    case 'rich_text':
      return prop.rich_text?.map((x: any) => x.plain_text || '').join('') || '—';
    case 'number':
      return prop.number?.toString() ?? '—';
    case 'select':
      return prop.select?.name || '—';
    case 'multi_select':
      return prop.multi_select?.map((x: any) => x.name).join(', ') || '—';
    case 'status':
      return prop.status?.name || '—';
    case 'date':
      return prop.date?.start || '—';
    case 'checkbox':
      return prop.checkbox ? 'Yes' : 'No';
    case 'url':
      return prop.url || '—';
    case 'email':
      return prop.email || '—';
    case 'phone_number':
      return prop.phone_number || '—';
    case 'people':
      return prop.people?.map((x: any) => x.name || x.id).join(', ') || '—';
    case 'relation':
      return prop.relation?.length ? `${prop.relation.length} linked` : '—';
    case 'formula':
      return String(prop.formula?.string ?? prop.formula?.number ?? prop.formula?.boolean ?? '—');
    default:
      return prop.type;
  }
}

async function notionFetch(path: string, method: 'GET' | 'POST' = 'GET', body?: object) {
  const token = process.env.NOTION_TOKEN;

  if (!token) {
    throw new Error('Missing NOTION_TOKEN');
  }

  const response = await fetch(`https://api.notion.com/v1${path}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Notion API ${response.status}: ${text}`);
  }

  return response.json();
}

export const dynamic = 'force-dynamic';

export default async function LiveNotionPage() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!process.env.NOTION_TOKEN || !databaseId) {
    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Notion connection not configured yet</h1>
        <p style={{ marginBottom: 20, color: '#475569' }}>
          The app is wired for Notion, but Vercel still needs the environment variables.
        </p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Add these in Vercel → Project Settings → Environment Variables</div>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>NOTION_TOKEN=secret_xxx{`\n`}NOTION_DATABASE_ID=your_database_id_here</pre>
        </div>
        <ol style={{ lineHeight: 1.7, paddingLeft: 20 }}>
          <li>Create a Notion internal integration.</li>
          <li>Copy the integration secret into <code>NOTION_TOKEN</code>.</li>
          <li>Open your target Notion database and copy its database ID into <code>NOTION_DATABASE_ID</code>.</li>
          <li>Share that database with the integration inside Notion.</li>
          <li>Redeploy the project.</li>
        </ol>
        <p style={{ marginTop: 24 }}>
          After that, open <code>/live</code> again and it will pull real rows.
        </p>
      </main>
    );
  }

  try {
    const database = (await notionFetch(`/databases/${databaseId}`)) as NotionDatabaseResponse;
    const rows = (await notionFetch(`/databases/${databaseId}/query`, 'POST', { page_size: 10 })) as NotionQueryResponse;

    const properties = Object.entries(database.properties || {});
    const title = getDatabaseTitle(database);

    return (
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
              Live Notion Connection
            </div>
            <h1 style={{ fontSize: 32, margin: 0 }}>{title}</h1>
          </div>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Back to prototype</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr', gap: 24, alignItems: 'start' }}>
          <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20 }}>
            <h2 style={{ fontSize: 18, marginTop: 0, marginBottom: 14 }}>Database schema</h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {properties.length ? properties.map(([name, prop]) => (
                <div key={prop.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                  <span style={{ fontWeight: 600 }}>{name}</span>
                  <span style={{ color: '#475569' }}>{prop.type}</span>
                </div>
              )) : <div>No properties found.</div>}
            </div>
          </section>

          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20 }}>
            <h2 style={{ fontSize: 18, marginTop: 0, marginBottom: 14 }}>Latest rows</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {rows.results?.length ? rows.results.map((row) => (
                <div key={row.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, background: '#f8fafc' }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>{row.id}</div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {Object.entries(row.properties || {}).slice(0, 8).map(([name, prop]) => (
                      <div key={name} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12 }}>
                        <span style={{ fontWeight: 600 }}>{name}</span>
                        <span style={{ color: '#334155', wordBreak: 'break-word' }}>{getPlainPropertyValue(prop)}</span>
                      </div>
                    ))}
                  </div>
                  {row.url ? (
                    <div style={{ marginTop: 12 }}>
                      <a href={row.url} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
                        Open in Notion
                      </a>
                    </div>
                  ) : null}
                </div>
              )) : <div>No rows returned.</div>}
            </div>
          </section>
        </div>
      </main>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Notion connection failed</h1>
        <p style={{ color: '#475569', marginBottom: 20 }}>
          The route is live, but Notion rejected the request. That usually means the token, database ID,
          or database-sharing step is wrong.
        </p>
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239', borderRadius: 8, padding: 16, whiteSpace: 'pre-wrap' }}>
          {message}
        </div>
      </main>
    );
  }
}
