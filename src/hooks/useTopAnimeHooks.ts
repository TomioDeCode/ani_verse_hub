import { useRecoilState, useRecoilValue } from "recoil";
import {
  topAnimeErrorSelector,
  topAnimeLoadingSelector,
  topAnimeSelector,
  topAnimeStateAtom,
  fetchTopAnime,
} from "@/store/useAnimeTopStore";

export function useTopAnimeStore() {
  const [trendState, setTrendState] = useRecoilState(topAnimeStateAtom);
  const animeData = useRecoilValue(topAnimeSelector);
  const loading = useRecoilValue(topAnimeLoadingSelector);
  const error = useRecoilValue(topAnimeErrorSelector);

  const fetchRecommendedAnime = async () => {
    await fetchTopAnime(setTrendState);
  };

  return {
    animeData,
    loading,
    error,
    fetchRecommendedAnime,
    trendState,
  };
}
