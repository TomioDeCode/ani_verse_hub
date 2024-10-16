"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Title from "../common/Title";
import React, { ReactNode } from "react";

interface CardSwiperProps<T> {
  data: T[];
  renderCard: (item: T) => ReactNode;
  title?: string;
  icon?: ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
  pagination?: boolean;
}

const CardSwiper = <T extends { id: number }>({
  data,
  renderCard,
  title = "Top Items",
  icon,
  slidesPerView = 3,
  spaceBetween = 20,
  pagination = true,
}: CardSwiperProps<T>) => {
  return (
    <div className="bg-accent-foreground p-4 rounded-lg shadow-lg shadow-foreground">
      <div className="flex items-center gap-1">
        {icon && <div className="-mt-5 text-primary">{icon}</div>}
        <Title className="-mt-2 text-primary font-bold uppercase" title={title} />
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation
        pagination={pagination ? { clickable: true } : false}
        className="w-full max-w-xl mx-auto py-8"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            {renderCard(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSwiper;
