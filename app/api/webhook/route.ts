import { supabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'
import { nanoid } from 'nanoid'
// import { App } from 'octokit';

// const app = new App({
//   appId,
//   privateKey,
//   webhooks: { secret },
// });

export async function POST(req: NextRequest) {
  // const webhook = await app.webhooks.verifyAndReceive({
  //   id: request.headers["x-github-delivery"],
  //   name: request.headers["x-github-event"],
  //   signature: request.headers["x-hub-signature-256"],
  //   payload: request.body,
  // });
  const githubEvent = req.headers.get('x-github-event')
  const githubDelivery = req.headers.get('x-github-delivery')
  let body = {} as any;

  try {
    body = await req.json()
  } catch (e) {
    console.error('Error parsing request body', e)
  }

  console.log({ githubEvent, githubDelivery })

  try {
    const repository = body?.repository?.full_name || null
    const sender = body?.sender?.login || null

    const headerEntries = Array.from(req.headers.entries())
    const headersRecord = Object.fromEntries(headerEntries)

    const { data, error } = await supabase
      .from('webhooks')
      .insert([
        {
          github_id: githubDelivery || nanoid(),
          event_type: githubEvent || 'unknown',
          repository,
          sender,
          payload: body || {},
          headers: headersRecord
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error storing webhook:', error)
      return Response.json({
        message: 'Failed to store webhook',
        error: error.message
      }, { status: 500 })
    }

    return Response.json({
      message: 'Webhook received successfully',
      webhookId: data.id
    }, { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return Response.json({
      message: 'Failed to process webhook',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
