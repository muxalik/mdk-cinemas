<?php

namespace Database\Factories;

use App\Enums\CinemaStatuses;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cinema>
 */
class CinemaFactory extends Factory
{
    public static array $cinemas = [
        "AMC Theatres",
        "Regal Cinemas",
        "Cinemark Theatres",
        "Cineplex",
        "ODEON Cinemas",
        "Vue Cinemas",
        "Golden Village",
        "PVR Cinemas",
        "Ster-Kinekor",
        "CGV Cinemas",
        "Hoyts Cinemas",
        "Pathé",
        "Gaumont",
        "Silverspot Cinema",
        "Kinepolis",
        "Megaplex Theatres",
        "Landmark Theatres",
        "Showcase Cinemas",
        "TCM Big Screen Classics",
        "ArcLight Cinemas",
        "Alamo Drafthouse Cinema",
        "Angelika Film Center",
        "iPic Theaters",
        "Laemmle Theatres",
        "Muvico Theaters",
        "Picturehouse Cinemas",
        "Reading Cinemas",
        "REEL Cinemas",
        "Roxy Cinemas",
        "Shaw Theatres",
        "Studio Movie Grill",
        "Palace Cinemas",
        "Wallis Cinemas",
        "Fandango",
        "Landmark Theatres",
        "Movie Tavern",
        "CineBistro",
        "B&B Theatres",
        "Cinema Café",
        "LOOK Cinemas",
        "Silverspot Cinema",
        "Cinepolis Luxury Cinemas",
        "Cobb Theatres",
        "Filmhouse Cinemas",
        "Grand Cinemas",
        "Inox Cinemas",
        "Mukta A2 Cinemas",
        "Village Cinemas",
        "Harkins Theatres"
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement(self::$cinemas),
            'district' => 'District #' . fake()->numberBetween(1_000, 10_000),
            'address' => fake()->address(),
            'category' => fake()->words(mt_rand(3, 4), true),
            'capacity' => fake()->numberBetween(1_000, 10_000),
            'status' => CinemaStatuses::randomValue(),
        ];
    }
}
