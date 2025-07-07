'use client'

import { supabase } from '@/lib/supabase'
import { WebhookRow } from '@/lib/supabase'
import { WebhookFilters, defaultFilters } from '@/lib/webhook-filters'
import { useEffect, useState } from 'react'

export interface WebhookStats {
  total: number
  events: Record<string, number>
  recentCount: number
}

export function useWebhookRealtime(filters: WebhookFilters = defaultFilters) {
  const [webhooks, setWebhooks] = useState<WebhookRow[]>([])
  const [stats, setStats] = useState<WebhookStats>({
    total: 0,
    events: {},
    recentCount: 0
  })
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('webhooks')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)

        if (filters.eventTypes.length > 0) {
          query = query.in('event_type', filters.eventTypes)
        }

        if (filters.repositories.length > 0) {
          query = query.in('repository', filters.repositories)
        }

        if (filters.senders.length > 0) {
          query = query.in('sender', filters.senders)
        }

        if (filters.dateRange.start) {
          query = query.gte('created_at', filters.dateRange.start)
        }

        if (filters.dateRange.end) {
          query = query.lte('created_at', filters.dateRange.end)
        }

        if (filters.githubId) {
          query = query.ilike('github_id', `%${filters.githubId}%`)
        }

        if (filters.workflowId) {
          query = query.eq('payload->workflow_id', filters.workflowId)
        }

        const { data: initialWebhooks, error } = await query

        if (error) {
          console.error('Error fetching initial webhooks:', error)
          return
        }

        setWebhooks(initialWebhooks || [])
        updateStats(initialWebhooks || [])
      } catch (error) {
        console.error('Error fetching initial data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()

    const channel = supabase
      .channel('webhooks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'webhooks'
        },
        (payload) => {
          const newWebhook = payload.new as WebhookRow
          const oldWebhook = payload.old as WebhookRow

          // Check if the webhook matches current filters
          const matchesFilters = (webhook: WebhookRow) => {
            if (filters.eventTypes.length > 0 && !filters.eventTypes.includes(webhook.event_type)) {
              return false
            }
            if (filters.repositories.length > 0 && webhook.repository && !filters.repositories.includes(webhook.repository)) {
              return false
            }
            if (filters.senders.length > 0 && webhook.sender && !filters.senders.includes(webhook.sender)) {
              return false
            }
            if (filters.dateRange.start && new Date(webhook.created_at) < new Date(filters.dateRange.start)) {
              return false
            }
            if (filters.dateRange.end && new Date(webhook.created_at) > new Date(filters.dateRange.end)) {
              return false
            }
            if (filters.githubId && !webhook.github_id.toLowerCase().includes(filters.githubId.toLowerCase())) {
              return false
            }
            if (filters.workflowId && webhook.payload?.workflow_id !== filters.workflowId) {
              return false
            }
            return true
          }

          setWebhooks((prev) => {
            let updated = [...prev]
            switch (payload.eventType) {
              case 'INSERT':
                if (matchesFilters(newWebhook)) {
                  updated = [newWebhook, ...prev.slice(0, 99)] // Keep max 100 items
                }
                break
              case 'UPDATE':
                if (matchesFilters(newWebhook)) {
                  updated = prev.map(w => w.id === newWebhook.id ? newWebhook : w)
                } else {
                  updated = prev.filter(w => w.id !== newWebhook.id)
                }
                break
              case 'DELETE':
                updated = prev.filter(w => w.id !== oldWebhook.id)
                break
            }
            updateStats(updated)
            return updated
          })
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED')
        console.log('Webhook realtime subscription status:', status)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [filters]) // Re-run when filters change

  const updateStats = (webhookList: WebhookRow[]) => {
    const events: Record<string, number> = {}
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    let recentCount = 0

    webhookList.forEach(webhook => {
      const createdAt = new Date(webhook.created_at)
      events[webhook.event_type] = (events[webhook.event_type] || 0) + 1
      if (createdAt > oneHourAgo) {
        recentCount++
      }
    })

    setStats({
      total: webhookList.length,
      events,
      recentCount
    })
  }

  return {
    webhooks,
    stats,
    isConnected,
    loading
  }
}
