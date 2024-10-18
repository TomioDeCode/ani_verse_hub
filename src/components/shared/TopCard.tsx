import Title from "../common/Title";
import React from "react";
import { FaCrown } from "react-icons/fa";
import Icon from "../common/Icon";
import Image from "next/image";
import { Button } from "../ui/button";
import { AnimeData } from "@/types/AnimeData";

interface TopCardProps {
  animeData?: AnimeData[];
}

const TopCard = ({ animeData }: TopCardProps) => {
  const limitTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  return (
    <div className="px-4">
      <div className="mt-5 flex flex-col space-y-5 px-4 py-6 bg-gray-800 text-white h-[79vh] rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <Icon className="flex items-center gap-1.5 -my-8">
            <FaCrown className="text-primary" />
            <Title
              className="text-primary mt-2.5 font-bold uppercase"
              title="Top Anime"
            />
          </Icon>
        </div>
        <div className="space-y-5 overflow-auto">
          {animeData && animeData.length > 0 ? (
            animeData.map((anime) => (
              <div
                key={anime.id}
                className="flex items-center space-x-4 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300 max-w-md mx-auto"
              >
                <div className="w-[85px] h-[135px] transform transition-transform hover:scale-105">
                  <Image
                    src={anime.imageUrl}
                    alt={`Image of ${anime.title}`}
                    width={85}
                    height={150}
                    className="object-cover rounded-lg w-[85px] h-[135px]"
                  />
                </div>
                <div className="flex flex-col text-sm space-y-1">
                  <h3 className="font-semibold text-md">
                    {limitTitle(anime.title, 15)}{" "}
                  </h3>
                  <span className="text-yellow-400 font-semibold">
                    Rating: {anime.score}
                  </span>
                  <span className="text-gray-400">
                    {anime.genres
                      ?.slice(0, 2)
                      .map((genre) => genre.name)
                      .join(", ") || "N/A"}{" "}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No anime data available</div>
          )}
        </div>
        <div className="flex justify-center mt-auto">
          <Button className="bg-primary text-secondary px-6 py-2 rounded-md w-full shadow-md transition-all duration-300">
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
