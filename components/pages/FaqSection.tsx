export type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqSection({
  items,
  accentBorder,
}: {
  items: FaqItem[];
  accentBorder: string;
}) {
  if (!items.length) return null;

  return (
    <section style={{ background: '#ffffff', border: `1px solid ${accentBorder}`, borderRadius: 20, padding: 28 }}>
      <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 10 }}>
        Frequently Asked Questions
      </div>
      <h2 style={{ fontSize: 28, marginTop: 0 }}>Common questions</h2>
      <div style={{ display: 'grid', gap: 14 }}>
        {items.map((item, index) => (
          <div
            key={`${item.question}-${index}`}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{item.question}</div>
            <div style={{ color: '#334155', lineHeight: 1.7 }}>{item.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
