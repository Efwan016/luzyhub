import { useState, useEffect } from "react";
import axios from "axios";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Register() {
    
    const { data, setData, post, processing, errors, reset } = useForm({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });
    
        useEffect(() => {
            return () => {
                reset('password', 'password_confirmation');
            };
        }, []);
    
        const handleOnChange = (event) => {
            setData(event.target.name,  event.target.value);
        };
    
        const submit = (e) => {
            e.preventDefault();
            post(route('register'));
        };

       
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
            message,
        });
    
        window.location.href = '/dashboard';
    };
    
    
    

    return (
       <>
       <Head title="Register" />
        <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
            <div className="fixed top-[-50px] hidden lg:block">
                <img
                    src="/images/signup-image.png"
                    className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-[2000ms] ease-out laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                    alt="Decorative background"
                />
            </div>
            <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                <div>
                    <img src="/images/luzyhub-white.svg" alt="Luzyhub Logo" />
                    <div className="my-[70px]">
                        <div className="font-semibold text-[26px] mb-3">
                            Sign Up
                        </div>
                        <p className="text-base text-[#767676] leading-7">
                            Explore our new movies and get <br />
                            the better insight for your life
                        </p>
                    </div>
                    <form className="w-[370px]" onSubmit={submit}>
                        <div className="flex flex-col gap-6">
                            <div>
                                <InputLabel forInput="name" value="Full Name" className="text-base block mb-2" />
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    className="rounded-2xl bg-form-bg py-[13px] px-7 w-full focus:outline-none focus:ring-1 focus:ring-alerange"
                                    placeholder="Your fullname..."
                                   isFocused={true}
                                    onChange={handleOnChange}
                                    required 
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel forInput="email" value="Email Address" className="text-base block mb-2" />
                                <TextInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="rounded-2xl bg-form-bg py-[13px] px-7 w-full focus:outline-none focus:ring-1 focus:ring-alerange"
                                    placeholder="Your Email Address"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel forInput="password" value="Password" className="text-base block mb-2" />
                                <TextInput
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="rounded-2xl bg-form-bg py-[13px] px-7 w-full focus:outline-none focus:ring-1 focus:ring-alerange"
                                    placeholder="Your Password"
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                             <div>
                                <InputLabel forInput="password_confirmation" value="Confirm Password" className="text-base block mb-2" />
                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    className="rounded-2xl bg-form-bg py-[13px] px-7 w-full focus:outline-none focus:ring-1 focus:ring-alerange"
                                    placeholder="Your Password"
                                    value={data.password_confirmation}
                                    onChange={handleOnChange}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>
                        <div className="grid space-y-[14px] mt-[30px]">
                            <PrimaryButton processing={processing} type="submit" variant="primary" className="rounded-2xl text-center w-full justify-center">
                                <span className="text-base font-semibold">Sign Up</span>
                            </PrimaryButton>

                            {/* The original commented out button is now replaced by PrimaryButton */}
                            <div className="grid grid-cols-1 gap-3">
                                <PrimaryButton
                                    type="button"
                                    variant="google-light"
                                    disabled={loadingWallet}
                                    className="w-full justify-center !rounded-xl !py-3 bg-white hover:bg-purple-500 transition-colors"
                                >
                                    <span className="text-sm font-medium text-black justify-center flex items-center gap-2" onClick={() => window.location.href = "/auth/google"}>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Sign Up with Google
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
                                        {loadingWallet ? "Connecting..." : "Sign Up with Wallet"}
                                    </span>
                                </PrimaryButton>
                            </div>
                            <Link href="/prototype/login">
                                <PrimaryButton type="button" variant="light-outline" className="rounded-2xl text-center w-full justify-center">
                                    <span className="text-base text-white">Sign In to My Account</span>
                                </PrimaryButton>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       </>
    );
}