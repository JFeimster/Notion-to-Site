export default function HomePage() {
  return (
    <main className="pipeline-container">
      <div className="sidebar">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 24, color: 'var(--slate-900)' }}>
          Pipeline.io
        </div>
        <div className="nav-item active">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
          Database Map
        </div>
        <div className="nav-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          Templates
        </div>
        <div className="nav-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Sync History
        </div>
        <div className="nav-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          API &amp; Webhooks
        </div>
      </div>

      <div className="main-workspace">
        <div className="header-section">
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Funding Page Generation</h1>
            <div className="db-connection-pill">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg"
                width="14"
                alt="Notion"
              />
              <span>
                Notion Database: <b>Seed_Round_Pipeline_2024</b>
              </span>
              <div className="status-dot"></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-secondary">Preview All</button>
            <button className="btn btn-primary">Sync Now</button>
          </div>
        </div>

        <span className="section-title">Field Mapping (Notion → Web)</span>
        <div className="mapping-grid">
          <div className="mapping-row">
            <div className="field-pill">
              <span style={{ color: 'var(--api-gray)' }}>Aa</span> Company_Name
            </div>
            <div className="connector-arrow">→</div>
            <div className="field-pill" style={{ borderColor: 'var(--pipeline-blue)' }}>
              <span style={{ color: 'var(--pipeline-blue)' }}>H1</span> Page Title
            </div>
            <div className="webhook-tag">v-static-01</div>
          </div>
          <div className="mapping-row">
            <div className="field-pill">
              <span style={{ color: 'var(--api-gray)' }}>¶</span> Pitch_Deck_Summary
            </div>
            <div className="connector-arrow">→</div>
            <div className="field-pill" style={{ borderColor: 'var(--pipeline-blue)' }}>
              <span style={{ color: 'var(--pipeline-blue)' }}>Hero</span> Sub-headline
            </div>
            <div className="webhook-tag">v-static-02</div>
          </div>
          <div className="mapping-row">
            <div className="field-pill">
              <span style={{ color: 'var(--api-gray)' }}>$</span> Target_Raise
            </div>
            <div className="connector-arrow">→</div>
            <div className="field-pill" style={{ borderColor: 'var(--pipeline-blue)' }}>
              <span style={{ color: 'var(--pipeline-blue)' }}>Data</span> Progress Bar
            </div>
            <div className="webhook-tag">v-dynamic-01</div>
          </div>
        </div>

        <span className="section-title">Template Assignment Rules</span>
        <div className="template-rule-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Rule: Biotech / Healthcare</div>
              <div style={{ color: 'var(--api-gray)', fontSize: 12 }}>
                IF <code style={{ background: '#f1f5f9', padding: '2px 4px' }}>Sector == &quot;Health&quot;</code>{' '}
                THEN USE <span style={{ color: 'var(--pipeline-blue)' }}>Deep_Science_Template_V2</span>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }}>
              Edit Rule
            </button>
          </div>
        </div>

        <div className="template-rule-card" style={{ borderLeftColor: 'var(--api-gray)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Rule: Default Fallback</div>
              <div style={{ color: 'var(--api-gray)', fontSize: 12 }}>
                IF <code style={{ background: '#f1f5f9', padding: '2px 4px' }}>No match</code> THEN USE{' '}
                <span style={{ color: 'var(--pipeline-blue)' }}>Standard_Venture_Template</span>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }}>
              Edit Rule
            </button>
          </div>
        </div>
      </div>

      <div className="controls-panel">
        <div className="control-group">
          <span className="section-title">Trigger Configuration</span>
          <div className="toggle-container">
            <span>Automatic Sync</span>
            <div
              style={{ width: 32, height: 18, background: 'var(--pipeline-blue)', borderRadius: 9, position: 'relative' }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  right: 2,
                  top: 2,
                }}
              ></div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--api-gray)' }}>Syncs every time a row is updated in Notion.</div>
        </div>

        <div className="control-group">
          <span className="section-title">Change Detection</span>
          <div style={{ background: 'white', border: '1px solid var(--slate-200)', padding: 12, borderRadius: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 600 }}>Drift Alert</span>
              <span className="change-badge">4 Rows Out of Sync</span>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%', fontSize: 12 }}>
              Review Changes
            </button>
          </div>
        </div>

        <div className="control-group">
          <span className="section-title">Webhook Integration</span>
          <input
            type="text"
            value="https://api.vercel.com/v1/hooks/..."
            readOnly
            style={{
              width: '100%',
              padding: 8,
              border: '1px solid var(--slate-200)',
              borderRadius: 4,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: 11,
              background: 'white',
            }}
          />
          <button className="btn btn-secondary" style={{ fontSize: 12 }}>
            Copy Hook URL
          </button>
        </div>

        <div className="control-group">
          <span className="section-title">Bulk Actions</span>
          <button className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', fontSize: 12, marginBottom: 4 }}>
            Update All SEO Metadata
          </button>
          <button className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', fontSize: 12, marginBottom: 4 }}>
            Refresh Cached Images
          </button>
          <button className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', fontSize: 12, color: '#ef4444' }}>
            Flush All Pages
          </button>
        </div>
      </div>

      <div className="queue-dashboard">
        <span className="section-title" style={{ marginBottom: 12, display: 'block' }}>
          Publishing Queue
        </span>
        <div className="queue-list">
          <div className="queue-item">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600 }}>Acme Robotics</span>
              <span style={{ color: 'var(--sync-green)', fontSize: 10 }}>PUBLISHING</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span style={{ fontSize: 10, color: 'var(--api-gray)' }}>Mapping rows... 14/22 fields</span>
          </div>
          <div className="queue-item">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600 }}>BioStream Inc.</span>
              <span style={{ color: 'var(--api-gray)', fontSize: 10 }}>PENDING</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
            <span style={{ fontSize: 10, color: 'var(--api-gray)' }}>Waiting for trigger...</span>
          </div>
          <div className="queue-item">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600 }}>CloudNode</span>
              <span className="change-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                RE-SYNCING
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '85%' }}></div>
            </div>
            <span style={{ fontSize: 10, color: 'var(--api-gray)' }}>Propagating changes...</span>
          </div>
          <div className="queue-item">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600 }}>Vertex AI</span>
              <span style={{ color: 'var(--sync-green)', fontSize: 10 }}>LIVE</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%' }}></div>
            </div>
            <span style={{ fontSize: 10, color: 'var(--api-gray)' }}>Synced 2m ago</span>
          </div>
        </div>
      </div>
    </main>
  );
}
