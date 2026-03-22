'use client';

import { useMemo } from 'react';

export type IntegrationStatusInput = {
  dataSourceName: string;
  connected: boolean;
  csvUrlConfigured: boolean;
  projectCount: number;
  publishedPageCount: number;
  draftPageCount: number;
  lastSyncLabel: string;
};

export type IntegrationStatus = IntegrationStatusInput & {
  healthLabel: 'Healthy' | 'Needs Setup';
  syncLabel: string;
  summary: string;
};

export function useIntegrationStatus(input: IntegrationStatusInput): IntegrationStatus {
  return useMemo(() => {
    const healthLabel = input.connected && input.csvUrlConfigured ? 'Healthy' : 'Needs Setup';
    const syncLabel = input.connected
      ? `Last sync ${input.lastSyncLabel}`
      : 'Connection not configured';

    const summary = input.connected
      ? `${input.dataSourceName} is connected. ${input.publishedPageCount} published pages and ${input.draftPageCount} drafts are currently tracked across ${input.projectCount} projects.`
      : `The ${input.dataSourceName} connection is not configured yet. Add the environment variable and redeploy to activate the publishing pipeline.`;

    return {
      ...input,
      healthLabel,
      syncLabel,
      summary,
    };
  }, [input]);
}
