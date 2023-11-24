<?php

namespace App\Interfaces;

use App\ValueObjects\LocalizedObj;

interface LocalizableInterface
{
    public function localize(): LocalizedObj;
}
