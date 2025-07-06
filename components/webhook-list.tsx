'use client'

import { useState } from 'react'
import { WebhookRow } from '@/lib/supabase'

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

  const getEventColor = (event: string) => {
    const colors: Record<string, string> = {
      'push': 'bg-blue-100 text-blue-800',
      'pull_request': 'bg-green-100 text-green-800',
      'issues': 'bg-yellow-100 text-yellow-800',
      'release': 'bg-purple-100 text-purple-800',
      'star': 'bg-orange-100 text-orange-800',
      'fork': 'bg-red-100 text-red-800',
      'watch': 'bg-gray-100 text-gray-800'
    }
    return colors[event] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Webhook Deliveries</h2>
          <span className="text-sm text-gray-600">
            {filteredWebhooks.length} of {webhooks.length} webhooks
          </span>
        </div>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Filter by ID, event, or repository..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Events</option>
            {uniqueEvents.map(event => (
              <option key={event} value={event}>{event}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredWebhooks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {webhooks.length === 0 ? (
              <div>
                <p className="text-lg mb-2">No webhooks yet</p>
                <p className="text-sm">Webhooks will appear here when they&apos;re received</p>
              </div>
            ) : (
              <p>No webhooks match your filters</p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredWebhooks.map((webhook) => (
              <div
                key={webhook.id}
                onClick={() => onWebhookSelect(webhook)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedWebhook?.id === webhook.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventColor(webhook.event_type)}`}>
                        {webhook.event_type}
                      </span>
                      {webhook.repository && (
                        <span className="text-xs text-gray-500">
                          {webhook.repository}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      ID: {webhook.github_id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(webhook.created_at)}
                    </p>
                    {webhook.sender && (
                      <p className="text-xs text-gray-500">
                        by {webhook.sender}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
