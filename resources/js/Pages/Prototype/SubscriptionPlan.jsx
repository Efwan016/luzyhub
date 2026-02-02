import Autenticaated from "@/Layouts/Autenticated/Index";
import { Head } from "@inertiajs/react";

export default function SubscriptionPlan() {
    return (
        <Autenticaated>
            <Head title="Subscription Plan" />
            <div className="py-20 flex flex-col items-center px-4">
                <div className="text-white text-center font-semibold text-[26px] mb-3">
                    Pricing for Everyone
                </div>
                <p className="text-base text-gray-400 leading-7 max-w-[302px] text-center mb-12">
                    Invest your little money to get a whole new experiences from movies.
                </p>

                {/*<!-- Pricing Card -->*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full justify-items-center items-start">
                    {/*<!-- Basic -->*/}
                    <div
                        className="flex flex-col gap-[30px] py-[30px] px-7 bg-[#181818] rounded-[26px] text-white w-full max-w-[350px] border border-[#262626]relative shadow-[0_0_30px_rgba(255,113,88,0.1)] hover:shadow-[0_0_50px_rgba(255,113,88,0.2)] transition-all duration-300 transform md:-translate-y-4 h-full">
                        <div>
                            <div className="text-sm mb-2 font-medium text-gray-400 uppercase tracking-wider">Basic</div>
                            <div className="text-[28px] font-bold">
                                IDR 299.000
                            </div>
                            <p className="text-gray-500 text-xs font-light">/3 months</p>
                        </div>

                        {/* Mid Content: Benefits */}
                        <div className="flex flex-col gap-4">
                            {["Unlock 10 basic movies", "Up to 3 users", "Support 24/7 ready"].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-gray-500  group-hover:text-white transition-colors">
                                        <path d="M8.4402 12.0001L10.8142 14.3731L15.5602 9.62708" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                    </svg>
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom: CTA Button */}
                        <div className="mt-auto pt-6">
                            <a href="#!"
                                className="rounded-full border border-[#333] py-[13px] text-center block hover:bg-white hover:text-black transition-all duration-300 font-medium">
                                <span className="text-base">Start Basic</span>
                            </a>
                        </div>
                    </div>

                    {/*<!-- For Greatest -->*/}
                    <div
                        className="flex flex-col gap-[30px] py-[30px] px-7 bg-[#181818] rounded-[26px] text-white w-full max-w-[350px] border border-alerange relative shadow-[0_0_30px_rgba(255,113,88,0.1)] hover:shadow-[0_0_50px_rgba(255,113,88,0.2)] transition-all duration-300 transform md:-translate-y-4 h-full">
                        
                        {/* Tag */}
                        <div className="absolute top-0 right-0 bg-alerange px-4 py-1 rounded-bl-xl rounded-tr-[24px] text-xs font-bold">
                            POPULAR
                        </div>

                        {/* Top Content: Name-Price */}
                        <div>
                            <div className="text-sm mb-2 font-medium text-alerange uppercase tracking-wider">For Greatest</div>
                            <div className="text-[28px] font-bold">
                                IDR 800.000
                            </div>
                            <p className="text-gray-500 text-xs font-light">/3 months</p>
                        </div>

                        {/* Mid Content: Benefits */}
                        <div className="flex flex-col gap-4">
                            {[
                                "Unlock 200 awards movies",
                                "180 subtitles available",
                                "iOS, Android, TV",
                                "Offline Mode",
                                "Up to 20 users",
                                "Support 24/7 ready"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-alerange">
                                        <path d="M8.4402 12.0001L10.8142 14.3731L15.5602 9.62708" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.7498 12.0001C2.7498 18.9371 5.0628 21.2501 11.9998 21.2501C18.9368 21.2501 21.2498 18.9371 21.2498 12.0001C21.2498 5.06312 18.9368 2.75012 11.9998 2.75012C5.0628 2.75012 2.7498 5.06312 2.7498 12.0001Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
                                    </svg>
                                    <span className="text-sm font-medium">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom: CTA Button */}
                        <div className="mt-auto pt-6">
                            <a href="#!"
                                className="rounded-full bg-alerange py-[13px] text-center block hover:bg-alerange/90 transition-all duration-300 shadow-lg shadow-alerange/25 font-semibold">
                                <span className="text-base font-semibold">Subscribe Now</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* /Pricing Card */}
            </div>
        </Autenticaated>
    )
}