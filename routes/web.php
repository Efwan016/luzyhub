<?php

use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\WalletAuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




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

    Route::get('/dashboard', function () {
        return Inertia::render('Prototype/Dashboard');
    })->middleware(['auth', 'verified'])->name('prototype.dashboard');
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
Route::post('/wallet/nonce', [WalletAuthController::class, 'nonce']);
Route::post('/wallet/verify', [WalletAuthController::class, 'verify']);

require __DIR__ . '/auth.php';
