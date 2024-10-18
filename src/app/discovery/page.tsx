"use client";

import DiscoveryTemplate from "@/components/template/discovery/discovery.template";

import { useEffect } from "react";
import { useAnimeStore } from "@/hooks/useAnimeSearchHooks";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  const {
    animeData,
    loading,
    error,
    currentPage,
    searchTerm,
    fetchAnimeData,
    setCurrentPage,
    setSearchTerm,
  } = useAnimeStore();

  useEffect(() => {
    fetchAnimeData();
  }, [currentPage, searchTerm]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Anime List</h1>
      <div>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search anime"
        />
        <button onClick={fetchAnimeData}>Search</button>
      </div>
      <ul>
        {animeData && animeData.length > 0 ? (
          animeData.map((anime: any) => (
            <li key={anime.id}>
              <h2>{anime.title}</h2>
              <p>{anime.synopsis}</p>
            </li>
          ))
        ) : (
          <p>No anime found.</p>
        )}
      </ul>
      <div>
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous Page
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default HomePage;
