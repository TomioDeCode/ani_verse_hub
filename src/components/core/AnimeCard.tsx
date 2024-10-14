import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface AnimeCardProps {
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  anime: {
    id: number;
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
      className={`relative bg-gray-800 text-secondary rounded-lg shadow-md overflow-hidden group hover:scale-110 transition-all ${className}`}
    >
      <Image
        src={anime.imageUrl}
        alt={anime.title}
        width={1000}
        height={1000}
        className={`w-full object-cover rounded-lg ${imageClassName}`}
      />
      <div
        className={`absolute space-y-3 inset-0 flex flex-col justify-center h-full items-center p-3 bg-gray-900 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${contentClassName}`}
      >
        <h2 className="text-base font-semibold text-center">
          {truncateText(anime.title, 50)}
        </h2>
        <Button className="h-8 rounded-sm bg-primary text-secondary text-xs font-bold">
          Add
        </Button>
      </div>
    </div>
  );
};

export default AnimeCard;
