import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";


export default function CarouselComponent() {
  const images = [
    {
      src: "/slide/landscape-with-stone-bridge-remb.jpg",
      alt: "img by rijksmuseum",
    },
    {
      src: "/slide/rising-sun-monet.jpg",
      alt: "img by rijksmuseum",
    },
    {
      src: "/slide/starry_night.jpg",
      alt: "img by rijksmuseum",
    },
    {
      src: "/slide/starry-night-over-the-rhone-by-v.jpg",
      alt: "img by rijksmuseum",
    },
  ];

  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image
                src={image.src}
                alt='img by rijksmuseum' 
                width={472}
                height={354}
                className="block"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}