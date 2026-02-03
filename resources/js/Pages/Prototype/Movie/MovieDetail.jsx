import { useState, useEffect } from "react";
import { usePage, Head } from "@inertiajs/react";
import { api } from "@/Services/api";
import Authenticated from "@/Layouts/Autenticated/Index";
import HeroPlayer from "./HeroPlayer";
import Episodes from "./Episodes";
import Recommendations from "./Recomendations";

export default function MovieDetail() {
    const { movieId } = usePage().props;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSeason, setActiveSeason] = useState(1);
    const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!movieId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api.getMovieDetail(movieId);
                const data = res.data ?? null;
                if (!data) return setMovie(null);

                setMovie(data);

                // Pilih URL video pertama yang bisa diputar
                let videoUrl = data.episodes?.[0]?.playerUrl
                    || data.trailerUrl
                    || data.video_url
                    || data.playerUrl
                    || null;

                console.log("Selected video URL:", videoUrl);
                setCurrentVideoUrl(videoUrl);
                setIsPlaying(!!videoUrl);

                const trending = await api.getTrending();
                setRecommendations(trending?.items?.slice(0, 5) || []);
            } catch (err) {
                console.error(err);
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [movieId]);

    if (loading) return (
        <Authenticated>
            <div className="flex h-screen items-center justify-center bg-black">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            </div>
        </Authenticated>
    );

    if (!movie) return (
        <Authenticated>
            <div className="flex h-screen flex-col items-center justify-center bg-black text-white">
                <h1 className="text-2xl font-bold">Content Not Found</h1>
            </div>
        </Authenticated>
    );

    return (
        <Authenticated>
            <Head title={movie.title || movie.name || "No Title"} />
            <div className="bg-[#050505] text-white min-h-screen pb-20">
                <HeroPlayer
                    movie={movie}
                    currentVideoUrl={currentVideoUrl}
                    setCurrentVideoUrl={setCurrentVideoUrl}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                />
                <Episodes
                    movie={movie}
                    currentVideoUrl={currentVideoUrl}
                    setCurrentVideoUrl={(url) => {
                        setCurrentVideoUrl(url); // ganti URL video
                        setIsPlaying(true);       // langsung play
                    }}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    activeSeason={activeSeason}
                    setActiveSeason={setActiveSeason}
                />
                <Recommendations recommendations={recommendations} />
            </div>
        </Authenticated>
    );
}
