<?php

use App\Http\Controllers\Auth\WalletAuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Elliptic\EC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use kornrunner\Keccak;

// Redirect base URL ke login prototype
Route::redirect('/', '/prototype/login', 200);

// Dashboard (protected)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Prototype routes
Route::prefix('prototype')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Prototype/Login');
    })->name('prototype.login');

    Route::get('/register', function () {
        return Inertia::render('Prototype/Register');
    })->name('prototype.register');
});

/*
|--------------------------------------------------------------------------
| Google Login
|--------------------------------------------------------------------------
*/
Route::get('/auth/google', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/google/callback', function () {
    try {
        /** @var \Laravel\Socialite\Two\AbstractProvider $driver */
        $driver = Socialite::driver('google');
        $googleUser = $driver->stateless()->user();
    } catch (\Exception $e) {
        return redirect()->route('prototype.login');
    }

    $user = User::updateOrCreate(
        ['email' => $googleUser->getEmail()],
        [
            'name' => $googleUser->getName(),
            'google_id' => $googleUser->getId(),
            'avatar' => $googleUser->getAvatar(),
            'password' => bcrypt(Str::random(32)),
            'email_verified_at' => now(),
        ]
    );

    Auth::login($user);

    return redirect()->route('dashboard');
});

/*
|--------------------------------------------------------------------------
| Wallet / Web3 Login
|--------------------------------------------------------------------------
*/
Route::post('/auth/wallet/nonce', function (Request $request) {
    $address = strtolower($request->address);

    $user = User::firstOrCreate(
        ['wallet_address' => $address],
        ['wallet_nonce' => Str::random(32)]
    );

    return response()->json(['nonce' => $user->wallet_nonce]);
});

Route::post('/auth/wallet/verify', function (Request $request) {
    $address = strtolower($request->address);
    $signature = $request->signature;

    $user = User::where('wallet_address', $address)->firstOrFail();
    $message = "LuzyHub Login\nWallet: {$address}\nNonce: {$user->wallet_nonce}";
    $messageHash = Keccak::hash("\x19Ethereum Signed Message:\n" . strlen($message) . $message, 256);

    $ec = new EC('secp256k1');
    $sig = [
        'r' => substr($signature, 2, 64),
        's' => substr($signature, 66, 64),
    ];
    $recovery = hexdec(substr($signature, 130, 2)) - 27;

    $pubKey = $ec->recoverPubKey($messageHash, $sig, $recovery);
    $recoveredAddress = '0x' . substr(Keccak::hash(hex2bin($pubKey->encode('hex')), 256), 24);

    if (strtolower($recoveredAddress) !== $address) {
        return response()->json(['error' => 'Invalid signature'], 403);
    }

    $user->wallet_nonce = Str::random(32);
    $user->save();

    Auth::login($user);
    return response()->json(['success' => true]);
});
Route::post('/auth/wallet/nonce', [WalletAuthController::class, 'nonce']);
Route::post('/auth/wallet/verify', [WalletAuthController::class, 'verify']);

// Auth scaffolding
require __DIR__ . '/auth.php';
