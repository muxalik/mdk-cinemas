<?php

namespace App\Interfaces;

interface EnumerableInterface
{
    public static function values(): array;
    public static function randomValue(): mixed;
    public static function items(): array;
}
