# Dashboard Architecture Plan

## Reality check

The original recommendations were useful, but the current product direction has changed:
- the live data source is now Google Sheets first
- Notion support is optional and can return later
- v1 should prioritize data connection, project visibility, and deployment confidence

Because of that, the integration layer should be generalized instead of remaining Notion-only.

## Recommended top-level structure

```text
app/
  page.tsx
  sheets-live/
    page.tsx
  dashboard/
    page.tsx
components/
  settings/
    SettingsLayout.tsx
    DataSourceConnectionCard.tsx
    DomainManager.tsx
    ApiSecretManager.tsx
  templates/
    TemplateGallery.tsx
    ThemeEditor.tsx
    PropertyPreviewMapper.tsx
    TemplateContext.tsx
  analytics/
    AnalyticsOverview.tsx
    ConversionFunnel.tsx
    VisitorHeatmap.tsx
    PerformanceCharts.tsx
  projects/
    ProjectGrid.tsx
    PipelineStatusBadge.tsx
    NewProjectModal.tsx
    ArchiveManager.tsx
  sync/
    ActivityLog.tsx
    ChangeDiffViewer.tsx
    ErrorDiagnostics.tsx
    RetryQueueTable.tsx
hooks/
  useIntegrationStatus.ts
  useProjectActions.ts
services/
  fetchMetrics.service.ts
styles/
  VisualVariables.css
```

## Important renames

### Replace
- `NotionConnectionCard.tsx`

### With
- `DataSourceConnectionCard.tsx`

Reason:
The app should support Sheets now and leave room for Notion later, instead of hard-coding the product around an integration you already said is a pain in the ass.

## Recommended implementation order

### Phase 1 — make the system actually useful
1. `app/dashboard/page.tsx`
2. `components/settings/SettingsLayout.tsx`
3. `components/settings/DataSourceConnectionCard.tsx`
4. `hooks/useIntegrationStatus.ts`
5. `components/projects/ProjectGrid.tsx`
6. `components/projects/PipelineStatusBadge.tsx`

Goal:
Create one control center showing whether Sheets is connected, what projects exist, and whether publishing is healthy.

### Phase 2 — template control
1. `components/templates/TemplateGallery.tsx`
2. `components/templates/ThemeEditor.tsx`
3. `components/templates/PropertyPreviewMapper.tsx`
4. `styles/VisualVariables.css`
5. `components/templates/TemplateContext.tsx`

Goal:
Let users choose and preview rendering styles without touching code.

### Phase 3 — ops and diagnostics
1. `components/sync/ActivityLog.tsx`
2. `components/sync/ChangeDiffViewer.tsx`
3. `components/sync/ErrorDiagnostics.tsx`
4. `components/sync/RetryQueueTable.tsx`

Goal:
Make the app trustworthy when syncs fail instead of leaving users to guess what broke.

### Phase 4 — analytics
1. `components/analytics/AnalyticsOverview.tsx`
2. `components/analytics/ConversionFunnel.tsx`
3. `components/analytics/VisitorHeatmap.tsx`
4. `components/analytics/PerformanceCharts.tsx`
5. `services/fetchMetrics.service.ts`

Goal:
Only add analytics after pages and publishing are working. Otherwise this becomes a dashboard for imaginary performance.

## Suggested dashboard sections

### 1. Integration status
- Google Sheets connection status
- CSV URL configured or missing
- optional Notion status later
- domain/deployment status

### 2. Project portfolio
- total projects
- published pages
- draft pages
- pages needing review
- failed sync count

### 3. Template control
- selected active theme
- theme preview
- property-to-section mapping

### 4. Sync health
- latest pull timestamp
- row count from source
- latest failure reason
- retry actions

### 5. Conversion analytics
- page views
- CTA clicks
- conversion rate
- best-performing slug

## Recommended v1 scope

For the current repo, the smartest v1 is:
- Sheets connection
- project grid
- integration status card
- pipeline status badge
- basic settings shell

Do **not** build heatmaps, diff viewers, and full conversion dashboards before the publishing workflow is stable.

## Practical note

This repo began as a prototype shell. The fastest path now is to add a `/dashboard` route and scaffold the settings + project components first.
