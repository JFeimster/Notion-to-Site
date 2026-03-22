export default function ProofStrip({
  items,
  accentBg,
  accentBorder,
}: {
  items: string[];
  accentBg: string;
  accentBorder: string;
}) {
  if (!items.length) return null;

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 24px' }}>
      <div
        style={{
          background: accentBg,
          border: `1px solid ${accentBorder}`,
          borderRadius: 18,
          padding: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: 16,
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
