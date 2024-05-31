import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

interface TokenRequestBody {
  unq_id: string;
}

export default async function handlePostRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (req.headers['content-type'] !== 'application/json') {
      return res.status(400).json({ error: 'Content-Type must be application/json' });
    }

    const requestBody: TokenRequestBody = req.body;

    if (!requestBody.unq_id) {
      return res.status(400).json({ error: 'Field unq_id is required in the request body.' });
    }

    await sql`
      INSERT INTO tokens (unq_id)
      VALUES (${requestBody.unq_id})
    `;

    return res.status(200).json({ message: 'Token stored successfully.' });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
