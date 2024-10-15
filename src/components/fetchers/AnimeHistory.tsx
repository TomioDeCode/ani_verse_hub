"use client";

import { useHistoryAnimeStore } from "@/hooks/useHistoryAnimeHooks";
import AnimeSwiper from "@/components/fragments/AnimeSwiper";
import AnimeCard from "@/components/core/AnimeCard";
import React, { useEffect } from "react";
import { BsClock } from "react-icons/bs";

const AnimeHistory = () => {
  const { animeData, loading, error, fetchRecommendedAnime } =
    useHistoryAnimeStore();

  useEffect(() => {
    fetchRecommendedAnime();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AnimeSwiper
      data={animeData}
      title="History Anime"
      icon={<BsClock size={17} className="mt-1" />}
      renderCard={({ id, title, imageUrl }) => (
        <AnimeCard
          imageClassName="h-[180px]"
          contentClassName="h-[300px]"
          anime={{ id, title, imageUrl }}
          altText={`Anime cover for ${title}`}
        />
      )}
    />
  );
};

export default AnimeHistory;
