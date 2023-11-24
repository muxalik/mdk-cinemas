<?php

namespace App\Enums;

use App\Interfaces\EnumerableInterface;
use App\Traits\Enumerable;

enum Genres: string implements EnumerableInterface
{
    use Enumerable;

    case Action = 'Action';
    case Adventure = 'Adventure';
    case Comedy = 'Comedy';
    case Fantasy = 'Fantasy';

    public static function items(): array
    {
        return array_map(fn (self $case) => [
            'key' => $case,
            'value' => $case->value,
        ], self::cases());
    }
}
