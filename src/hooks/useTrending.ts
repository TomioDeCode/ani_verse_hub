import { useRecoilState, useRecoilValue } from "recoil";
import { trendingStateAtom } from "@/store/atoms/atoms";
import {
  trendingErrorSelector,
  trendingLoadingSelector,
  trendingSelector,
} from "@/store/selectors/selectors";
import { fetchTrendingAPI } from "@/util/api";

export function useTrendingAnime() {
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

      setState((prev) => ({
        ...prev,
        data: data || [],
        loading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error:
          err instanceof Error ? err.message : "An unexpected error occurred",
        loading: false,
        data: [],
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
