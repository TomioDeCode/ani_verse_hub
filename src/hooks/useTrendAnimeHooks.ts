import { useRecoilState, useRecoilValue } from "recoil";
import {
  trendAnimeErrorSelector,
  trendAnimeLoadingSelector,
  trendAnimeSelector,
  trendAnimeStateAtom,
  fetchTrendAnime,
} from "@/store/useAnimeTrendStore";

export function useTrendAnimeStore() {
  const [trendState, setTrendState] = useRecoilState(trendAnimeStateAtom);
  const animeData = useRecoilValue(trendAnimeSelector);
  const loading = useRecoilValue(trendAnimeLoadingSelector);
  const error = useRecoilValue(trendAnimeErrorSelector);

  const fetchRecommendedAnime = async () => {
    await fetchTrendAnime(setTrendState);
  };

  return {
    animeData,
    loading,
    error,
    fetchRecommendedAnime,
    trendState,
  };
}

