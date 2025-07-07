export interface WebhookFilters {
  eventTypes: string[]
  repositories: string[]
  senders: string[]
  dateRange: {
    start: string | null
    end: string | null
  }
  githubId?: string
  workflowId?: string
}

export const defaultFilters: WebhookFilters = {
  eventTypes: [],
  repositories: [],
  senders: [],
  dateRange: {
    start: null,
    end: null
  },
  githubId: undefined,
  workflowId: undefined
}

export function buildSupabaseFilter(filters: WebhookFilters) {
  const conditions: string[] = []
  const params: (string | number)[] = []
  let paramIndex = 1

  // Event types filter
  if (filters.eventTypes.length > 0) {
    conditions.push(`event_type IN (${filters.eventTypes.map(() => `$${paramIndex++}`).join(',')})`)
    params.push(...filters.eventTypes)
  }

  // Repositories filter
  if (filters.repositories.length > 0) {
    conditions.push(`repository IN (${filters.repositories.map(() => `$${paramIndex++}`).join(',')})`)
    params.push(...filters.repositories)
  }

  // Senders filter
  if (filters.senders.length > 0) {
    conditions.push(`sender IN (${filters.senders.map(() => `$${paramIndex++}`).join(',')})`)
    params.push(...filters.senders)
  }

  // Date range filter
  if (filters.dateRange.start) {
    conditions.push(`created_at >= $${paramIndex++}`)
    params.push(filters.dateRange.start)
  }

  if (filters.dateRange.end) {
    conditions.push(`created_at <= $${paramIndex++}`)
    params.push(filters.dateRange.end)
  }

  // GitHub ID filter
  if (filters.githubId) {
    conditions.push(`github_id ILIKE $${paramIndex++}`)
    params.push(`%${filters.githubId}%`)
  }

  // Workflow ID filter (from payload)
  if (filters.workflowId) {
    conditions.push(`payload->>'workflow_id' = $${paramIndex++}`)
    params.push(filters.workflowId)
  }

  return {
    whereClause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    params
  }
}
