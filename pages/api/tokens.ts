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
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    if (req.headers['content-type'] !== 'application/json') {
      return res.status(400).json({ error: 'Content-Type debe ser application/json' });
    }

    const requestBody: TokenRequestBody = req.body;

    if (!requestBody.unq_id) {
      return res.status(400).json({ error: 'Campo unq_id requerido en el cuerpo de la solicitud.' });
    }

    await sql`
      INSERT INTO tokens (unq_id)
      VALUES (${requestBody.unq_id})
    `;

    return res.status(200).json({ message: 'Token almacenado exitosamente.' });
  } catch (error) {
    console.error('Error al manejar la solicitud POST:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
