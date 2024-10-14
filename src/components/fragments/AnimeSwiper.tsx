"use client";

import { IoStarSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AnimeCard from "@/components/core/AnimeCard";
import Title from "../common/Title";
import React from "react";

interface AnimeSwiperProps {
  animeData: {
    id: number;
    title: string;
    imageUrl: string;
  }[];
}

const AnimeSwiper = ({ animeData }: AnimeSwiperProps) => {
  return (
    <div className="bg-accent-foreground p-4 rounded-lg shadow-lg shadow-foreground">
      <div className="flex items-center gap-1">
        <IoStarSharp className="-mt-4 text-primary w-5 h-5" />
        <Title
          className="-mt-2 text-primary font-bold uppercase"
          title="Top Anime"
        />
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="w-full max-w-xl mx-auto py-8"
      >
        {animeData.map(({ id, title, imageUrl }) => (
          <SwiperSlide key={id}>
            <AnimeCard
              imageClassName="h-[300px]"
              contentClassName="h-[200px]"
              anime={{ id, title, imageUrl }}
              altText={`Anime cover for ${title}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AnimeSwiper;
