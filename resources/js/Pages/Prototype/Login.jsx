import { useState, useEffect } from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Login() {
    
    const [loadingWallet, setLoadingWallet] = useState(false);

    const connectWallet = async () => {
    if (loadingWallet) return;
    setLoadingWallet(true);

    try {
        // PRIORITAS: EVM
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            if (!accounts?.length) throw new Error("No account");

            await loginWithWallet({
                address: accounts[0],
                chain: "evm",
            });
            return;
        }

        // FALLBACK: PHANTOM
        if (window.solana?.isPhantom) {
            const resp = await window.solana.connect();
            const address = resp.publicKey.toString();

            await loginWithWallet({
                address,
                chain: "solana",
            });
            return;
        }

        alert("No supported wallet detected");
    } catch (err) {
        console.error("Wallet error:", err);

        if (err?.code === 4001) {
            console.log("User cancelled");
        } else {
            alert("Wallet error, try again");
        }
    } finally {
        setLoadingWallet(false);
    }
};


    useEffect(() => {
        if ("solana" in window) {
            const provider = window.solana;

            if (provider?.isPhantom) {
                console.log("Phantom detected");
            }
        }
    }, []);



  const loginWithWallet = async ({ address, chain }) => {
    // 1️⃣ nonce
    const { data } = await axios.post('/auth/wallet/nonce', {
        address,
        chain,
    });

    const message = `LuzyHub Login
Wallet: ${address}
Nonce: ${data.nonce}`;

    let signature;

    // 2️⃣ SIGN SESUAI CHAIN
    if (chain === "solana") {
        const encoded = new TextEncoder().encode(message);
        const signed = await window.solana.signMessage(encoded, "utf8");

        signature = Array.from(signed.signature)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    if (chain === "evm") {
        signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, address],
        });
    }

    if (!signature) throw new Error("Sign failed");

    // 3️⃣ VERIFY
    await axios.post('/auth/wallet/verify', {
        address,
        signature,
        chain,
    });

    window.location.href = '/dashboard';
};




    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        axios.post("/login", { email, password })
            .then(res => {
                // redirect ke dashboard
            })
            .catch(err => {
                // handle error
            });
    };


    return (
       <>
       <Head title="Login" />

        <div className="h-screen bg-[#050505] text-white flex font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-900/20 rounded-full blur-[100px]" />
            </div>

            {/* Left Side - Image (Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 relative z-10 items-center justify-center bg-black overflow-hidden">
                <img
                    src="/images/signup-image.png"
                    className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-[2000ms] ease-out"
                    alt="Login Visual"
                />
                <div className="absolute bottom-20 left-12 z-30 max-w-lg">
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Discover a universe of entertainment.</h2>
                    <p className="text-gray-400 text-lg">Join millions of users and start your journey today.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 relative z-10">
                <div className="w-full max-w-[420px]">
                    {/* Logo */}
                    <div className="mb-12">
                        <img src="/images/luzyhub-white.svg" alt="LuzyHub" className="h-8" />
                    </div>

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold mb-3 tracking-tight text-white">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 text-base leading-relaxed">
                            Enter your credentials to access your account.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-5">
                            <div className="group">
                                <InputLabel forInput="email" value="Email Address" className="text-gray-300 text-sm mb-2 group-focus-within:text-indigo-400 transition-colors" />
                                <TextInput
                                    type="email"
                                    name="email"
                                    className="w-full bg-[#121214] border border-gray-800 text-white rounded-xl px-5 py-3.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-600"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="group">
                                <InputLabel forInput="password" value="Password" className="text-gray-300 text-sm mb-2 group-focus-within:text-indigo-400 transition-colors" />
                                <TextInput
                                    type="password"
                                    name="password"
                                    className="w-full bg-[#121214] border border-gray-800 text-white rounded-xl px-5 py-3.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <PrimaryButton type="submit" variant="primary" className="w-full justify-center !rounded-xl !py-3.5 bg-indigo-600 hover:bg-indigo-700 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
                                <span className="text-base font-semibold">Start Watching</span>
                            </PrimaryButton>

                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-gray-800"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-600 text-xs uppercase tracking-wider">Or continue with</span>
                                <div className="flex-grow border-t border-gray-800"></div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <PrimaryButton
                                    type="button"
                                    variant="google-light"
                                    className="w-full justify-center !rounded-xl !py-3 bg-white hover:bg-purple-500 transition-colors"
                                >
                                    <span className="text-sm font-medium text-black justify-center flex items-center gap-2" onClick={() => window.location.href = "/auth/google"}>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Sign in with Google
                                    </span>
                                </PrimaryButton>

                                <PrimaryButton
                                    type="button"
                                    variant="wallet-web3"
                                    disabled={loadingWallet}
                                    className={`w-full justify-center !rounded-xl !py-3 bg-[#1A1A1A] border border-gray-800 transition-all
                                    ${loadingWallet ? "opacity-60 cursor-not-allowed" : "hover:border-indigo-500/50 hover:bg-[#222]"}
    `                               }
                                >
                                    <span
                                        className="text-sm font-medium text-white flex justify-center items-center gap-2"
                                        onClick={!loadingWallet ? connectWallet : undefined}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        {loadingWallet ? "Connecting..." : "Connect Wallet"}
                                    </span>
                                </PrimaryButton>

                            </div>

                            <div className="pt-4">
                                <Link href="/prototype/register">
                                    <PrimaryButton type="button" variant="light-outline" className="w-full justify-center !rounded-xl !py-3 border-gray-700 hover:bg-gray-500 hover:border-gray-500 text-gray-300 hover:text-white transition-colors">
                                        <span className="text-sm font-medium">Create New Account</span>
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       </>
    );
};