import SubscriptionCard from "@/Components/SubscriptionCard";
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
                   <SubscriptionCard name={'Basic'} price={10} durationInMonth={1} features={['Unlock 10 basic movies', 'Up to 3 users', 'Support 24/7 ready']} />
                   <SubscriptionCard isPremium 
                   name={'Premium'} 
                   price={120} 
                   durationInMonth={12} 
                   features={['Unlock 200 awards movies', '180 subtitles available', 'iOS, Android, TV', 'Offline Mode', 'Up to 20 users', 'Support 24/7 ready']}
                   />
                </div>
                {/* /Pricing Card */}
            </div>
        </Autenticaated>
    )
}