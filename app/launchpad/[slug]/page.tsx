import { notFound } from 'next/navigation';
import { getPublishedRowBySlug, getPublishedRows, getRowSlug } from '../../../lib/sheets';
import HeroSection from '../../../components/pages/HeroSection';
import ValuePointsSection from '../../../components/pages/ValuePointsSection';
import SourceRecordPanel from '../../../components/pages/SourceRecordPanel';
import ProofStrip from '../../../components/pages/ProofStrip';
import FaqSection, { type FaqItem } from '../../../components/pages/FaqSection';
import { getPageTemplate, getTemplateAccent } from '../../../components/templates/pageTemplates';

export const dynamic = 'force-dynamic';

function splitPipeList(value: string | undefined) {
  return (value || '')
    .split('||')
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildFaqItems(row: Record<string, string>): FaqItem[] {
  return [
    {
      question: row['FAQ 1 Question'] || '',
      answer: row['FAQ 1 Answer'] || '',
    },
    {
      question: row['FAQ 2 Question'] || '',
      answer: row['FAQ 2 Answer'] || '',
    },
  ].filter((item) => item.question && item.answer);
}

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
  const bulletItems = splitPipeList(row['Offer Bullets']);
  const fallback = row['Meta Description'] || row['Hero Subheadline'] || 'No supporting copy provided yet.';

  if (bulletItems.length) {
    return bulletItems;
  }

  if (template === 'funding') {
    return [
      fallback,
      'Use this page template to make funding-related offers clearer, faster to publish, and less dependent on manual page building.',
      'Once the sheet is expanded further, this template can power stronger offer sections, proof blocks, and tailored CTA paths.'
    ];
  }

  if (template === 'resources') {
    return [
      fallback,
      'This page type works well for tool libraries, knowledge hubs, and structured resource collections.',
      'Resource pages benefit from reuse, clear structure, and simple updates from the CMS layer.'
    ];
  }

  return [
    fallback,
    'This default template keeps the page publishable even when the row has only minimal content.',
    'That means you can ship now and refine the content model later instead of waiting for a perfect schema.'
  ];
}

export default async function LaunchpadPage({ params }: { params: { slug: string } }) {
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
  const ctaUrl = row['Primary CTA URL'] || '/launchpad';
  const secondaryCtaLabel = row['Secondary CTA Label'] || 'Open dashboard';
  const secondaryCtaUrl = row['Secondary CTA URL'] || '/dashboard';
  const proofItems = splitPipeList(row['Proof Points']);
  const valuePoints = buildValuePoints(row, template);
  const faqItems = buildFaqItems(row);

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
        secondaryHref={secondaryCtaUrl}
        secondaryLabel={secondaryCtaLabel}
        accent={accent}
      />

      <ProofStrip items={proofItems} accentBg={accent.panelBg} accentBorder={accent.panelBorder} />

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: 24 }}>
          <ValuePointsSection
            title={template === 'funding' ? 'Why this offer matters' : template === 'resources' ? 'Why this resource matters' : 'Why this page exists'}
            points={valuePoints}
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

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: faqItems.length ? '1fr' : '1fr', gap: 24 }}>
          <FaqSection items={faqItems} accentBorder={accent.panelBorder} />
        </div>
      </section>
    </main>
  );
}
