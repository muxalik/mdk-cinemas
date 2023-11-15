<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cinema>
 */
class CinemaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Cinema #' . fake()->numberBetween(1_000, 10_000),
            'district' => 'District #' . fake()->numberBetween(1_000, 10_000),
            'address' => fake()->address(),
            'category' => fake()->words(mt_rand(3, 4), true),
            'capacity' => fake()->numberBetween(1_000, 10_000),
            'is_opened' => fake()->boolean(),
        ];
    }
}
