import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  animeDataState,
  loadingState,
  errorState,
  currentPageState,
  searchTermState,
} from "@/lib/recoils/atoms";
import { fetchAnimeSelector } from "@/lib/recoils/selectors";
import { UseAnimeStore } from "@/types/UseAnimeStore";

export const useAnimeStore = (): UseAnimeStore => {
  const [animeData, setAnimeData] = useRecoilState(animeDataState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  const animeLoadable = useRecoilValueLoadable(fetchAnimeSelector);

  const fetchAnimeData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (animeLoadable.state === "hasValue") {
        setAnimeData(animeLoadable.contents);
      } else if (animeLoadable.state === "hasError") {
        setError(
          animeLoadable.contents instanceof Error
            ? animeLoadable.contents.message
            : "An error occurred."
        );
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
