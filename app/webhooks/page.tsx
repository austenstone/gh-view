'use client'

import { useState } from 'react'
import { WebhookRow } from '@/lib/supabase'
import { useWebhookRealtime } from '@/lib/webhook-realtime'
import { WebhookFilters, defaultFilters } from '@/lib/webhook-filters'
import WebhookList from '@/components/webhook-list'
import WebhookStats from '@/components/webhook-stats'
import { Box, Heading, Text, Stack, PageLayout, PageHeader, Link } from '@primer/react'
import WebhookFilterPanel from '@/components/webhook-filter-panel'

export default function WebhookDashboard() {
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookRow | null>(null)
  const [filters, setFilters] = useState<WebhookFilters>(defaultFilters)
  const { webhooks, stats, isConnected, loading } = useWebhookRealtime(filters)

  return (
    <PageLayout>
      <PageLayout.Header>
          <Box>
            <PageHeader role="banner" aria-label="Add-pageheader-docs">
              <PageHeader.TitleArea>
                <PageHeader.Title>Webhooks</PageHeader.Title>
              </PageHeader.TitleArea>
              <PageHeader.Description>
                <Text sx={{fontSize: 1, color: 'fg.muted'}}>
                  <Link href="https://github.com/broccolinisoup" sx={{fontWeight: 'bold'}}>
                    broccolinisoup
                  </Link>{' '}
                  created this branch 5 days ago · 14 commits · updated today
                </Text>
              </PageHeader.Description>
            </PageHeader>
            <Heading as="h1">
              Webhooks
            </Heading>

            <Stack direction="horizontal" alignItems="center" gap="condensed">
              <Text color="fg.muted">
                {isConnected ? '🟢 Connected' : '🔴 Connecting...'}
              </Text>
            </Stack>
          </Box>

          <Box>
            <Heading as="h2">
              Statistics
            </Heading>
            <WebhookStats webhooks={webhooks} stats={stats} />
          </Box>
      </PageLayout.Header>
      <PageLayout.Content>
        <Box>
          <WebhookList
            webhooks={webhooks}
            selectedWebhook={selectedWebhook}
            onWebhookSelect={setSelectedWebhook}
            filters={filters}
            onFiltersChange={setFilters}
            loading={loading}
          />
        </Box>
      </PageLayout.Content>
      <PageLayout.Pane width="medium">
        <Box>
          <WebhookFilterPanel 
            filters={filters} 
            onFiltersChange={setFilters}
          />
        </Box>
      </PageLayout.Pane>
      <PageLayout.Footer>
        {/* <Placeholder height={64}>Footer</Placeholder> */}
      </PageLayout.Footer>
    </PageLayout>
  )
}
