'use client'

import { supabase } from '@/lib/supabase'
import { WebhookRow } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export interface WebhookStats {
  total: number
  events: Record<string, number>
  recentCount: number
}

export function useWebhookRealtime() {
  const [webhooks, setWebhooks] = useState<WebhookRow[]>([])
  const [stats, setStats] = useState<WebhookStats>({
    total: 0,
    events: {},
    recentCount: 0
  })
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data: initialWebhooks, error } = await supabase
          .from('webhooks')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)

        if (error) {
          console.error('Error fetching initial webhooks:', error)
          return
        }

        setWebhooks(initialWebhooks || [])
        updateStats(initialWebhooks || [])
      } catch (error) {
        console.error('Error fetching initial data:', error)
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
          setWebhooks((prev) => {
            let updated = [...prev]
            switch (payload.eventType) {
              case 'INSERT':
                updated = [payload.new as WebhookRow, ...prev]
                break
              case 'UPDATE':
                updated = prev.map(w => w.id === payload.new.id ? (payload.new as WebhookRow) : w)
                break
              case 'DELETE':
                updated = prev.filter(w => w.id !== payload.old.id)
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
  }, [])

  const updateStats = (webhookList: WebhookRow[]) => {
    const events: Record<string, number> = {}
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    let recentCount = 0

    webhookList.forEach(webhook => {
      const createdAt = new Date(webhook.created_at);
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
    isConnected
  }
}
