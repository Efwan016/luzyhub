import { useForm, usePage, Link, Head } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/Autenticated/Index";

export default function Profile() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const { data, setData, patch, processing, errors } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <Authenticated>
            <Head title="Profile" />

            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-white">Profile Settings</h1>

                <form onSubmit={submit} className="space-y-6 bg-[#181818] p-6 rounded-xl shadow-md">
                    <div>
                        <InputLabel forInput="name" value="Name" className="text-gray-300" />
                        <TextInput
                            type="text"
                            name="name"
                            value={data.name}
                            className="w-full mt-2 bg-[#121214] border border-gray-700 text-white rounded-xl px-4 py-2"
                            onChange={e => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel forInput="email" value="Email" className="text-gray-300" />
                        <TextInput
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full mt-2 bg-[#121214] border border-gray-700 text-white rounded-xl px-4 py-2"
                            onChange={e => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel forInput="password" value="New Password" className="text-gray-300" />
                        <TextInput
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full mt-2 bg-[#121214] border border-gray-700 text-white rounded-xl px-4 py-2"
                            onChange={e => setData("password", e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel forInput="password_confirmation" value="Confirm Password" className="text-gray-300" />
                        <TextInput
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="w-full mt-2 bg-[#121214] border border-gray-700 text-white rounded-xl px-4 py-2"
                            onChange={e => setData("password_confirmation", e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Link
                            href="/dashboard"
                            className="px-5 py-2 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </Link>

                        <PrimaryButton
                            type="submit"
                            processing={processing}
                            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all"
                            Loading="Updating..."
                            Success="Updated!"
                            href="/"
                        >
                            Save Changes
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
