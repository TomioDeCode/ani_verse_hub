import { useRecoilState, useRecoilValue } from "recoil";
import { topAnimeStateAtom } from "@/lib/recoils/atoms";
import {
  topAnimeErrorSelector,
  topAnimeLoadingSelector,
  topAnimeSelector,
} from "@/lib/recoils/selectors";
import { fetchTopAnimeAPI } from "@/lib/api";

export function useTopAnime() {
  const [state, setState] = useRecoilState(topAnimeStateAtom);
  const anime = useRecoilValue(topAnimeSelector);
  const loading = useRecoilValue(topAnimeLoadingSelector);
  const error = useRecoilValue(topAnimeErrorSelector);

  const fetchRecommendedAnime = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchTopAnimeAPI();

      if (!data || data.length === 0) {
        throw new Error("No anime data received");
      }

      setState((prev) => ({
        ...prev,
        topAnimeData: data,
        loading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "An error occurred",
        loading: false,
        topAnimeData: [],
      }));
    }
  };

  return {
    anime,
    loading,
    error,
    fetchRecommendedAnime,
  };
}
