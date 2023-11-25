<?php

namespace App\Enums;

use App\Interfaces\EnumerableInterface;
use App\Interfaces\LocalizableInterface;
use App\Traits\Enumerable;
use App\Traits\Localizable;

enum MovieStatuses: string implements
    EnumerableInterface,
    LocalizableInterface
{
    use Enumerable, Localizable;

    case Available = 'available';
    case NotAvailable = 'not_available';
}
