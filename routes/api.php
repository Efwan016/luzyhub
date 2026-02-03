<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/trending', function () {
    $response = Http::get('https://zeldvorik.ru/apiv3/api.php', [
        'action' => 'trending',
        'page' => request('page', 1),
    ]);

    return response()->json($response->json());
});

Route::get('/search', function () {
    $response = Http::get('https://zeldvorik.ru/apiv3/api.php', [
        'action' => 'search',
        'q' => request('q'),
    ]);

    return response()->json($response->json());
});

Route::get('/movie', function () {
    $path = request('path'); // 

    if (!$path) {
        return response()->json([
            'success' => false,
            'error' => 'detailPath required'
        ], 400);
    }

    $response = Http::get('https://zeldvorik.ru/apiv3/api.php', [
        'action' => 'detail',
        'detailPath' => $path,
    ]);

    return response()->json($response->json());
});
