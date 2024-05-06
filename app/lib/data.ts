import { sql } from '@vercel/postgres';
import {
  ArtworkCard,
  User,
} from './definitions';



const API_BASE_URL = 'https://www.rijksmuseum.nl/api/nl/collection';
const API_KEY = 'KHn4xrLx';
const ITEMS_PER_PAGE = 10;


export async function fetchAllArtworks(
  query: string,
  currentPage: number,
) {

  try {
    const response = await fetch(`${API_BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&p=${currentPage}&ps=${ITEMS_PER_PAGE}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const dataArt = data.artObjects;

    console.log(dataArt);

    return dataArt;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch art objects.');
  }
}


export async function fetchArtworksPages(query: string) {
  try {
    const response = await fetch(`${API_BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const totalCount = data.count;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch total number of art objects.');
  }
}


const API_BASE_URL_AUTHOR = 'https://www.rijksmuseum.nl/en/search/advanced/terms?field=involvedMaker&q';
export async function fetchAuthorData() {
  try {
    const response = await fetch(`${API_BASE_URL_AUTHOR}=`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log(data)

    return data;

  } catch (error) {
    console.error('Error fetching author data:', error);
    return null;
  }
}


export async function fetchFavoritesArtWorksPages(userId: string) {
  try {
    const count = await sql<{ count: string }>`
      SELECT COUNT(*) AS count
      FROM favorites
      WHERE favorites.user_id = ${userId}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of favorites.');
  }
}


export async function fetchFavoritesArtWorks(
  currentPage: number,
  userId: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  console.log(userId)

  try {
    const favorites = await sql<ArtworkCard>`
      SELECT
        favorites.id,
        favorites.user_id,
        favorites.work_id,
        favorites.has_image,
        favorites.image,
        favorites.image_width,
        favorites.image_height,
        favorites.work_title,
        favorites.work_link,
        favorites.work_author
      FROM favorites
      WHERE favorites.user_id = ${userId}
      ORDER BY favorites.work_title ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    console.log(favorites.rows)
    return favorites.rows;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch favorites.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
