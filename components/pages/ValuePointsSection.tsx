export default function ValuePointsSection({
  title,
  points,
  accentBorder,
}: {
  title: string;
  points: string[];
  accentBorder: string;
}) {
  return (
    <section style={{ background: '#ffffff', border: `1px solid ${accentBorder}`, borderRadius: 20, padding: 28 }}>
      <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 10 }}>
        Core Messaging
      </div>
      <h2 style={{ fontSize: 28, marginTop: 0 }}>{title}</h2>
      <div style={{ display: 'grid', gap: 14 }}>
        {points.map((point, index) => (
          <div
            key={`${point}-${index}`}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: 16,
              lineHeight: 1.7,
              color: '#334155',
            }}
          >
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}
