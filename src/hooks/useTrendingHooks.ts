import { useRecoilState, useRecoilValue } from "recoil";
import { trendingStateAtom } from "@/lib/recoils/atoms";
import {
  trendingErrorSelector,
  trendingLoadingSelector,
  trendingSelector,
} from "@/lib/recoils/selectors";
import { fetchTrendingAPI } from "@/lib/api";

export function useTopAnime() {
  const [state, setState] = useRecoilState(trendingStateAtom);
  const anime = useRecoilValue(trendingSelector);
  const loading = useRecoilValue(trendingLoadingSelector);
  const error = useRecoilValue(trendingErrorSelector);

  const fetchTrending = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchTrendingAPI();

      if (!data || data.length === 0) {
        throw new Error("No anime data received");
      }

      setState((prev) => ({
        ...prev,
        trendingData: data,
        loading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "An error occurred",
        loading: false,
        trendingData: [],
      }));
    }
  };

  return {
    anime,
    loading,
    error,
    fetchTrending,
  };
}
