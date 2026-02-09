<?php

use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\WalletAuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Redirect base
|--------------------------------------------------------------------------
*/

Route::redirect('/', '/prototype/login', 200);

/*
|--------------------------------------------------------------------------
| Dashboard default
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| Prototype Routes
|--------------------------------------------------------------------------
*/
Route::prefix('prototype')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/login', function () {
        return Inertia::render('Prototype/Login');
    })->withoutMiddleware(['auth', 'verified'])->name('prototype.login');

    Route::get('/register', function () {
        return Inertia::render('Prototype/Register');
    })->withoutMiddleware(['auth', 'verified'])->name('prototype.register');

    Route::get('/dashboard', function () {
        return Inertia::render('Prototype/Dashboard');
    })->name('Prototype.dashboard');

    Route::get('/subscriptionPlan', function () {
        return Inertia::render('Prototype/SubscriptionPlan');
    })->name('Prototype.subscriptionPlan');

    /**
     * ✅ MOVIE DETAIL
     * hanya kirim ID ke React
     */
    Route::get('/movie', function () {
        return Inertia::render('Prototype/Movie/MovieDetail', [
            'movieId' => request('path') ?? request('slug')
        ]);
    })->name('Prototype.movie.detail');
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
Route::prefix('auth/wallet')->group(function () {
    Route::post('/nonce', [WalletAuthController::class, 'nonce']);
    Route::post('/verify', [WalletAuthController::class, 'verify']);
});

require __DIR__ . '/auth.php';
