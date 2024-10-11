import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface AnimeCardProps {
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  anime: {
    id: string;
    title: string;
    imageUrl: string;
  };
  altText?: string;
}

const AnimeCard = ({
  anime,
  className,
  imageClassName,
  contentClassName,
}: AnimeCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div
      className={`relative bg-gray-800 text-white rounded-lg shadow-md overflow-hidden group ${className}`}
    >
      <Image
        src={anime.imageUrl}
        alt={anime.title}
        width={1000}
        height={1000}
        className={`w-full object-cover rounded-lg ${imageClassName}`}
      />
      <div
        className={`absolute inset-0 flex justify-center gap-36 items-center p-3 bg-gray-900 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${contentClassName}`}
      >
        <h2 className="text-base font-semibold">
          {truncateText(anime.title, 20)}
        </h2>
        <Button className="h-8 rounded-sm bg-primary text-white text-xs font-bold">
          Add
        </Button>
      </div>
    </div>
  );
};

export default AnimeCard;
