import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";

export default function FeaturedMovie({
    slug,
    name,
    category,
    thumbnail,
    rating = 0,
}) {
    return (
        <div className="relative overflow-hidden group mr-[30px]">
            <img
                src={thumbnail}
                className="object-cover rounded-[30px] w-[520px] h-[340px]"
                alt={name}
            />

            {/* rating */}
            <div className="absolute top-0 left-0">
                <div className="p-[30px] flex items-center gap-1">
                    <img src="/icons/ic_star.svg" alt="" />
                    <span className="text-sm font-medium text-white mt-1">
                        {Number(rating).toFixed(1)}
                    </span>
                </div>
            </div>

            {/* bottom detail */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px] rounded-br-[28px] flex justify-between items-center px-7 h-[130px]">
                <div>
                    <div className="font-medium text-[22px] text-white">{name}</div>
                    <p className="text-white text-sm font-light">{category}</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-1/2 transition ease-in-out duration-500">
                    <img src="/icons/ic_play.svg" width="50" alt="" />
                </div>
            </div>

            <Link href={`/prototype/movie/${slug}`}
                className="absolute inset-0 z-50">
            </Link>
        </div>
    );
}

FeaturedMovie.propTypes = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number,
};
