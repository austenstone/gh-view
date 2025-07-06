import { supabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: webhook, error } = await supabase
      .from('webhooks')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching webhook:', error)
      return Response.json(
        { error: 'Webhook not found', success: false },
        { status: 404 }
      )
    }

    return Response.json({ 
      webhook,
      success: true
    })
  } catch (error) {
    console.error('Error fetching webhook:', error)
    return Response.json(
      { error: 'Failed to fetch webhook', success: false },
      { status: 500 }
    )
  }
}
