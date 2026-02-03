import MoviesCard from "@/Components/MoviesCard";
import Authenticated from "@/Layouts/Autenticated/Index";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { api } from "@/Services/api";

export default function Dashboard() {
    const [featured, setFeatured] = useState([]);
    const [browse, setBrowse] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!featured.length) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featured.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [featured]);


    useEffect(() => {
        api.getTrending().then(res => {
            const movies = Array.isArray(res?.items) ? res.items : [];

            setFeatured(movies.slice(0, 5));
            setBrowse(movies.slice(5, 15));
        }).catch(console.error);
    }, []);

    return (
        <Authenticated>
            <Head title="Dashboard" />

            {/* Featured Movies */}
            {featured.length > 0 && (
                <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden mb-10">
                    {featured.map((movie, index) => (
                        <div
                            key={movie.id}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000
                        ${index === currentIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                            style={{ backgroundImage: `url(${movie.poster})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex items-center">
                                <div className="w-full md:w-1/2 px-6 md:px-16 text-white">
                                    <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
                                        {movie.title}
                                    </h1>

                                    <div className="flex gap-4 text-gray-300 mb-6">
                                        <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                                            ⭐ {(Number(movie.rating) || 0).toFixed(1)}
                                        </span>
                                        <span>{movie.year ?? "2024"}</span>
                                        <span>{movie.genre ?? movie.category ?? movie.categories ?? "Movie"}</span>
                                    </div>

                                    <Link
                                        href={`/prototype/movie?path=${encodeURIComponent(movie.detailPath)}`}
                                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
                                    >
                                        ▶ Watch Now
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}

                    {/* NAV */}
                    <button
                        onClick={() =>
                            setCurrentIndex(
                                (currentIndex - 1 + featured.length) % featured.length
                            )
                        }
                        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-white hover:text-black transition"
                    >
                        ‹
                    </button>

                    <button
                        onClick={() =>
                            setCurrentIndex((currentIndex + 1) % featured.length)
                        }
                        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-white hover:text-black transition"
                    >
                        ›
                    </button>
                </div>
            )}

            {/* Browse */}
            <div className="mt-[50px] container mx-auto">
                <div className="font-semibold text-[22px] text-white mb-4">Browse</div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                    {browse.map((movie, i) => (
                        <MoviesCard
                            key={i}
                            slug={movie.detailPath}
                            name={movie.title}
                            year={movie.year}
                            category={movie.genre ?? movie.category ?? movie.categories ?? "Movie"}
                            thumbnail={movie.poster}
                        />

                    ))}
                </div>
            </div>
        </Authenticated>

    );
}
