<?php

namespace App\Enums;

use App\Interfaces\EnumerableInterface;
use App\Interfaces\LocalizableInterface;
use App\Traits\Enumerable;
use App\Traits\Localizable;

enum CinemaStatuses: string implements
    EnumerableInterface,
    LocalizableInterface
{
    use Enumerable, Localizable;

    case Opened = 'opened';
    case Closed = 'closed';
}
