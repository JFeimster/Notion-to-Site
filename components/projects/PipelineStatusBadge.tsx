export default function PipelineStatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: 'healthy' | 'warning' | 'draft';
}) {
  const styles = {
    healthy: { background: '#dcfce7', color: '#166534' },
    warning: { background: '#fef3c7', color: '#92400e' },
    draft: { background: '#e2e8f0', color: '#334155' },
  } as const;

  const style = styles[tone];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: style.background,
        color: style.color,
        padding: '6px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  );
}
