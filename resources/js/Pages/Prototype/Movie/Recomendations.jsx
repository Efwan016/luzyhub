import MoviesCard from "@/Components/MoviesCard";

export default function Recommendations({ recommendations }) {
    if (!recommendations.length) return null;

    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-8 mb-20">
            <h2 className="text-2xl font-bold text-white">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {recommendations.map((item, idx) => (
                    <MoviesCard
                        key={idx}
                        slug={item.detailPath || item.id}
                        name={item.title}
                        year={item.year}
                        category={item.genre || item.category || "Movie"}
                        thumbnail={item.poster}
                    />
                ))}
            </div>
        </div>
    )
}
