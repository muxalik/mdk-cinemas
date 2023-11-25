<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Actor>
 */
class ActorFactory extends Factory
{
    public static array $actors = [
        1 => "Tom Hanks",
        2 => "Denzel Washington",
        3 => "Meryl Streep",
        4 => "Leonardo DiCaprio",
        5 => "Jennifer Lawrence",
        6 => "Brad Pitt",
        7 => "Will Smith",
        8 => "Julia Roberts",
        9 => "Tom Cruise",
        10 => "Viola Davis",
        11 => "Dwayne Johnson",
        12 => "Daniel Day-Lewis",
        13 => "Cate Blanchett",
        14 => "George Clooney",
        15 => "Anne Hathaway",
        16 => "Johnny Depp",
        17 => "Angelina Jolie",
        18 => "Joaquin Phoenix",
        19 => "Charlize Theron",
        20 => "Harrison Ford",
        21 => "Natalie Portman",
        22 => "Ryan Gosling",
        23 => "Nicole Kidman",
        24 => "Samuel L. Jackson",
        25 => "Emma Stone",
        26 => "Russell Crowe",
        27 => "Sandra Bullock",
        28 => "Robert De Niro",
        29 => "Jodie Foster",
        30 => "Jake Gyllenhaal",
        31 => "Emily Blunt",
        32 => "Matt Damon",
        33 => "Scarlett Johansson",
        34 => "Mark Wahlberg",
        35 => "Maggie Smith",
        36 => "Chris Pratt",
        37 => "Amy Adams",
        38 => "Hugh Jackman",
        39 => "Kate Winslet",
        40 => "Christian Bale",
        41 => "Jennifer Aniston",
        42 => "Liam Neeson",
        43 => "Keira Knightley",
        44 => "Ben Affleck",
        45 => "Catherine Zeta-Jones",
        46 => "Michael Fassbender",
        47 => "Jessica Chastain",
        48 => "Eddie Redmayne",
        49 => "Eva Green",
        50 => "Idris Elba"
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement(self::$actors),
        ];
    }
}
