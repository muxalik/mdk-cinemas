<?php

namespace Database\Factories;

use App\Models\Cinema;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Session>
 */
class SessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cinema = Cinema::inRandomOrder()->firstOrFail();

        return [
            'cinema_id' => $cinema->id,
            'movie_id' => Movie::inRandomOrder()->value('id'),
            'ticket_price' => fake()->numberBetween(100, 500),
            'free_places' => fake()->numberBetween(1, $cinema->capacity),
            'starts_at' => now()
                ->addDays(mt_rand(1, 31))
                ->addHours(mt_rand(1, 20))
                ->addMinutes(mt_rand(1, 59))
                ->toDateTimeString(),
        ];
    }
}
