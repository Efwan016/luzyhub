<?php

use App\Http\Controllers\Auth\GoogleAuthController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::get('/auth/google', [GoogleAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

/*
|--------------------------------------------------------------------------
| Wallet / Web3 Login
|--------------------------------------------------------------------------
*/
Route::post('/auth/wallet/nonce', function (Request $request) {
    $address = strtolower($request->address);

    $user = User::where('wallet_address', $address)->first();

if (!$user) {
    $user = User::create([
        'wallet_address' => $address,
        'wallet_chain' => $request->chain,
        'wallet_nonce' => Str::random(32),
        'name' => 'Wallet User',
        'password' => bcrypt(Str::random(32)),
    ]);

    $user->assignRole('User');
} else {
    $user->wallet_nonce = Str::random(32);
    $user->save();
}


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

// HAPUS ATAU KOMENTARI BARIS INI KARENA MENIMPA LOGIKA DI ATAS
// Route::post('/auth/wallet/nonce', [WalletAuthController::class, 'nonce']);
// Route::post('/auth/wallet/verify', [WalletAuthController::class, 'verify']);

// Auth scaffolding
require __DIR__ . '/auth.php';
