"use client";

import { useEffect } from "react";
import { fetchAnimeDetailsAPI } from "@/util/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import HomeTemplate from "@/components/template/home/home.template";
import { Star, Calendar, Clock, Users } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { useRecoilState } from "recoil";
import {
  animeDataDetailsState,
  globalErrorState,
  globalLoadingState,
} from "@/store/atoms/atoms";
import { AnimeDetailsGlo } from "@/types/AnimeData";

interface PageProps {
  params: {
    id: string;
  };
}

const AnimeDetails = ({ params }: PageProps) => {
  const [animeDetails, setAnimeDetails] = useRecoilState(animeDataDetailsState);
  const [loading, setLoading] = useRecoilState(globalLoadingState);
  const [error, setError] = useRecoilState(globalErrorState);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!params.id) {
        setError("No anime ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetchAnimeDetailsAPI(params.id);
        if (!response?.data) {
          throw new Error("No data received from API");
        }
        setAnimeDetails(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [params.id]);

  if (loading) {
    return (
      <HomeTemplate>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
              <p className="text-lg font-medium text-muted-foreground">
                Loading anime details...
              </p>
            </div>
          </div>
        </div>
      </HomeTemplate>
    );
  }

  if (error) {
    return (
      <HomeTemplate>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md border-destructive/20 dark:border-destructive/40">
              <CardHeader>
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-destructive/10 dark:bg-destructive/20 mx-auto mb-4">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h2 className="text-xl font-bold text-center text-destructive">
                  Error Loading Data
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">{error}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </HomeTemplate>
    );
  }

  if (!animeDetails) {
    return (
      <HomeTemplate>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-muted dark:bg-muted/50 mx-auto mb-4">
                  <span className="text-3xl">📭</span>
                </div>
                <h2 className="text-xl font-bold text-center">
                  No Data Available
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  No anime details found.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </HomeTemplate>
    );
  }

  const details = animeDetails as unknown as AnimeDetailsGlo;

  return (
    <HomeTemplate>
      <div className="h-[calc(100vh-2.5rem)] overflow-y-auto bg-foreground max-h-[100vh] rounded-md">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-foreground rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 md:h-96 overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src={
                      details.images.jpg.large_image_url ||
                      details.images.jpg.image_url
                    }
                    alt={`${details.title} banner`}
                    className="w-full h-full object-cover filter blur-sm scale-105"
                  />
                  <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="relative h-full flex items-end p-6 md:p-8">
                  <div className="flex gap-6 items-end">
                    <img
                      src={details.images.jpg.image_url}
                      alt={details.title}
                      className="w-32 md:w-48 rounded-lg shadow-lg border-4 border-card dark:border-card/95"
                    />
                    <div className="pb-2">
                      <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                        {details.title}
                      </h1>
                      <div className="flex flex-wrap gap-2">
                        {details.genres.map((genre) => (
                          <span
                            key={genre.mal_id}
                            className="px-3 py-1 bg-primary/80 text-primary-foreground rounded-full text-sm"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <StatCard
                    icon={<Star className="w-5 h-5 text-yellow-500" />}
                    label="Score"
                    value={`${details.score} / 10`}
                  />
                  <StatCard
                    icon={<Calendar className="w-5 h-5 text-primary" />}
                    label="Year"
                    value={details.year?.toString() || "N/A"}
                  />
                  <StatCard
                    icon={<Clock className="w-5 h-5 text-emerald-500" />}
                    label="Duration"
                    value={details.duration || "N/A"}
                  />
                  <StatCard
                    icon={<Users className="w-5 h-5 text-violet-500" />}
                    label="Members"
                    value={details.members?.toLocaleString() || "N/A"}
                  />
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mb-4 text-secondary">
                    Synopsis
                  </h2>
                  <p className="leading-relaxed text-secondary">
                    {details.synopsis || "No synopsis available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeTemplate>
  );
};

export default AnimeDetails;
