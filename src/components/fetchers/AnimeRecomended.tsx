"use client";

import { useRecomendedAnimeStore } from "@/hooks/useRecomendedAnimeHooks";
import AnimeSwiper from "@/components/fragments/AnimeSwiper";
import AnimeCard from "@/components/core/AnimeCard";
import { IoIosHeart } from "react-icons/io";
import React, { useEffect } from "react";

const AnimeRecomended = () => {
  const { animeData, loading, error, fetchRecommendedAnime } =
    useRecomendedAnimeStore();

  useEffect(() => {
    fetchRecommendedAnime();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AnimeSwiper
      data={animeData}
      title="Recomended Anime"
      icon={<IoIosHeart size={18} className="mt-1" />}
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

export default AnimeRecomended;
