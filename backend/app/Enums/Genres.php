<?php

namespace App\Enums;

enum Genres: string
{
    case Action = 'action';
    case Adventure = 'adventure';
    case Comedy = 'comedy';
    case Fantasy = 'fantasy';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function randomValue(): mixed
    {
        return fake()->randomElement(self::values());
    }
}
