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
  const loading = useRecoilValue(recomendedErrorSelector);
  const error = useRecoilValue(recomendedLoadingSelector);

  const fetchRecommendedAnime = async () => {
    await fetchRecomendedAnime(setTrendState);
  };

  return {
    animeData,
    loading,
    error,
    fetchRecommendedAnime,
    trendState,
  };
}
