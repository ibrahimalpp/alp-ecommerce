"use client";

import Autoplay from "embla-carousel-autoplay";
import React from 'react';
import { APIURL, SliderItem } from '@/app/constans';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

interface HeroProps {
  slider: SliderItem[];
}

const Hero = ({ slider }: HeroProps) => {
  return (
    <div className="mt-6 flex px-4 lg:px-32 xl:px-64">

      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000, // 4 saniyede bir geç
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slider.map((slide, index) => (
            <CarouselItem
              key={index}
              className="md:basis-full lg:basis-full h-[400px]"
            >
              <div className="w-full h-full relative">
                <Image
                  alt={slide.title}
                  src={`${APIURL}/assets/${slide.image}`}
                  fill
                  className="rounded-xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1170px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Hero;
