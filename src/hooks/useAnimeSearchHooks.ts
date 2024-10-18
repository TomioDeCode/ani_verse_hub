import { useRecoilState } from "recoil";
import {
  animeDataState,
  loadingState,
  errorState,
  currentPageState,
  searchTermState,
} from "@/lib/recoils/atoms";
import { UseAnimeStore } from "@/types/UseAnimeStore";
import { AnimeData } from "@/types/AnimeData";
import { searchAnime } from "@/lib/api";

export const useAnimeStore = (): UseAnimeStore => {
  const [animeData, setAnimeData] = useRecoilState<AnimeData[]>(animeDataState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  const fetchAnimeData = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedData = await searchAnime(searchTerm);

      if (Array.isArray(fetchedData)) {
        setAnimeData(fetchedData);
      } else {
        throw new Error("Data fetched is not of type AnimeData[]");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
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
