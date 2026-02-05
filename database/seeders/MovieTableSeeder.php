<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $movie = [
            [
                'name' => 'Inception',
                'slug' => 'inception',
                'category' => 'Sci-Fi',
                'video_url' => 'https://example.com/inception.mp4',
                'thumbnail' => 'https://example.com/inception.jpg',
                'rating' => 8.8,
                'is_featured' => true,
            ],
            [
                'name' => 'The Dark Knight',
                'slug' => 'the-dark-knight',
                'category' => 'Action',
                'video_url' => 'https://example.com/dark-knight.mp4',
                'thumbnail' => 'https://example.com/dark-knight.jpg',
                'rating' => 9.0,
                'is_featured' => true,
            ],
            [
                'name' => 'Pulp Fiction',
                'slug' => 'pulp-fiction',
                'category' => 'Crime',
                'video_url' => 'https://example.com/pulp-fiction.mp4',
                'thumbnail' => 'https://example.com/pulp-fiction.jpg',
                'rating' => 8.9,
                'is_featured' => false, 
            ],
        ];
        Movie::insert($movie);
    }
}
