'use client'

import { useState } from 'react'
import { WebhookRow } from '@/lib/supabase'
import { useWebhookRealtime } from '@/lib/webhook-realtime'
import WebhookList from '@/components/webhook-list'
import WebhookDetail from '@/components/webhook-detail'
import WebhookStats from '@/components/webhook-stats'
import { Box, Heading, Text, Grid, Stack } from '@primer/react-brand'

export default function WebhookDashboard() {
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookRow | null>(null)
  const { webhooks, stats, isConnected } = useWebhookRealtime()

  const handleMarkProcessed = async (webhookId: string) => {
    try {
      const response = await fetch(`/api/webhooks/${webhookId}`, {
        method: 'PATCH'
      })
      
      if (!response.ok) {
        throw new Error('Failed to mark webhook as processed')
      }
      
      // Update selected webhook if it's the one being processed
      if (selectedWebhook?.id === webhookId) {
        setSelectedWebhook(prev => prev ? { ...prev, updated_at: new Date().toISOString() } : null)
      }
    } catch (err) {
      console.error('Error marking webhook as processed:', err)
    }
  }

  return (
    <Box padding={32}>
      <Stack gap={48}>
        {/* Header */}
        <Box>
          <Heading size="1" as="h1">
            Webhooks
          </Heading>
          <Stack direction="horizontal" gap={8} alignItems="center">
            <Text size="200" variant="muted">
              {isConnected ? '🟢 Connected' : '🔴 Connecting...'}
            </Text>
          </Stack>
        </Box>

        {/* Stats */}
        <Box>
          <Heading size="3" as="h2">
            Statistics
          </Heading>
          <WebhookStats webhooks={webhooks} stats={stats} />
        </Box>

        {/* Main Content */}
        <Grid fullWidth>
          <Grid.Column span={6}>
            <WebhookList
              webhooks={webhooks}
              onWebhookSelect={setSelectedWebhook}
              selectedWebhook={selectedWebhook}
            />
          </Grid.Column>
          <Grid.Column span={6}>
            <WebhookDetail
              webhook={selectedWebhook}
              onClose={() => setSelectedWebhook(null)}
              onMarkProcessed={handleMarkProcessed}
            />
          </Grid.Column>
        </Grid>
      </Stack>
    </Box>
  )
}
