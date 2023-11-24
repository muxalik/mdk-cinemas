<?php

namespace App\ValueObjects;

class LocalizedObj
{
    public function __construct(
        public readonly string $value,
        public readonly string $locale,
    ) {
    }

    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
