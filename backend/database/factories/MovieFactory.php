<?php

namespace Database\Factories;

use App\Enums\Genres;
use App\Enums\MovieStatuses;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $HOURS = [1 * 60, 3 * 60];
        $MINUTES = [0, 60];

        return [
            'name' => fake()->words(mt_rand(3, 7), true),
            'producer' => fake()->name(),
            'operator' => fake()->name(),
            'genre' => Genres::randomValue(),
            'production' => fake()->country(),
            'awards' => $this->awards(),
            'duration' => fake()->numberBetween(...$HOURS) + fake()->numberBetween(...$MINUTES),
            'advert_screenshot' => '/path/to/sreenshot/' . fake()->md5 . '.jpg',
            'status' => MovieStatuses::randomValue(),
            'price' => fake()->numberBetween(1_000_000, 20_000_000),
        ];
    }

    private function awards(): string
    {
        $awards = [];
        $quantity = mt_rand(2, 7);

        for ($i = 0; $i < $quantity; $i++) {
            $awards[] = 'Award for ' . fake()->words(3, true);
        }

        return implode(', ', $awards);
    }
}
