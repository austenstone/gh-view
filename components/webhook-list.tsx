'use client'

import { useState } from 'react'
import { WebhookRow } from '@/lib/supabase'
import { Box, Heading, Text, Stack, TextInput, Select, Label } from '@primer/react-brand'

interface WebhookListProps {
  webhooks: WebhookRow[]
  onWebhookSelect: (webhook: WebhookRow) => void
  selectedWebhook?: WebhookRow | null
}

export default function WebhookList({ 
  webhooks, 
  onWebhookSelect, 
  selectedWebhook
}: WebhookListProps) {
  const [filter, setFilter] = useState('')
  const [eventFilter, setEventFilter] = useState('')

  const filteredWebhooks = webhooks.filter(webhook => {
    const matchesFilter = webhook.github_id.toLowerCase().includes(filter.toLowerCase()) ||
                         webhook.event_type.toLowerCase().includes(filter.toLowerCase()) ||
                         (webhook.repository && webhook.repository.toLowerCase().includes(filter.toLowerCase()))
    const matchesEvent = eventFilter === '' || webhook.event_type === eventFilter
    return matchesFilter && matchesEvent
  })

  const uniqueEvents = [...new Set(webhooks.map(w => w.event_type))]

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getEventColor = (event: string): string => {
    const colors: Record<string, string> = {
      'push': '#0366d6',
      'pull_request': '#28a745',
      'issues': '#ffd33d',
      'release': '#6f42c1',
      'star': '#fb8500',
      'fork': '#e36209',
      'watch': '#6a737d'
    }
    return colors[event] || '#6a737d'
  }

  return (
    <Box backgroundColor="default" borderRadius="medium" padding="normal">
      <Stack gap={24}>
        <Stack direction="horizontal" justifyContent="space-between" alignItems="center">
          <Heading size="4">Webhook Deliveries</Heading>
          <Text size="100" variant="muted">
            {filteredWebhooks.length} of {webhooks.length} webhooks
          </Text>
        </Stack>
        
        <Stack gap={16} direction="horizontal">
          <Box style={{ flex: 1 }}>
            <TextInput
              placeholder="Filter by ID, event, or repository..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
            />
          </Box>
          <Box>
            <Select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
            >
              <Select.Option value="">All Events</Select.Option>
              {uniqueEvents.map(event => (
                <Select.Option key={event} value={event}>{event}</Select.Option>
              ))}
            </Select>
          </Box>
        </Stack>

        <Box style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {filteredWebhooks.length === 0 ? (
            <Box padding="spacious" style={{ textAlign: 'center' }}>
              {webhooks.length === 0 ? (
                <Stack gap={8} alignItems="center">
                  <Text size="300">No webhooks yet</Text>
                  <Text size="200" variant="muted">Webhooks will appear here when they&apos;re received</Text>
                </Stack>
              ) : (
                <Text size="300" variant="muted">No webhooks match your filters</Text>
              )}
            </Box>
          ) : (
            <Stack gap="none">
              {filteredWebhooks.map((webhook) => (
                <Box
                  key={webhook.id}
                  onClick={() => onWebhookSelect(webhook)}
                  padding="normal"
                  backgroundColor={selectedWebhook?.id === webhook.id ? 'subtle' : 'default'}
                  style={{ 
                    cursor: 'pointer',
                    borderLeft: selectedWebhook?.id === webhook.id ? '4px solid #0366d6' : 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedWebhook?.id !== webhook.id) {
                      e.currentTarget.style.backgroundColor = 'var(--brand-color-canvas-subtle)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedWebhook?.id !== webhook.id) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <Stack direction="horizontal" justifyContent="space-between" alignItems="flex-start">
                    <Stack gap={8} style={{ flex: 1 }}>
                      <Stack direction="horizontal" gap={8} alignItems="center">
                        <Label 
                          size="small"
                          style={{ 
                            backgroundColor: getEventColor(webhook.event_type),
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '12px',
                            fontSize: '11px'
                          }}
                        >
                          {webhook.event_type}
                        </Label>
                        {webhook.repository && (
                          <Text size="100" variant="muted">
                            {webhook.repository}
                          </Text>
                        )}
                      </Stack>
                      <Text size="200" variant="muted">
                        ID: {webhook.github_id}
                      </Text>
                      <Text size="100" variant="muted">
                        {formatTime(webhook.created_at)}
                      </Text>
                      {webhook.sender && (
                        <Text size="100" variant="muted">
                          by {webhook.sender}
                        </Text>
                      )}
                    </Stack>
                    <Text size="200" variant="muted">→</Text>
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
