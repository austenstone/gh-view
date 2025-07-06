import { supabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50')
    const event = searchParams.get('event')
    
    let query = supabase
      .from('webhooks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (event) {
      query = query.eq('event_type', event)
    }

    const { data: webhooks, error } = await query

    if (error) {
      console.error('Error fetching webhooks:', error)
      return Response.json(
        { error: 'Failed to fetch webhooks', success: false },
        { status: 500 }
      )
    }

    return Response.json({ 
      webhooks: webhooks || [],
      total: webhooks?.length || 0,
      success: true
    })
  } catch (error) {
    console.error('Error fetching webhooks:', error)
    return Response.json(
      { error: 'Failed to fetch webhooks', success: false },
      { status: 500 }
    )
  }
}
