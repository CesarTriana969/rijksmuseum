import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

interface FetchIsFavoriteArtWorkExistResponse {
  exists: boolean;
  error?: string;
}

export default async function fetchIsFavoriteArtWorkExist(
  req: NextApiRequest,
  res: NextApiResponse<FetchIsFavoriteArtWorkExistResponse>
) {
  const { workId, userId } = req.body;

  if (!workId || !userId) {
    return res.status(400).json({ exists: false });
  }

  try {
    const result = await sql`SELECT * FROM favorites WHERE user_id = ${userId} AND work_id = ${workId}`;
    const exists = result.rows.length > 0;

    return res.json({ exists });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ exists: false, error: 'error' });
  }
}