import { useRecoilState } from "recoil";
import {
  animeDataState,
  globalLoadingState,
  globalErrorState,
  currentPageState,
  searchTermState,
} from "@/store/atoms/atoms";
import { UseAnimeStore } from "@/types/UseAnimeStore";
import { AnimeData } from "@/types/AnimeData";
import { searchAnime } from "@/util/api";

export const useAnimeStore = (): UseAnimeStore => {
  const [animeData, setAnimeData] = useRecoilState<AnimeData[]>(animeDataState);
  const [loading, setLoading] = useRecoilState(globalLoadingState);
  const [error, setError] = useRecoilState(globalErrorState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  const fetchAnimeData = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedData = await searchAnime(searchTerm);

      if (
        Array.isArray(fetchedData) &&
        fetchedData.every((item) => typeof item === "object")
      ) {
        setAnimeData(fetchedData);
      } else {
        throw new Error("Invalid data format. Expected an array of AnimeData.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    animeData,
    loading,
    error,
    currentPage,
    searchTerm,
    fetchAnimeData,
    setAnimeData,
    setLoading,
    setError,
    setCurrentPage,
    setSearchTerm,
  };
};
