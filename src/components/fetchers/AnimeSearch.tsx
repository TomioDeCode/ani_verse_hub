"use client";

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Button } from "../ui/button";
import { AnimeData } from "@/types/AnimeData";
import { Pagination } from "@/components/core/Pagination";
import { SearchInput } from "@/components/fragments/SearchInput";
import AnimeCard from "@/components/core/AnimeCard";
import { fetchAnimeData } from "@/util/api";
import {
  animeDataState,
  currentPageState,
  debouncedSearchState,
  globalErrorState,
  globalLoadingState,
  searchTermState,
} from "@/store/atoms/atoms";

const ITEMS_PER_PAGE = 12;

const AnimeSearch = () => {
  const [animeData, setAnimeData] = useRecoilState<AnimeData[]>(animeDataState);
  const [loading, setLoading] = useRecoilState<boolean>(globalLoadingState);
  const [error, setError] = useRecoilState<string | null>(globalErrorState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [debouncedSearch, setDebouncedSearch] = useRecoilState(debouncedSearchState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAnimeData("&min_score=8&rating=pg13");
        setAnimeData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    initialFetch();
  }, []);

  useEffect(() => {
    const getAnimeData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAnimeData(debouncedSearch);
        setAnimeData(data);
        setCurrentPage(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    if (debouncedSearch) {
      getAnimeData();
    } else {
      setAnimeData([]);
    }
  }, [debouncedSearch]);

  const totalPages = Math.max(1, Math.ceil(animeData.length / ITEMS_PER_PAGE));
  const currentData = animeData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
        <p className="text-lg">{error}</p>
        <Button onClick={() => fetchAnimeData(searchTerm)} className="mt-2">
          Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-5">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          loading={loading}
        />
      </div>

      {loading ? (
        <div className="text-white text-center p-8">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
          {currentData.map((item) => (
            <AnimeCard
              key={item.id}
              anime={item}
              contentClassName=""
              imageClassName="w-[150px] h-[250px]"
              className="w-[150px] h-[250px]"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeSearch;
