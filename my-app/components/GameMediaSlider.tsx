'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

type MediaItem = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

type GameMediaSliderProps = {
  media: MediaItem[];
}

export default function GameMediaSlider({ media }: GameMediaSliderProps) {
  // Move hook call to top level and ensure it's not conditional
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps'
  })

  // Define handlers using useCallback to memoize them
  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {media.map((item, index) => (
            <div 
              className="flex-[0_0_100%] min-w-0 relative aspect-video" 
              key={index}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt || ''}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-full object-cover rounded-lg"
                  controls
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={scrollPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={scrollNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

