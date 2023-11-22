<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CinemaFilter
{
    public function __construct(
        protected readonly Request $request,
        protected Builder $query,
    ) {
    }

    public function handle(): Builder
    {
        $this->search();
        $this->sort();
        $this->filter();

        return $this->query;
    }

    private function search(): void
    {
        $request = $this->request;

        if ($request->has('search')) {
            $search = str($request->search)->lower();

            $this->query
                ->where(function (Builder $query) use ($search) {
                    $query
                        ->where('name', 'LIKE', '%' . $search . '%')
                        ->orWhere('district', 'LIKE', '%' . $search . '%')
                        ->orWhere('address', 'LIKE', '%' . $search . '%')
                        ->orWhere('capacity', 'LIKE', '%' . $search . '%')
                        ->orWhere(function (Builder $query) use ($search) {
                            if (str_contains('opened', $search)) {
                                $query->where('is_opened', 1);
                            }

                            if (str_contains('closed', $search)) {
                                $query->where('is_opened', 0);
                            }
                        });
                });
        }
    }

    private function sort(): void
    {
        $request = $this->request;

        if ($request->has('sort')) {
            $order = $request->order ? $request->order : 'ASC';

            switch (str($request->sort)->lower()) {
                case 'cinema':
                    $this->query->orderBy('name', $order);
                    break;

                case 'district':
                    $this->query->orderBy('district', $order);
                    break;

                case 'address':
                    $this->query->orderBy('address', $order);
                    break;

                case 'capacity':
                    $this->query->orderBy('capacity', $order);
                    break;

                case 'status':
                    $this->query->orderBy('is_opened', $order);
                    break;

                default:
                    $this->query->latest('id');
                    break;
            }
        }
    }

    private function filter(): void
    {
        $request = $this->request;

        if ($request->has('min_capacity')) {
            $this->query->where(
                'capacity',
                '>=',
                intval($request->min_capacity)
            );
        }

        if ($request->has('max_capacity')) {
            $this->query->where(
                'capacity',
                '<=',
                intval($request->max_capacity)
            );
        }

        if ($request->has('status')) {
            switch ($request->status) {
                case 'opened': {
                        $this->query->where('is_opened', true);
                        break;
                    }

                case 'closed': {
                        $this->query->where('is_opened', false);
                        break;
                    }
            }
        }
    }
}