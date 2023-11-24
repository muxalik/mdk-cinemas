<?php

namespace App\Enums;

use App\Interfaces\EnumerableInterface;
use App\Traits\Enumerable;

enum MovieStatuses: string implements EnumerableInterface
{
    use Enumerable;

    case Available = 'Available';
    case NotAvailable = 'Not available';
}
