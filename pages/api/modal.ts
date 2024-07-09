import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handleGetRequest(
  req: NextApiRequest, 
  res: NextApiResponse
) {

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await sql`
      SELECT id, image, button_text, button_url, status FROM popup
    `;

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error handling GET request:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
