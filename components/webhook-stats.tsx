'use client'

import { WebhookRow } from '@/lib/supabase'
import { WebhookStats as WebhookStatsType } from '@/lib/webhook-realtime'
import { Box, Grid, Stack, Heading, Text, Statistic } from '@primer/react-brand'

interface WebhookStatsProps {
  webhooks: WebhookRow[]
  stats: WebhookStatsType
}

export default function WebhookStats({ webhooks, stats }: WebhookStatsProps) {
  const getTopEvents = () => {
    return Object.entries(stats.events)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }

  const getRecentActivity = () => {
    return webhooks.slice(0, 5);
  }

  return (
    <Box>
      <Stack direction={{ narrow: 'vertical', regular: 'horizontal' }} padding="none">
        <Statistic padding="condensed">
          <Statistic.Heading>
            {stats.total}
          </Statistic.Heading>
          <Statistic.Description>
            Total Webhooks
          </Statistic.Description>
        </Statistic>

        <Statistic padding="condensed">
          <Statistic.Heading>
            {stats.recentCount}
          </Statistic.Heading>
          <Statistic.Description>
            Last Hour
          </Statistic.Description>
        </Statistic>

        <Statistic padding="condensed">
          <Statistic.Heading>
            {getTopEvents()[0]?.[1] || 0}
          </Statistic.Heading>
          <Statistic.Description>
            Most Active
          </Statistic.Description>
        </Statistic>

        <Statistic padding="condensed">
          <Statistic.Heading>
            {Object.keys(stats.events).length}
          </Statistic.Heading>
          <Statistic.Description>
            Event Types
          </Statistic.Description>
        </Statistic>
      </Stack>
    </Box>
  )
}
