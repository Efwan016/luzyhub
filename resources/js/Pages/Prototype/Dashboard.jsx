import FeaturedMovie from "@/Components/FeaturedMovie";
import Autenticaated from "@/Layouts/Autenticated/Index";
import { Head } from "@inertiajs/react";
import Flickity from "react-flickity-component";

export default function Dashboard() {
    const flickityOptions = {
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        groupCells: 1,
        wrapAround: false,
        prevNextButtons: false,
        draggable: ">1",
    }
    return (
        <Autenticaated>
            <Head title="Dashboard">
                <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
                </Head>
            <div>
                <div className="font-semibold text-[22px] text-black mb-4">Featured Movies</div>
                <Flickity className="gap-[30px]" options={flickityOptions}>

                    {/*<!-- Movie Thumbnail -->*/}
                    {
                        [1, 2, 3, 4].map((i) => (
                           <FeaturedMovie key={i} 
                           slug={`/movies/the-batman-in-love-${i}`}
                           name={`The Batman in Love ${i}`}
                           category="Action • Horror"
                           thumbnail={`/images/featured-${i}.png`}
                           rating={4.5 + i * 0.1}
                           />
                        ))
                    }
                </Flickity>
            </div>
        </Autenticaated>
    )
};