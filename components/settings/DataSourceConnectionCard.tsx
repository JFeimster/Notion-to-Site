export type DataSourceConnectionCardProps = {
  dataSourceName: string;
  connected: boolean;
  healthLabel: 'Healthy' | 'Needs Setup';
  syncLabel: string;
  summary: string;
  envVarName: string;
  envVarValue?: string;
};

export default function DataSourceConnectionCard({
  dataSourceName,
  connected,
  healthLabel,
  syncLabel,
  summary,
  envVarName,
  envVarValue,
}: DataSourceConnectionCardProps) {
  const badgeBg = connected ? '#dcfce7' : '#fef3c7';
  const badgeColor = connected ? '#166534' : '#92400e';

  return (
    <article
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 14,
        padding: 22,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 6 }}>
            Data Source
          </div>
          <h3 style={{ fontSize: 24, margin: 0 }}>{dataSourceName}</h3>
        </div>
        <span
          style={{
            background: badgeBg,
            color: badgeColor,
            padding: '6px 10px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {healthLabel}
        </span>
      </div>

      <p style={{ color: '#334155', lineHeight: 1.6, marginTop: 0 }}>{summary}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr',
          gap: 10,
          marginTop: 18,
          marginBottom: 18,
        }}
      >
        <strong>Connection</strong>
        <span>{connected ? 'Configured' : 'Missing environment variable'}</span>
        <strong>Sync Status</strong>
        <span>{syncLabel}</span>
        <strong>Environment Key</strong>
        <code style={{ wordBreak: 'break-word' }}>{envVarName}</code>
      </div>

      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 10,
          padding: 16,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Current expected value</div>
        <code style={{ display: 'block', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#1e293b' }}>
          {envVarValue || `${envVarName}=...`}
        </code>
      </div>
    </article>
  );
}
