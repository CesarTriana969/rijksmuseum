
import { lusitana } from '@/app/ui/fonts';
import Cards from '@/app/ui/favorites/cards';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFavoritesArtWorksPages } from '@/app/lib/data';
import Pagination from '@/app/ui/artworks/pagination';


export default async function FavoritesPage({
  searchParams
}: {
  searchParams ?: {
    page?: string
  }
}) {

  const currentPage = Number(searchParams?.page) || 1;

  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

  const totalPages = await fetchFavoritesArtWorksPages(userId);

  return (
    <div className="w-full">

      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Favorites</h1>
      </div>

       <Suspense key={currentPage} fallback={<CardsSkeleton />}>
        <Cards currentPage={currentPage}/>
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}