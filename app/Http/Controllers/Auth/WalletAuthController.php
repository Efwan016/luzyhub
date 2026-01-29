<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
use kornrunner\Keccak;
use Elliptic\EC;

class WalletAuthController extends Controller
{
    // 1️⃣ ambil nonce
    public function nonce(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'chain'   => 'required|in:evm,solana',
        ]);

        $nonce = Str::random(32);

        Cache::put(
            'wallet_nonce_' . strtolower($request->address),
            $nonce,
            now()->addMinutes(5)
        );

        return response()->json([
            'nonce' => $nonce
        ]);
    }

    // 2️⃣ verify signature
   public function verify(Request $request)
{
    logger()->info('Wallet verify called', $request->all());
    $request->validate([
        'address'   => 'required|string',
        'signature' => 'required|string',
        'chain'     => 'required|in:evm',
        'message'   => 'required|string',
    ]);

    $address = strtolower($request->address);
    $nonce   = Cache::get('wallet_nonce_' . $address);

    if (!$nonce) {
        return response()->json(['message' => 'Nonce expired'], 401);
    }

    // 🔐 VALIDASI NONCE ADA DI MESSAGE
    if (!str_contains($request->message, $nonce)) {
        return response()->json(['message' => 'Invalid nonce'], 401);
    }

    if (!$this->verifyEvmSignature(
        $request->message,
        $request->signature,
        $address
    )) {
        return response()->json(['message' => 'Invalid signature'], 401);
    }

    $user = User::firstOrCreate(
        ['wallet_address' => $address],
        [
            'name' => 'Wallet User',
            'email' => $address . '@wallet.local',
            'password' => bcrypt(Str::random(32)),
            'role' => 'user',
            'wallet_address' => $address,
            'email_verified_at' => now(),
        ]
    );

    Auth::login($user);
    Cache::forget('wallet_nonce_' . $address);

    return response()->json([
    'redirect' => '/prototype/dashboard'
]);
}


    // 3️⃣ verify EVM signature
    private function verifyEvmSignature($message, $signature, $address)
    {
        $msg = "\x19Ethereum Signed Message:\n" . strlen($message) . $message;
        $msgHash = Keccak::hash($msg, 256);

        $signature = str_replace('0x', '', $signature);
        $r = substr($signature, 0, 64);
        $s = substr($signature, 64, 64);
        $v = hexdec(substr($signature, 128, 2));

        if ($v !== 27 && $v !== 28) {
            $v += 27;
        }

        $ec = new EC('secp256k1');
        $pubKey = $ec->recoverPubKey($msgHash, ['r' => $r, 's' => $s], $v - 27);
        $pubKeyHex = $pubKey->encode('hex', false);
        $pubKeyHex = substr($pubKeyHex, 2);

        $addressRecovered = '0x' . substr(
            Keccak::hash(hex2bin($pubKeyHex), 256),
            24
        );

        return strtolower($addressRecovered) === strtolower($address);
    }
}
