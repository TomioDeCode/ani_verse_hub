import { useRecoilState, useRecoilValue } from "recoil";
import { recomendedStateAtom } from "@/lib/recoils/atoms";
import {
  recomendedAnimeSelector,
  recomendedErrorSelector,
  recomendedLoadingSelector,
} from "@/lib/recoils/selectors";
import { fetchRecommendedAnimeAPI } from "@/lib/api";

export function useRecommendedAnime() {
  const [state, setState] = useRecoilState(recomendedStateAtom);
  const animeData = useRecoilValue(recomendedAnimeSelector);
  const loading = useRecoilValue(recomendedLoadingSelector);
  const error = useRecoilValue(recomendedErrorSelector);

  const fetchRecommendedAnime = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchRecommendedAnimeAPI();

      if (!data || data.length === 0) {
        throw new Error("No anime data received");
      }

      setState((prev) => ({
        ...prev,
        animeData: data,
        loading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "An error occurred",
        loading: false,
        animeData: [],
      }));
    }
  };

  return {
    animeData,
    loading,
    error,
    fetchRecommendedAnime,
  };
}
