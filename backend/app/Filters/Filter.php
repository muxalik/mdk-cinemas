<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class Filter
{
    public function __construct(
        protected readonly Request $request,
        protected Builder $query,
    ) {
    }

    public function apply(): Builder
    {
        return $this->query;
    }
}
