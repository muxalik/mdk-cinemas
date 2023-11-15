<?php

namespace Database\Factories;

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
        $genres = ['Comedy', 'Action', 'Fantasy', 'Drama', 'Horror'];

        return [
            'name' => fake()->words(mt_rand(3, 7), true),
            'producer' => fake()->name(),
            'operator' => fake()->name(),
            'genre' => fake()->randomElement($genres),
            'production' => fake()->country(),
            'awards' => $this->awards(),
            'duration' => fake()->regexify('^[1-3]h [1-5][0-9]m$'),
            'advert_screenshot' => '/path/to/sreenshot/' . fake()->md5 . '.jpg',
            'is_available' => fake()->boolean(),
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
