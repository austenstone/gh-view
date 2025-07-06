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
      <Grid fullWidth>
        <Grid.Column span={3}>
          <Statistic variant="boxed">
            <Statistic.Heading>
              {stats.total}
            </Statistic.Heading>
            <Statistic.Description>
              Total Webhooks
            </Statistic.Description>
          </Statistic>
        </Grid.Column>
        
        <Grid.Column span={3}>
          <Statistic variant="boxed">
            <Statistic.Heading>
              {stats.recentCount}
            </Statistic.Heading>
            <Statistic.Description>
              Last Hour
            </Statistic.Description>
          </Statistic>
        </Grid.Column>
        
        <Grid.Column span={3}>
          <Statistic variant="boxed">
            <Statistic.Heading>
              {getTopEvents()[0]?.[1] || 0}
            </Statistic.Heading>
            <Statistic.Description>
              Most Active
            </Statistic.Description>
          </Statistic>
        </Grid.Column>
        
        <Grid.Column span={3}>
          <Statistic variant="boxed">
            <Statistic.Heading>
              {Object.keys(stats.events).length}
            </Statistic.Heading>
            <Statistic.Description>
              Event Types
            </Statistic.Description>
          </Statistic>
        </Grid.Column>
      </Grid>

      <Box padding={48}>
        <Grid fullWidth>
          <Grid.Column span={6}>
            <Box backgroundColor="subtle" padding="normal" borderRadius="medium">
              <Stack gap={16}>
                <Heading size="4">Top Events</Heading>
                <Stack gap={16}>
                  {getTopEvents().map(([event, count]) => (
                    <Stack key={event} direction="horizontal" justifyContent="space-between" alignItems="center">
                      <Text size="200">{event}</Text>
                      <Text size="200" weight="semibold">{count}</Text>
                    </Stack>
                  ))}
                  {getTopEvents().length === 0 && (
                    <Text size="200" variant="muted">No events yet</Text>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Grid.Column>

          <Grid.Column span={6}>
            <Box backgroundColor="subtle" padding="normal" borderRadius="medium">
              <Stack gap={16}>
                <Heading size="4">Recent Activity</Heading>
                <Stack gap={16}>
                  {getRecentActivity().map((item) => (
                    <Stack key={item.id} direction="horizontal" justifyContent="space-between" alignItems="center">
                      <Stack gap={4}>
                        <Text size="200">{item.event_type}</Text>
                        {item.repository && (
                          <Text size="100" variant="muted">
                            {item.repository}
                          </Text>
                        )}
                      </Stack>
                      <Text size="100" variant="muted">
                        {new Date(item.created_at).toLocaleTimeString()}
                      </Text>
                    </Stack>
                  ))}
                  {getRecentActivity().length === 0 && (
                    <Text size="200" variant="muted">No recent activity</Text>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Grid.Column>
        </Grid>
      </Box>
    </Box>
  )
}
