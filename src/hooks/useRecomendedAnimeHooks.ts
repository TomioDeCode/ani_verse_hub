import { useRecoilState, useRecoilValue } from "recoil";
import {
  recomendedStateAtom,
  recomendedAnimeSelector,
  recomendedErrorSelector,
  recomendedLoadingSelector,
  fetchRecomendedAnime,
} from "@/store/useAnimeRecomendedStore";

export function useRecomendedAnimeStore() {
  const [trendState, setTrendState] = useRecoilState(recomendedStateAtom);
  const animeData = useRecoilValue(recomendedAnimeSelector);
  const loading = useRecoilValue(recomendedLoadingSelector);
  const error = useRecoilValue(recomendedErrorSelector);

  const fetchRecommendedAnime = async () => {
    await fetchRecomendedAnime(setTrendState, trendState);
  };

  return {
    animeData,
    loading,
    error,
    fetchRecommendedAnime,
    trendState,
  };
}
