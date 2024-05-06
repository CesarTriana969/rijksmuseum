import { fetchFavoritesArtWorks } from '@/app/lib/data';
import { ArtworkCard } from '@/app/lib/definitions';

export default async function FavoritesArtWorks({
  currentPage,
}: {
  currentPage: number;
}) {

  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

  console.log(currentPage);

  const artworks = await fetchFavoritesArtWorks(currentPage, userId);

  console.log(artworks)

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {artworks.map((artObject: ArtworkCard) => (
        <div
          key={artObject.id}
          className="border border-gray-200 rounded-lg overflow-hidden relative"
        >

          <div className="relative h-96">
            {artObject.has_image ? (
              <img
                src={artObject.image}
                alt={artObject.work_title}
                className="w-full h-full object-cover object-top"
                width={artObject.image_width}
                height={artObject.image_height}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          <div className="p-4">
            <a href={artObject.work_link} target="_blank" rel="noreferrer">
              <h4 className="block text-blue-600 hover:underline">{artObject.work_title}</h4>
            </a>
            <p className="text-sm text-gray-600">by {artObject.work_author}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
