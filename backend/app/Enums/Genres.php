<?php

namespace App\Enums;

enum Genres: string
{
    case Action = 'Action';
    case Adventure = 'Adventure';
    case Comedy = 'Comedy';
    case Fantasy = 'Fantasy';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function randomValue(): mixed
    {
        return fake()->randomElement(self::values());
    }

    public static function items(): array
    {
        return array_map(fn (self $case) => [
            'key' => $case,
            'value' => $case->value,
        ], self::cases());
    }
}
