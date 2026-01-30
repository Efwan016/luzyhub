import Autenticaated from "@/Layouts/Autenticated/Index";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <Autenticaated>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
            {/* Konten dashboard Anda akan ditempatkan di sini */}
        </Autenticaated>
    )
};