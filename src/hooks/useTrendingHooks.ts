import { useRecoilState, useRecoilValue } from "recoil";
import {
  trendingErrorSelector,
  trendingLoadingSelector,
  trendingSelector,
  trendingStateAtom,
  fetchTrending,
} from "@/store/useTrendingStore";

export function useTrendingStore() {
  const [trendState, setTrendState] = useRecoilState(trendingStateAtom);
  const animeData = useRecoilValue(trendingSelector);
  const loading = useRecoilValue(trendingLoadingSelector);
  const error = useRecoilValue(trendingErrorSelector);

  const fetchTrendings = async () => {
    await fetchTrending(setTrendState);
  };

  return {
    animeData,
    loading,
    error,
    fetchTrendings,
    trendState,
  };
}
