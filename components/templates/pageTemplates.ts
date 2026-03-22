import type { SheetRow } from '../../lib/sheets';

export type PageTemplateKey = 'funding' | 'resources' | 'default';

export function getPageTemplate(row: SheetRow): PageTemplateKey {
  const category = (row['Category'] || '').toLowerCase();
  const status = (row['Status'] || '').toLowerCase();

  if (category.includes('funding') || category.includes('capital') || status.includes('ready')) {
    return 'funding';
  }

  if (category.includes('resource') || category.includes('tool') || category.includes('library')) {
    return 'resources';
  }

  return 'default';
}

export function getTemplateAccent(template: PageTemplateKey) {
  switch (template) {
    case 'funding':
      return {
        badgeBg: '#dbeafe',
        badgeColor: '#1d4ed8',
        primaryBg: '#2563eb',
        panelBg: '#eff6ff',
        panelBorder: '#bfdbfe',
      };
    case 'resources':
      return {
        badgeBg: '#dcfce7',
        badgeColor: '#166534',
        primaryBg: '#16a34a',
        panelBg: '#f0fdf4',
        panelBorder: '#bbf7d0',
      };
    default:
      return {
        badgeBg: '#e2e8f0',
        badgeColor: '#334155',
        primaryBg: '#0f172a',
        panelBg: '#f8fafc',
        panelBorder: '#cbd5e1',
      };
  }
}
