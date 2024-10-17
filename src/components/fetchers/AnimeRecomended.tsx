"use client";

import { useRecommendedAnime } from "@/hooks/useRecommendedAnime";
import AnimeSwiper from "@/components/fragments/AnimeSwiper";
import AnimeCard from "@/components/core/AnimeCard";
import { IoIosHeart } from "react-icons/io";
import React, { useEffect } from "react";

const AnimeRecommended = () => {
  const { animeData, loading, error, fetchRecommendedAnime } =
    useRecommendedAnime();

  useEffect(() => {
    console.log("Component mounted");
    fetchRecommendedAnime();
  }, []);

  if (loading) {
    return <div className="p-4">Loading anime recommendations...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="anime-recommended-container">
      {animeData ? (
        <AnimeSwiper
          data={animeData}
          title="Recommended Anime"
          icon={<IoIosHeart size={18} className="mt-1" />}
          renderCard={(anime) => (
            <AnimeCard
              key={anime.id}
              imageClassName="h-[250px]"
              contentClassName="h-[200px]"
              anime={anime}
              altText={`Anime cover for ${anime.title}`}
            />
          )}
        />
      ) : (
        <div>Data tidak tersedia</div>
      )}
    </div>
  );
};

export default AnimeRecommended;
