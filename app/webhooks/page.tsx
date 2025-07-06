'use client'

import { useState } from 'react'
import { WebhookRow } from '@/lib/supabase'
import { useWebhookRealtime } from '@/lib/webhook-realtime'
import WebhookList from '@/components/webhook-list'
import WebhookDetail from '@/components/webhook-detail'
import WebhookStats from '@/components/webhook-stats'

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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Webhooks</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600">
                  {isConnected ? 'Connected' : 'Connecting...'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
            </div>
          </div>
        </div>

        {/* Stats */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
        <WebhookStats webhooks={webhooks} stats={stats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <WebhookList
              webhooks={webhooks}
              onWebhookSelect={setSelectedWebhook}
              selectedWebhook={selectedWebhook}
            />
          </div>
          <div>
            <WebhookDetail
              webhook={selectedWebhook}
              onClose={() => setSelectedWebhook(null)}
              onMarkProcessed={handleMarkProcessed}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
