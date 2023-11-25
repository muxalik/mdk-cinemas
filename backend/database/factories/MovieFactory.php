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
    public static array $movies = [
        1 => "The Shawshank Redemption",
        2 => "The Godfather",
        3 => "The Dark Knight",
        4 => "Schindler's List",
        5 => "The Lord of the Rings: The Return of the King",
        6 => "Pulp Fiction",
        7 => "Forrest Gump",
        8 => "The Matrix",
        9 => "Goodfellas",
        10 => "Fight Club",
        11 => "Inception",
        12 => "The Silence of the Lambs",
        13 => "The Godfather: Part II",
        14 => "The Lord of the Rings: The Fellowship of the Ring",
        15 => "Star Wars: Episode V - The Empire Strikes Back",
        16 => "The Green Mile",
        17 => "The Usual Suspects",
        18 => "Se7en",
        19 => "Léon: The Professional",
        20 => "The Lion King",
        21 => "The Pianist",
        22 => "The Departed",
        23 => "Gladiator",
        24 => "The Prestige",
        25 => "American History X",
        26 => "The Lord of the Rings: The Two Towers",
        27 => "The Sixth Sense",
        28 => "Django Unchained",
        29 => "The Big Lebowski",
        30 => "The Shining",
        31 => "Reservoir Dogs",
        32 => "Braveheart",
        33 => "The Truman Show",
        34 => "A Beautiful Mind",
        35 => "Jurassic Park",
        36 => "Requiem for a Dream",
        37 => "The Terminator",
        38 => "Eternal Sunshine of the Spotless Mind",
        39 => "The Social Network",
        40 => "The Grand Budapest Hotel",
        41 => "Shutter Island",
        42 => "Memento",
        43 => "The Wizard of Oz",
        44 => "Casablanca",
        45 => "Back to the Future",
        46 => "Jaws",
        47 => "The Sound of Music",
        48 => "Rocky",
        49 => "Gone with the Wind",
        50 => "One Flew Over the Cuckoo's Nest"
    ];

    public static array $awards = [
        "Academy Awards (Oscars), Golden Globe Awards",
        "BAFTA Awards, Screen Actors Guild Awards",
        "Cannes Film Festival, Berlin International Film Festival",
        "Venice Film Festival, Critics' Choice Movie Awards",
        "Independent Spirit Awards, Saturn Awards",
        "Annie Awards, British Independent Film Awards",
        "César Awards, Directors Guild of America Awards",
        "Producers Guild of America Awards, Writers Guild of America Awards",
        "European Film Awards, Gotham Awards",
        "Cinema Audio Society Awards, Costume Designers Guild Awards",
        "Hollywood Film Awards, ALMA Awards",
        "Screen Actors Guild Awards, AFI Awards",
        "American Cinema Editors Awards, Art Directors Guild Awards",
        "Satellite Awards, ACE Eddie Awards",
        "Animation Kobe Awards, BIFA Awards",
        "Daytime Emmy Awards, Evening Standard British Film Awards",
        "Gotham Independent Film Awards, Houston Film Critics Society Awards",
        "International Cinephile Society Awards, London Film Critics' Circle Awards",
        "Motion Picture Sound Editors Awards, National Film Awards UK",
        "OFTA Film Awards, Phoenix Film Critics Society Awards",
        "Royal Television Society Awards (UK), Sound Editors' Golden Reel Awards",
        "Southeastern Film Critics Association Awards, Fantasporto Awards",
        "Houston Film Critics Society Awards, Golden Globe Awards",
        "BAFTA Awards, Saturn Awards",
        "Cannes Film Festival, Costume Designers Guild Awards",
        "Directors Guild of America Awards, European Film Awards",
        "Critics' Choice Movie Awards, Gotham Awards",
        "Annie Awards, Hollywood Film Awards",
        "Screen Actors Guild Awards, American Cinema Editors Awards",
        "Daytime Emmy Awards, International Cinephile Society Awards",
        "Venice Film Festival, Producers Guild of America Awards",
        "Writers Guild of America Awards, AFI Awards",
        "Art Directors Guild Awards, Evening Standard British Film Awards",
        "Houston Film Critics Society Awards, London Film Critics' Circle Awards",
        "Cinema Audio Society Awards, Southeastern Film Critics Association Awards",
        "OFTA Film Awards, Royal Television Society Awards (UK)",
        "Golden Globe Awards, Screen Actors Guild Awards",
        "Berlin International Film Festival, Critics' Choice Movie Awards",
        "Independent Spirit Awards, British Independent Film Awards",
        "Saturn Awards, Cannes Film Festival",
        "Satellite Awards, Venice Film Festival",
        "ACE Eddie Awards, Directors Guild of America Awards"
    ];

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
            'name' => fake()->unique()->randomElement(self::$movies),
            'producer' => fake()->name(),
            'operator' => fake()->name(),
            'genre' => Genres::randomValue(),
            'production' => fake()->country(),
            'awards' => fake()->unique()->randomElement(self::$awards),
            'duration' => fake()->numberBetween(...$HOURS) + fake()->numberBetween(...$MINUTES),
            'advert_screenshot' => '/path/to/sreenshot/' . fake()->md5 . '.jpg',
            'status' => MovieStatuses::randomValue(),
            'price' => fake()->numberBetween(1_000_000, 20_000_000),
        ];
    }
}
