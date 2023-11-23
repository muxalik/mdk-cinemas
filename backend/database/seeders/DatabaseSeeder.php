<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Actor;
use App\Models\Cinema;
use App\Models\Movie;
use App\Models\Session;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $cinemas = Cinema::factory(20)->create();

        $movies = Movie::factory(20)->create();

        $actors = Actor::factory(20)->create();

        $cinemas->each(function (Cinema $cinema) use ($movies) {
            $randomMovies = $movies->random(mt_rand(5, 10));

            $randomMovies->each(function (Movie $movie) use ($cinema) {
                Session::factory()->create([
                    'cinema_id' => $cinema->id,
                    'movie_id' => $movie->id,
                    'free_places' => fake()->numberBetween(1, $cinema->capacity),
                ]);
            });
        });

        $actors->each(function (Actor $actor) use ($movies) {
            $randomMovies = $movies->random(
                fake()->numberBetween(7, 12),
            );

            $randomMovies->each(function (Movie $movie) use ($actor) {
                $actor->movies()->attach($movie->id, [
                    'is_main_role' => fake()->boolean(35),
                ]);
            });
        });
    }
}
