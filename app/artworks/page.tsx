import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/artworks/search';
import Select from '@/app/ui/artworks/select';
import Pagination from '@/app/ui/artworks/pagination';
import Cards from '@/app/ui/artworks/cards';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchArtworksPages } from '@/app/lib/data';



export default async function InvoicesPage({
  searchParams
}: {
  searchParams ?: {
    query?:string
    page?: string
  }
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchArtworksPages(query);

  return (
    <div className="w-full">

      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Artworks</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 ">
        <Search placeholder="Search invoices..." />

        <div className='w-80'>
          <Select placeholder="Select Authors..."  />
        </div>
      </div>

       <Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
        <Cards query={query} currentPage={currentPage}/>
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}