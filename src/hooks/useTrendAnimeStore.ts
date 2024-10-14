import { useRecoilState, useRecoilValue } from "recoil";
import {
  trendStateAtom,
  trendAnimeSelector,
  trendLoadingSelector,
  trendErrorSelector,
  fetchTrendAnime,
} from "@/store/useAnimeTrendStore";

export function useTrendAnimeStore() {
  const [trendState, setTrendState] = useRecoilState(trendStateAtom);
  const animeData = useRecoilValue(trendAnimeSelector);
  const loading = useRecoilValue(trendLoadingSelector);
  const error = useRecoilValue(trendErrorSelector);

  const fetchRecommendedAnime = async () => {
    await fetchTrendAnime(setTrendState);
  };

  return {
    animeData,
    loading,
    error,
    fetchRecommendedAnime,
  };
}
