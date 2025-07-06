'use client'

import { WebhookRow } from '@/lib/supabase'
import { WebhookStats as WebhookStatsType } from '@/lib/webhook-realtime'

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
    <div className="mb-6">      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Webhooks */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Webhooks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">📡</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Hour</p>
              <p className="text-2xl font-bold text-gray-900">{stats.recentCount}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-bold">⚡</span>
            </div>
          </div>
        </div>

        {/* Most Active Event */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Most Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {getTopEvents()[0]?.[1] || 0}
              </p>
              <p className="text-xs text-gray-500">
                {getTopEvents()[0]?.[0] || 'N/A'}
              </p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">🔥</span>
            </div>
          </div>
        </div>

        {/* Event Types */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Event Types</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.keys(stats.events).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-sm font-bold">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Events and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Events */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Events</h3>
          <div className="space-y-2">
            {getTopEvents().map(([event, count]) => (
              <div key={event} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{event}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
            {getTopEvents().length === 0 && (
              <p className="text-gray-500 text-sm">No events yet</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {getRecentActivity().map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="text-sm text-gray-600">{item.event_type}</span>
                  {item.repository && (
                    <span className="text-xs text-gray-500 ml-2">
                      {item.repository}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleTimeString()}
                </span>
              </div>
            ))}
            {getRecentActivity().length === 0 && (
              <p className="text-gray-500 text-sm">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
