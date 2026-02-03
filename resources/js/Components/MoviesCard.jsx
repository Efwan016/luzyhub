import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";

export default function MoviesCard({
  slug,
  name,
  year,
  category,
  thumbnail,
}) {
  return (
    <Link
      href={`/prototype/movie?path=${encodeURIComponent(slug)}`}
      className="block group"
    >
      <div className="relative overflow-hidden rounded-[30px]">
        <img
          src={thumbnail}
          loading="lazy"
          className="object-cover w-full aspect-[2/3] group-hover:scale-110 transition-transform duration-500 ease-in-out"
          alt={name}
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-12">
          <div>
            <div className="font-medium text-lg text-white truncate">{name}</div>
            <h1 className="text-gray-400 text-sm mt-1">{year ?? "2024"}</h1>
            <p className="text-gray-400 text-sm mt-1">{category}</p>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <img src="/icons/ic_play.svg" width="30" alt="" />
          </div>
        </div>
      </div>
    </Link>
  );
}

MoviesCard.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
