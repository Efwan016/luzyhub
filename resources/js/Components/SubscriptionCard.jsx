import PrimaryButton from "./PrimaryButton";

export default function SubscriptionCard({ id, name, price, durationInMonth, features, isPremium, onSelectSubsription }) {
    const discount = 30;
    const discountedPrice = price - (price * discount / 100);
    return (
        <>
            {/*<!-- Basic -->*/}
            {!isPremium && (
                <div
                    className="flex flex-col gap-[30px] py-[30px] px-7 bg-[#181818] rounded-[26px] text-white w-full max-w-[350px] border border-[#262626] relative shadow-[0_0_30px_rgba(255,113,88,0.1)] hover:shadow-[0_0_50px_rgba(255,113,88,0.2)] transition-all duration-300 transform md:-translate-y-4 h-full">
                    <div>
                        <div className="text-sm mb-2 font-medium text-gray-400 uppercase tracking-wider">{name}</div>
                        <div className="flex items-baseline gap-1">
                            <div className="text-[28px] font-bold">
                                $ {price.toLocaleString()}
                            </div>
                            <p className="text-gray-500 text-xs font-light">/{durationInMonth} months</p>
                        </div>
                    </div>

                    {/* Mid Content: Benefits */}
                    <div className="flex flex-col gap-4">
                        {features.map((features, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-gray-500  group-hover:text-white transition-colors">
                                    <path d="M8.4402 12.0001L10.8142 14.3731L15.5602 9.62708" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                </svg>
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                    {features}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Bottom: CTA Button */}
                    <div className="mt-auto pt-6" onClick={() => onSelectSubsription(id)}>
                        <PrimaryButton
                            type="button"
                            variant="white-outline"
                            className="w-full"
                        >
                            <span className="text-base">Start {name}</span>
                        </PrimaryButton>
                    </div>
                </div>
            )}

            {/*<!-- For Greatest -->*/}
            {isPremium && (
                <div
                    className="flex flex-col gap-[30px] py-[30px] px-7 bg-[#181818] rounded-[26px] text-white w-full max-w-[350px] border border-alerange relative shadow-[0_0_30px_rgba(255,113,88,0.1)] hover:shadow-[0_0_50px_rgba(255,113,88,0.2)] transition-all duration-300 transform md:-translate-y-4 h-full">

                    {/* Tag */}
                    <div className="absolute top-0 right-0 bg-alerange px-4 py-1 rounded-bl-xl rounded-tr-[24px] text-xs font-bold">
                        POPULAR
                    </div>

                    {/* Top Content: Name-Price */}
                    <div>
                        <div className="text-sm mb-2 font-medium text-alerange uppercase tracking-wider">{name}</div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-baseline gap-1">
                                <div className="text-[28px] font-bold">
                                    ${discountedPrice.toLocaleString()}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs line-through text-gray-400">
                                    ${price.toLocaleString()}
                                </span>
                                <span className="text-xs font-bold text-green-500">
                                    {discount}% OFF
                                </span>
                                <p className="text-gray-500 text-xs font-light">/{durationInMonth} months</p>
                            </div>
                        </div>
                    </div>

                    {/* Mid Content: Benefits */}
                    <div className="flex flex-col gap-4">
                        {
                            features.map((features, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-alerange">
                                        <path d="M8.4402 12.0001L10.8142 14.3731L15.5602 9.62708" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.7498 12.0001C2.7498 18.9371 5.0628 21.2501 11.9998 21.2501C18.9368 21.2501 21.2498 18.9371 21.2498 12.0001C21.2498 5.06312 18.9368 2.75012 11.9998 2.75012C5.0628 2.75012 2.7498 5.06312 2.7498 12.0001Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
                                    </svg>
                                    <span className="text-sm font-medium">
                                        {features}
                                    </span>
                                </div>
                            ))}
                    </div>

                    {/* Bottom: CTA Button */}
                    <div className="mt-auto pt-6">
                        <PrimaryButton
                            type="button"
                            variant="primary"
                            className="w-full"
                        >
                            <span className="text-base font-semibold">Subscribe Now</span>
                        </PrimaryButton>
                    </div>
                </div>
            )}
        </>
    )
}