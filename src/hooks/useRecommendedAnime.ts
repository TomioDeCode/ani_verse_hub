import { useRecoilState, useRecoilValue } from "recoil";
import { recommendedStateAtom } from "@/store/atoms/atoms";
import {
  recommendedAnimeSelector,
  recommendedErrorSelector,
  recommendedLoadingSelector,
} from "@/store/selectors/selectors";
import { fetchRecommendedAnimeAPI } from "@/util/api";

export function useRecommendedAnime() {
  const [state, setState] = useRecoilState(recommendedStateAtom);
  const animeData = useRecoilValue(recommendedAnimeSelector);
  const loading = useRecoilValue(recommendedLoadingSelector);
  const error = useRecoilValue(recommendedErrorSelector);

  const fetchRecommendedAnime = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchRecommendedAnimeAPI();

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
    animeData,
    loading,
    error,
    fetchRecommendedAnime,
  };
}
