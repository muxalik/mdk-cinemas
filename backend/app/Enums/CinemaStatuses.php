<?php

namespace App\Enums;

use App\Interfaces\EnumerableInterface;
use App\Traits\Enumerable;

enum CinemaStatuses: string implements EnumerableInterface
{
    use Enumerable;

    case Opened = 'Opened';
    case Closed = 'Closed';
}
