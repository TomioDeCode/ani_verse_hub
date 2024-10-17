import { useRecoilState, useRecoilValue } from "recoil";
import { historyStateAtom } from "@/lib//recoils/atoms";
import {
  historyAnimeSelector,
  historyLoadingSelector,
  historyErrorSelector,
} from "@/lib//recoils/selectors";
import { fetchHistoryAnimeAPI } from "@/lib/api";

export function useHistoryAnime() {
  const [state, setState] = useRecoilState(historyStateAtom);
  const historyData = useRecoilValue(historyAnimeSelector);
  const loading = useRecoilValue(historyLoadingSelector);
  const error = useRecoilValue(historyErrorSelector);

  const fetchHistoryAnime = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchHistoryAnimeAPI();
      setState((prev) => ({
        ...prev,
        historyData: data,
        loading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "An error occurred",
        loading: false,
      }));
    }
  };

  return {
    historyData,
    loading,
    error,
    fetchHistoryAnime,
  };
}
