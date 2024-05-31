import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

interface ClickRequestBody {
  phone_number: string;
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

    const requestBody: ClickRequestBody = req.body;

    if (!requestBody.phone_number) {
      return res.status(400).json({ error: 'Field phone_number is required in the request body.' });
    }

    await sql`
      INSERT INTO clicks_call (phone_number)
      VALUES (${requestBody.phone_number})
    `;

    return res.status(200).json({ message: 'Click registered successfully.' });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
