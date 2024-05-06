'use server'

import { sql } from '@vercel/postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Artwork } from './definitions';


export async function addFavorite({ id, hasImage, webImage, title, links, principalOrFirstMaker }: Artwork) {

  const user_id = '410544b2-4001-4271-9855-fec4b6a6442a';
  const work_id = id;
  const has_image = hasImage;
  const image = webImage.url;
  const image_width = webImage.width;
  const image_height = webImage.height;
  const work_title = title;
  const work_link = links.web;
  const work_author = principalOrFirstMaker;

  await sql`
    INSERT INTO favorites (user_id, work_id, has_image, image, image_width, image_height, work_title, work_link, work_author  )
    VALUES (${user_id},${work_id},${has_image},${image},${image_width},${image_height},${work_title},${work_link},${work_author})
  `
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}