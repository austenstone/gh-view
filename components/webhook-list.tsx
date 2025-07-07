'use client'

import { WebhookRow } from '@/lib/supabase'
import { WebhookFilters } from '@/lib/webhook-filters'
import { Box, Heading, Text, Stack, Label } from '@primer/react'

interface WebhookListProps {
  webhooks: WebhookRow[]
  onWebhookSelect: (webhook: WebhookRow) => void
  selectedWebhook?: WebhookRow | null
  filters: WebhookFilters
  onFiltersChange: (filters: WebhookFilters) => void
  loading?: boolean
}

export default function WebhookList({ 
  webhooks, 
  onWebhookSelect, 
  selectedWebhook,
  filters,
  loading = false
}: WebhookListProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
      <Box p={4} borderWidth="1px" borderStyle="solid" borderColor="border.default" borderRadius={2}>
        <Stack gap="normal">
          <Stack direction="horizontal" justifyContent="space-between" alignItems="center">
            <Heading as="h3">Webhook Deliveries</Heading>
            <Text fontSize={14} color="fg.muted">
              {loading ? 'Loading...' : `${webhooks.length} webhook${webhooks.length !== 1 ? 's' : ''}`}
            </Text>
          </Stack>

          <Box style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {loading ? (
              <Box p={4} sx={{ textAlign: 'center' }}>
                <Text>Loading webhooks...</Text>
              </Box>
            ) : webhooks.length === 0 ? (
              <Box p={4} sx={{ textAlign: 'center' }}>
                <Stack gap="condensed" alignItems="center">
                  <Text fontSize={16}>No webhooks found</Text>
                  <Text fontSize={14} color="fg.muted">
                    {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f) 
                      ? 'Try adjusting your filters'
                      : 'Webhooks will appear here when they are received'
                    }
                  </Text>
                </Stack>
              </Box>
            ) : (
              <Stack gap="none">
                {webhooks.map((webhook) => (
                  <Box
                    key={webhook.id}
                    onClick={() => onWebhookSelect(webhook)}
                    p={3}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 2,
                      borderLeft: selectedWebhook?.id === webhook.id ? '4px solid' : 'none',
                      borderColor: selectedWebhook?.id === webhook.id ? 'accent.emphasis' : 'transparent',
                      backgroundColor: selectedWebhook?.id === webhook.id ? 'accent.subtle' : 'transparent',
                      '&:hover': {
                        backgroundColor: selectedWebhook?.id === webhook.id ? 'accent.subtle' : 'canvas.subtle'
                      }
                    }}
                  >
                    <Stack direction="horizontal" justifyContent="space-between" alignItems="flex-start">
                      <Stack gap="condensed" style={{ flex: 1 }}>
                        <Stack direction="horizontal" gap="condensed" alignItems="center">
                          <Label>
                            {webhook.event_type}
                          </Label>
                          {webhook.repository && (
                            <Text fontSize={12} color="fg.muted">
                              {webhook.repository}
                            </Text>
                          )}
                        </Stack>
                        <Text fontSize={14} color="fg.muted">
                          ID: {webhook.github_id}
                        </Text>
                        <Text fontSize={12} color="fg.muted">
                          {formatTime(webhook.created_at)}
                        </Text>
                        {webhook.sender && (
                          <Text fontSize={12} color="fg.muted">
                            by {webhook.sender}
                          </Text>
                        )}
                      </Stack>
                      <Text fontSize={14} color="fg.muted">→</Text>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </Box>
  )
}
