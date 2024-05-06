'use client'

import { useState, useEffect } from 'react';
import { fetchAllArtworks } from '@/app/lib/data';
import { addFavorite } from '@/app/lib/actions';
import { Artwork } from '@/app/lib/definitions';
import { HeartIcon } from '@heroicons/react/24/outline';
import { CardsSkeleton } from '../skeletons';

import { useToast } from "@/components/ui/use-toast"


export default function ArtworkCards({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      const artworksData = await fetchAllArtworks(query, currentPage);  
      setArtworks(artworksData);
      setLoading(false);
    };
    fetchArtworks();
  }, [query, currentPage]);

  const { toast } = useToast();

  const handleFavoriteArtwork = async (artObject: Artwork) => {
    try {
      const data = {
        workId: artObject.id,
        userId: '410544b2-4001-4271-9855-fec4b6a6442a',
      };

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      const response = await fetch('/api/favorites', requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataResponse = await response.json();

      if (dataResponse.exists) {
        toast({
          title: "Artwork already in favorites!",
          duration: 2500,
        })
      } else {
        await addFavorite(artObject);
        toast({
          title: "Successfully added",
          description: "Artwork added to favorites successfully!",
          duration: 2000,
        })
      }

    } catch (error) {
      console.error('Error adding artwork to favorites:', error);
    }
  };

  if (loading) {
    return <CardsSkeleton />;
  }

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {artworks.map((artObject: Artwork) => (
        <div
          key={artObject.id}
          className="border border-gray-200 rounded-lg overflow-hidden relative transition duration-300 ease-in-out hover:shadow-lg"
        >
          <div
            className="absolute bottom-1 right-1 cursor-pointer"
            onClick={() => handleFavoriteArtwork(artObject)}
          >
            <HeartIcon className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="relative h-96">
            {artObject.hasImage ? (
              <img
                src={artObject.webImage.url}
                alt={artObject.title}
                className="w-full h-full object-cover object-top"
                width={artObject.webImage.width}
                height={artObject.webImage.height}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                Image not available
              </div>
            )}
          </div>

          <div className="p-4">
            <a href={artObject.links.web} target="_blank" rel="noreferrer">
              <h4 className="block text-blue-600 hover:underline">{artObject.title}</h4>
            </a>
            <p className="text-sm text-gray-600">by {artObject.principalOrFirstMaker}</p>
          </div>

        </div>
      ))}
    </div>
  );
}