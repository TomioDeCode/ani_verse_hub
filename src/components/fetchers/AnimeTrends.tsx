"use client";

import { useTrendAnimeStore } from "@/hooks/useTrendAnimeHooks";
import AnimeSwiper from "@/components/fragments/AnimeSwiper";
import AnimeCard from "@/components/core/AnimeCard";
import { IoMdStar } from "react-icons/io";
import React, { useEffect } from "react";

const AnimeTrends = () => {
  const { animeData, loading, error, fetchRecommendedAnime } =
    useTrendAnimeStore();

  useEffect(() => {
    fetchRecommendedAnime();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AnimeSwiper
      data={animeData}
      title="Trends Anime"
      icon={<IoMdStar size={25} />}
      renderCard={({ id, title, imageUrl }) => (
        <AnimeCard
          imageClassName="h-[250px]"
          contentClassName="h-[200px]"
          anime={{ id, title, imageUrl }}
          altText={`Anime cover for ${title}`}
        />
      )}
    />
  );
};

export default AnimeTrends;
