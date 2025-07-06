'use client'

import { WebhookRow } from '@/lib/supabase'
import { useState } from 'react'
import { Box, Heading, Text, Stack, Button, Label } from '@primer/react-brand'

interface WebhookDetailProps {
  webhook: WebhookRow | null
  onClose: () => void
  onMarkProcessed: (id: string) => void
}

export default function WebhookDetail({ 
  webhook, 
  onClose, 
  onMarkProcessed 
}: WebhookDetailProps) {
  const [activeTab, setActiveTab] = useState<'payload' | 'headers'>('payload')

  if (!webhook) {
    return (
      <Box backgroundColor="default" borderRadius="medium" padding="spacious" style={{ textAlign: 'center' }}>
        <Text size="300" variant="muted">
          Select a webhook to view details
        </Text>
      </Box>
    )
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <Box backgroundColor="default" borderRadius="medium" padding="normal">
      <Stack gap={24}>
        <Stack direction="horizontal" justifyContent="space-between" alignItems="flex-start">
          <Stack gap={12}>
            <Heading size="4">
              Webhook Details
            </Heading>
            <Stack direction="horizontal" gap={8} alignItems="center">
              <Label>
                {webhook.event_type}
              </Label>
              {webhook.repository && (
                <Text size="200" variant="muted">
                  {webhook.repository}
                </Text>
              )}
            </Stack>
          </Stack>
          <Button 
            variant="invisible"
            onClick={onClose}
            style={{ padding: '4px', fontSize: '20px' }}
          >
            ×
          </Button>
        </Stack>

        <Stack gap={16}>
          <Box>
            <Text size="200" weight="semibold" variant="muted">GitHub ID</Text>
            <Box backgroundColor="subtle" padding="condensed" borderRadius="medium" style={{ marginTop: '4px' }}>
              <Text size="200">{webhook.github_id}</Text>
            </Box>
          </Box>
          
          <Box>
            <Text size="200" weight="semibold" variant="muted">Event Type</Text>
            <Box backgroundColor="subtle" padding="condensed" borderRadius="medium" style={{ marginTop: '4px' }}>
              <Text size="200">{webhook.event_type}</Text>
            </Box>
          </Box>
          
          <Box>
            <Text size="200" weight="semibold" variant="muted">Repository</Text>
            <Box backgroundColor="subtle" padding="condensed" borderRadius="medium" style={{ marginTop: '4px' }}>
              <Text size="200">{webhook.repository || 'N/A'}</Text>
            </Box>
          </Box>
          
          <Box>
            <Text size="200" weight="semibold" variant="muted">Sender</Text>
            <Box backgroundColor="subtle" padding="condensed" borderRadius="medium" style={{ marginTop: '4px' }}>
              <Text size="200">{webhook.sender || 'N/A'}</Text>
            </Box>
          </Box>
          
          <Box>
            <Text size="200" weight="semibold" variant="muted">Created At</Text>
            <Box backgroundColor="subtle" padding="condensed" borderRadius="medium" style={{ marginTop: '4px' }}>
              <Text size="200">{formatTime(webhook.created_at)}</Text>
            </Box>
          </Box>
          
          <Box>
            <Text size="200" weight="semibold" variant="muted">Updated At</Text>
            <Box backgroundColor="subtle" padding="condensed" borderRadius="medium" style={{ marginTop: '4px' }}>
              <Text size="200">{formatTime(webhook.updated_at)}</Text>
            </Box>
          </Box>
        </Stack>

        <Box style={{ borderTop: '1px solid var(--brand-color-border-default)', paddingTop: '16px' }}>
          <Stack gap={16}>
            <Stack direction="horizontal" gap={4}>
              <Button
                variant={activeTab === 'payload' ? 'primary' : 'subtle'}
                size="small"
                onClick={() => setActiveTab('payload')}
              >
                Payload
              </Button>
              <Button
                variant={activeTab === 'headers' ? 'primary' : 'subtle'}
                size="small"
                onClick={() => setActiveTab('headers')}
              >
                Headers
              </Button>
            </Stack>

            <Box backgroundColor="subtle" padding="normal" borderRadius="medium">
              <pre
                style={{ 
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap',
                  overflowX: 'auto',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  margin: 0
                }}
              >
                {activeTab === 'payload' 
                  ? JSON.stringify(webhook.payload, null, 2)
                  : JSON.stringify(webhook.headers, null, 2)
                }
              </pre>
            </Box>
          </Stack>
        </Box>

        <Stack direction="horizontal" justifyContent="flex-end">
          <Button
            variant="primary"
            onClick={() => onMarkProcessed(webhook.id)}
          >
            Mark as Processed
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
