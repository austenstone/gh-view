import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const field = searchParams.get('field')

    if (!field) {
      return NextResponse.json({ error: 'Field parameter is required' }, { status: 400 })
    }

    let distinctValues: string[] = []

    switch (field) {
      case 'event_types': {
        const { data, error } = await supabase
          .from('webhooks')
          .select('event_type')
          .not('event_type', 'is', null)

        if (error) {
          console.error('Error fetching event types:', error)
          return NextResponse.json({ error: 'Failed to fetch event types' }, { status: 500 })
        }

        distinctValues = [...new Set(data?.map(item => item.event_type).filter(Boolean) || [])]
        break
      }
      case 'repositories': {
        const { data, error } = await supabase
          .from('webhooks')
          .select('repository')
          .not('repository', 'is', null)

        if (error) {
          console.error('Error fetching repositories:', error)
          return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 })
        }

        distinctValues = [...new Set(data?.map(item => item.repository).filter(Boolean) || [])]
        break
      }
      case 'senders': {
        const { data, error } = await supabase
          .from('webhooks')
          .select('sender')
          .not('sender', 'is', null)

        if (error) {
          console.error('Error fetching senders:', error)
          return NextResponse.json({ error: 'Failed to fetch senders' }, { status: 500 })
        }

        distinctValues = [...new Set(data?.map(item => item.sender).filter(Boolean) || [])]
        break
      }
      case 'workflow_ids': {
        const { data, error } = await supabase
          .from('webhooks')
          .select('payload')
          .not('payload->workflow_id', 'is', null)

        if (error) {
          console.error('Error fetching workflow IDs:', error)
          return NextResponse.json({ error: 'Failed to fetch workflow IDs' }, { status: 500 })
        }

        distinctValues = [...new Set(data?.map(item => {
          const payload = item.payload as Record<string, unknown>
          return payload?.workflow_id as string
        }).filter(Boolean) || [])]
        break
      }
      default:
        return NextResponse.json({ error: 'Invalid field parameter' }, { status: 400 })
    }

    return NextResponse.json({ values: distinctValues.sort() })
  } catch (error) {
    console.error('Error in filter values API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
