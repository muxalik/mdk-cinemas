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

    abstract public function filter(): self;
    abstract public function search(): self;
    abstract public function sort(): self;

    public function apply(): Builder
    {
        return $this->query;
    }
}
