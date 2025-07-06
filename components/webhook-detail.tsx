'use client'

import { WebhookRow } from '@/lib/supabase'
import { useState } from 'react'

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
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        Select a webhook to view details
      </div>
    )
  }

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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Webhook Details
          </h2>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventColor(webhook.event_type)}`}>
              {webhook.event_type}
            </span>
            {webhook.repository && (
              <span className="text-sm text-gray-600">
                {webhook.repository}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub ID
            </label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              {webhook.github_id}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              {webhook.event_type}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repository
            </label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              {webhook.repository || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sender
            </label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              {webhook.sender || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Created At
            </label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              {formatTime(webhook.created_at)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Updated At
            </label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              {formatTime(webhook.updated_at)}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex space-x-1 mb-4">
          <button
            onClick={() => setActiveTab('payload')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'payload'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Payload
          </button>
          <button
            onClick={() => setActiveTab('headers')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'headers'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Headers
          </button>
        </div>

        {activeTab === 'payload' && (
          <div className="bg-gray-50 rounded-md p-4">
            <pre className="text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(webhook.payload, null, 2)}
            </pre>
          </div>
        )}

        {activeTab === 'headers' && (
          <div className="bg-gray-50 rounded-md p-4">
            <pre className="text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(webhook.headers, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onMarkProcessed(webhook.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Mark as Processed
        </button>
      </div>
    </div>
  )
}
