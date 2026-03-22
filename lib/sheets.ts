export type SheetRow = Record<string, string>;

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

function parseCsv(csv: string): SheetRow[] {
  const lines = csv
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (!lines.length) return [];

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: SheetRow = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });

    return row;
  });
}

export function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function isPublishedRow(row: SheetRow) {
  const published = (row['Published'] || '').toLowerCase();
  const status = (row['Status'] || '').toLowerCase();
  return published === 'true' || published === 'yes' || status === 'ready' || status === 'published';
}

export function getRowSlug(row: SheetRow) {
  return normalizeSlug(row['Slug'] || row['Name'] || row['Hero Headline'] || 'untitled-page');
}

export async function getSheetRows(): Promise<SheetRow[]> {
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

export async function getPublishedRows(): Promise<SheetRow[]> {
  const rows = await getSheetRows();
  return rows.filter(isPublishedRow);
}

export async function getPublishedRowBySlug(slug: string): Promise<SheetRow | undefined> {
  const rows = await getPublishedRows();
  return rows.find((row) => getRowSlug(row) === slug);
}
