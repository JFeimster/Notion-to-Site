import { notFound } from 'next/navigation';
import { getPublishedRowBySlug, getPublishedRows, getRowSlug } from '../../../lib/sheets';
import HeroSection from '../../../components/pages/HeroSection';
import ValuePointsSection from '../../../components/pages/ValuePointsSection';
import SourceRecordPanel from '../../../components/pages/SourceRecordPanel';
import { getPageTemplate, getTemplateAccent } from '../../../components/templates/pageTemplates';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const rows = await getPublishedRows();
    return rows.map((row) => ({ slug: getRowSlug(row) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const row = await getPublishedRowBySlug(params.slug);

  if (!row) {
    return {
      title: 'Page not found',
      description: 'The requested generated page could not be found.',
    };
  }

  return {
    title: row['Page Title'] || row['Name'] || row['Hero Headline'] || 'Generated page',
    description: row['Meta Description'] || row['Hero Subheadline'] || 'Generated from Google Sheets CMS.',
  };
}

function buildValuePoints(row: Record<string, string>, template: 'funding' | 'resources' | 'default') {
  const headline = row['Hero Headline'] || row['Name'] || 'This page';
  const metaDescription = row['Meta Description'] || 'No meta description provided yet.';
  const ctaLabel = row['Primary CTA Label'] || 'Learn More';

  if (template === 'funding') {
    return [
      `${headline} is positioned as a funding-oriented asset, which means the page should reduce friction, clarify the offer, and move the visitor toward action fast.`,
      `The core promise right now is: ${metaDescription}`,
      `The CTA layer is already configured around “${ctaLabel}”, which means the next smart step is testing stronger offer framing and proof elements rather than rebuilding the route again.`
    ];
  }

  if (template === 'resources') {
    return [
      `${headline} is being treated as a resource or library page, so clarity, utility, and reuse matter more than hype.`,
      `The current supporting copy says: ${metaDescription}`,
      `This template is better suited for tool directories, content hubs, and support assets where trust beats chest-beating.`
    ];
  }

  return [
    `${headline} is currently using the default template shell, which is the fallback for rows that do not cleanly map to a more specific rendering system yet.`,
    `The page summary currently reads: ${metaDescription}`,
    `That makes this page stable enough to publish now while still leaving room for sharper template specialization later.`
  ];
}

export default async function GeneratedSitePage({ params }: { params: { slug: string } }) {
  const row = await getPublishedRowBySlug(params.slug);

  if (!row) {
    notFound();
  }

  const template = getPageTemplate(row);
  const accent = getTemplateAccent(template);
  const pageTitle = row['Page Title'] || row['Name'] || row['Hero Headline'] || 'Untitled page';
  const headline = row['Hero Headline'] || row['Name'] || 'Untitled page';
  const subheadline = row['Hero Subheadline'] || row['Meta Description'] || 'No subheadline provided yet.';
  const category = row['Category'] || 'General';
  const status = row['Status'] || 'Ready';
  const ctaLabel = row['Primary CTA Label'] || 'Learn More';
  const ctaUrl = row['Primary CTA URL'] || '/sites';
  const points = buildValuePoints(row, template);

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <HeroSection
        eyebrow={`${category} · ${template} template`}
        headline={headline}
        subheadline={subheadline}
        status={status}
        slug={params.slug}
        primaryCtaLabel={ctaLabel}
        primaryCtaUrl={ctaUrl}
        secondaryHref="/dashboard"
        secondaryLabel="Open dashboard"
        accent={accent}
      />

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: 24 }}>
          <ValuePointsSection
            title={template === 'funding' ? 'Why this offer matters' : template === 'resources' ? 'Why this resource matters' : 'Why this page exists'}
            points={points}
            accentBorder={accent.panelBorder}
          />

          <SourceRecordPanel
            row={row}
            pageTitle={pageTitle}
            category={category}
            status={status}
            ctaLabel={ctaLabel}
            ctaUrl={ctaUrl}
            accentBorder={accent.panelBorder}
          />
        </div>
      </section>
    </main>
  );
}
