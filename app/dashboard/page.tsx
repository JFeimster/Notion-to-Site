import SettingsLayout from '../../components/settings/SettingsLayout';
import DataSourceConnectionCard from '../../components/settings/DataSourceConnectionCard';
import ProjectGrid, { type ProjectCard } from '../../components/projects/ProjectGrid';

export const dynamic = 'force-dynamic';

const CSV_URL = process.env.GOOGLE_SHEETS_CSV_URL;

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
  if (!CSV_URL) return [];
  const response = await fetch(CSV_URL, { cache: 'no-store' });
  if (!response.ok) return [];
  const csv = await response.text();
  return parseCsv(csv);
}

function normalizeBoolean(value: string | undefined) {
  const normalized = (value || '').toLowerCase();
  return normalized === 'true' || normalized === 'yes';
}

function toProjectCards(rows: Row[]): ProjectCard[] {
  const groups = new Map<string, ProjectCard>();

  rows.forEach((row) => {
    const name = row['Name'] || row['Hero Headline'] || 'Untitled Project';
    const slug = row['Slug'] || name.toLowerCase().replace(/\s+/g, '-');
    const category = row['Category'] || 'General';
    const published = normalizeBoolean(row['Published']);
    const status = (row['Status'] || '').toLowerCase();

    const derivedStatus: ProjectCard['status'] = published || status === 'published' || status === 'ready'
      ? 'healthy'
      : status === 'draft'
        ? 'draft'
        : 'warning';

    groups.set(slug, {
      name,
      slug,
      pages: 1,
      published: published || status === 'published' || status === 'ready' ? 1 : 0,
      drafts: published || status === 'published' || status === 'ready' ? 0 : 1,
      category,
      status: derivedStatus,
    });
  });

  return Array.from(groups.values()).sort((a, b) => a.slug.localeCompare(b.slug));
}

export default async function DashboardPage() {
  const rows = await getRows();
  const projects = toProjectCards(rows);
  const publishedPageCount = projects.reduce((sum, project) => sum + project.published, 0);
  const draftPageCount = projects.reduce((sum, project) => sum + project.drafts, 0);
  const connected = Boolean(CSV_URL);

  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: 32, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 8 }}>
          Dashboard
        </div>
        <h1 style={{ fontSize: 36, margin: '0 0 10px 0' }}>Publishing Control Center</h1>
        <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 760 }}>
          This is the working admin shell for your Sheets-driven microsite factory. It shows whether the data source is connected, how many projects exist, and what is ready to publish versus still living in draft purgatory.
        </p>
      </div>

      <SettingsLayout
        title="Workspace Settings"
        subtitle="Manage the live data source, inspect the publishing environment, and keep the pipeline from quietly rotting behind a pretty homepage."
        sidebar={
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ padding: 14, border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Projects</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{projects.length}</div>
            </div>
            <div style={{ padding: 14, border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Published Pages</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{publishedPageCount}</div>
            </div>
            <div style={{ padding: 14, border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Draft Pages</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{draftPageCount}</div>
            </div>
          </div>
        }
      >
        <DataSourceConnectionCard
          dataSourceName="Google Sheets CMS"
          connected={connected}
          healthLabel={connected ? 'Healthy' : 'Needs Setup'}
          syncLabel={connected ? 'Live CSV route available' : 'Missing CSV URL environment variable'}
          summary={
            connected
              ? `Google Sheets is connected and the dashboard can currently see ${rows.length} source rows. This is enough to drive publishing views and prove the pipeline is alive.`
              : 'The dashboard shell is live, but the data source is not configured yet. Add the Google Sheets CSV URL in Vercel so this stops being a handsome corpse.'
          }
          envVarName="GOOGLE_SHEETS_CSV_URL"
          envVarValue={CSV_URL}
        />

        <ProjectGrid projects={projects} />

        <section
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 14,
            padding: 22,
          }}
        >
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 6 }}>
            Recommended Next Steps
          </div>
          <h3 style={{ fontSize: 24, marginTop: 0 }}>What to build next</h3>
          <div style={{ display: 'grid', gap: 12, color: '#334155', lineHeight: 1.6 }}>
            <div>1. Add slug-based dynamic page generation so each row becomes a real page, not just a dashboard card.</div>
            <div>2. Add template controls so the same source row can render in multiple landing page styles.</div>
            <div>3. Add sync logs and retry diagnostics once page generation exists and can actually fail in useful ways.</div>
          </div>
        </section>
      </SettingsLayout>
    </main>
  );
}
