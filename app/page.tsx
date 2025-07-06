'use client'

import { Hero, Section, Heading, Text, Button, Box, Stack } from '@primer/react-brand'
import Link from 'next/link'

export default function Home() {
  return (
    <Box>
      <Hero align="center">
        <Hero.Heading>
          GitHub View
        </Hero.Heading>
        <Hero.Description>
          Monitor and manage your GitHub webhook deliveries with real-time insights and detailed analytics
        </Hero.Description>
        <Hero.PrimaryAction href="/webhooks">
          View Webhooks
        </Hero.PrimaryAction>
      </Hero>

      <Section backgroundColor="subtle">
        <Box padding={64}>
          <Stack gap={48} alignItems="center">
            <Heading size="3">
              Features
            </Heading>
            
            <Stack gap={32} direction="horizontal">
              <Box padding={24} borderRadius="medium" backgroundColor="default">
                <Stack gap={16}>
                  <Heading size="5">📡 Real-time Monitoring</Heading>
                  <Text as="p" size="300">
                    Track webhook deliveries in real-time with live updates and connection status indicators
                  </Text>
                </Stack>
              </Box>
              
              <Box padding={24} borderRadius="medium" backgroundColor="default">
                <Stack gap={16}>
                  <Heading size="5">📊 Analytics Dashboard</Heading>
                  <Text as="p" size="300">
                    View comprehensive statistics and insights about your webhook activity patterns
                  </Text>
                </Stack>
              </Box>
              
              <Box padding={24} borderRadius="medium" backgroundColor="default">
                <Stack gap={16}>
                  <Heading size="5">🔍 Detailed Inspection</Heading>
                  <Text as="p" size="300">
                    Examine payload data, headers, and metadata for each webhook delivery
                  </Text>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Section>

      <Section>
        <Box padding={64}>
          <Stack gap={24} alignItems="center">
            <Heading size="3">
              Get Started
            </Heading>
            <Text as="p" size="300">
              Ready to monitor your GitHub webhooks? Start by viewing your webhook deliveries.
            </Text>
            <Button as={Link} href="/webhooks" variant="primary" size="large">
              Go to Webhooks
            </Button>
          </Stack>
        </Box>
      </Section>
    </Box>
  )
}
