'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Text, Button, TextInput, FormControl } from '@primer/react'
import { WebhookFilters } from '@/lib/webhook-filters'
import MultiSelectAutocomplete, { AutocompleteItem } from './multi-select-autocomplete'

interface WebhookFilterPanelProps {
  filters: WebhookFilters
  onFiltersChange: (filters: WebhookFilters) => void
}

export default function WebhookFilterPanel({ filters, onFiltersChange }: WebhookFilterPanelProps) {
  const [eventTypeItems, setEventTypeItems] = useState<AutocompleteItem[]>([])
  const [repositoryItems, setRepositoryItems] = useState<AutocompleteItem[]>([])
  const [senderItems, setSenderItems] = useState<AutocompleteItem[]>([])
  const [workflowIdItems, setWorkflowIdItems] = useState<AutocompleteItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true)
        
        // Fetch all filter options in parallel
        const [eventTypes, repositories, senders, workflowIds] = await Promise.all([
          fetch('/api/webhooks/filter-values?field=event_types').then(res => res.json()),
          fetch('/api/webhooks/filter-values?field=repositories').then(res => res.json()),
          fetch('/api/webhooks/filter-values?field=senders').then(res => res.json()),
          fetch('/api/webhooks/filter-values?field=workflow_ids').then(res => res.json())
        ])

        setEventTypeItems(eventTypes.values?.map((value: string) => ({ id: value, text: value })) || [])
        setRepositoryItems(repositories.values?.map((value: string) => ({ id: value, text: value })) || [])
        setSenderItems(senders.values?.map((value: string) => ({ id: value, text: value })) || [])
        setWorkflowIdItems(workflowIds.values?.map((value: string) => ({ id: value, text: value })) || [])
      } catch (error) {
        console.error('Error fetching filter options:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFilterOptions()
  }, [])

  const handleFilterChange = (key: keyof WebhookFilters, value: string[] | string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const handleDateRangeChange = (key: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [key]: value || null
      }
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      eventTypes: [],
      repositories: [],
      senders: [],
      dateRange: {
        start: null,
        end: null
      },
      githubId: undefined,
      workflowId: undefined
    })
  }

  const hasActiveFilters = filters.eventTypes.length > 0 || 
                          filters.repositories.length > 0 || 
                          filters.senders.length > 0 || 
                          filters.dateRange.start || 
                          filters.dateRange.end || 
                          filters.githubId || 
                          filters.workflowId

  if (loading) {
    return (
      <Box p={4} borderWidth="1px" borderStyle="solid" borderColor="border.default" borderRadius={2}>
        <Text>Loading filter options...</Text>
      </Box>
    )
  }

  return (
    <Box p={4} borderWidth="1px" borderStyle="solid" borderColor="border.default" borderRadius={2}>
      <Stack gap="normal">
        <Stack direction="horizontal" justifyContent="space-between" alignItems="center">
          <Text fontSize={16} fontWeight="semibold">
            Filters
          </Text>
          {hasActiveFilters && (
            <Button variant="danger" size="small" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </Stack>

        <Stack gap="condensed">
          {/* Event Types Filter */}
          <MultiSelectAutocomplete
            items={eventTypeItems}
            label="Event Types"
            placeholder="Select event types..."
            defaultSelectedItems={filters.eventTypes.map(type => ({ id: type, text: type }))}
            onSelectionChange={(selected) => handleFilterChange('eventTypes', selected.map(item => item.id))}
          />

          {/* Repositories Filter */}
          <MultiSelectAutocomplete
            items={repositoryItems}
            label="Repositories"
            placeholder="Select repositories..."
            defaultSelectedItems={filters.repositories.map(repo => ({ id: repo, text: repo }))}
            onSelectionChange={(selected) => handleFilterChange('repositories', selected.map(item => item.id))}
          />

          {/* Senders Filter */}
          <MultiSelectAutocomplete
            items={senderItems}
            label="Senders"
            placeholder="Select senders..."
            defaultSelectedItems={filters.senders.map(sender => ({ id: sender, text: sender }))}
            onSelectionChange={(selected) => handleFilterChange('senders', selected.map(item => item.id))}
          />

              <FormControl>
                <FormControl.Label>Start Date</FormControl.Label>
                <TextInput
                  type="datetime-local"
                  value={filters.dateRange.start || ''}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>End Date</FormControl.Label>
                <TextInput
                  type="datetime-local"
                  value={filters.dateRange.end || ''}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                />
              </FormControl>

          {/* GitHub ID Filter */}
          <FormControl>
            <FormControl.Label>GitHub ID</FormControl.Label>
            <TextInput
              placeholder="Search by GitHub ID..."
              value={filters.githubId || ''}
              onChange={(e) => handleFilterChange('githubId', e.target.value || undefined)}
            />
          </FormControl>

          {/* Workflow ID Filter */}
          <MultiSelectAutocomplete
            items={workflowIdItems}
            label="Workflow IDs"
            placeholder="Select workflow IDs..."
            defaultSelectedItems={filters.workflowId ? [{ id: filters.workflowId, text: filters.workflowId }] : []}
            onSelectionChange={(selected) => handleFilterChange('workflowId', selected.length > 0 ? selected[0].id : undefined)}
            maxItems={1}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
