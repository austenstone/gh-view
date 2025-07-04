import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const githubEvent = req.headers['x-github-event'];
    const githubDelivery = req.headers['x-github-delivery'];
    const body = req.body;

    console.log('GitHub Event:', githubEvent);
    console.log('GitHub Delivery ID:', githubDelivery);
    console.log('Request Body:', body);

    res.status(200).json({ message: 'Webhook received successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
