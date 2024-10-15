import { useRecoilState, useRecoilValue } from "recoil";
import {
  historyAnimeSelector,
  historyErrorSelector,
  historyLoadingSelector,
  historyStateAtom,
  fetchHistoryAnime,
} from "@/store/useAnimeHistoryStore";

export function useHistoryAnimeStore() {
  const [trendState, setTrendState] = useRecoilState(historyStateAtom);
  const animeData = useRecoilValue(historyAnimeSelector);
  const loading = useRecoilValue(historyLoadingSelector);
  const error = useRecoilValue(historyErrorSelector);

  const fetchRecommendedAnime = async () => {
    await fetchHistoryAnime(setTrendState);
  };

  return {
    animeData,
    loading,
    error,
    fetchRecommendedAnime,
    trendState,
  };
}
