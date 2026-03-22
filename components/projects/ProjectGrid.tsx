import PipelineStatusBadge from './PipelineStatusBadge';

export type ProjectCard = {
  name: string;
  slug: string;
  pages: number;
  published: number;
  drafts: number;
  category: string;
  status: 'healthy' | 'warning' | 'draft';
};

export default function ProjectGrid({ projects }: { projects: ProjectCard[] }) {
  return (
    <section
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 14,
        padding: 22,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 6 }}>
            Project Portfolio
          </div>
          <h3 style={{ fontSize: 24, margin: 0 }}>Active publishing projects</h3>
        </div>
        <div style={{ color: '#475569', fontWeight: 600 }}>{projects.length} total</div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {projects.map((project) => (
          <article
            key={project.slug}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 18,
              background: '#f8fafc',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h4 style={{ fontSize: 18, margin: '0 0 6px 0' }}>{project.name}</h4>
                <div style={{ fontSize: 13, color: '#64748b' }}>slug: {project.slug}</div>
              </div>
              <PipelineStatusBadge
                label={project.status === 'healthy' ? 'Healthy' : project.status === 'warning' ? 'Needs Review' : 'Draft'}
                tone={project.status}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Category</div>
                <div style={{ fontWeight: 700 }}>{project.category}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Pages</div>
                <div style={{ fontWeight: 700 }}>{project.pages}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Published</div>
                <div style={{ fontWeight: 700 }}>{project.published}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Drafts</div>
                <div style={{ fontWeight: 700 }}>{project.drafts}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
