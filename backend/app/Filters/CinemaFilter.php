<?php

namespace App\Filters;

use App\Enums\CinemaStatuses;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class CinemaFilter extends Filter
{
    public function search(): self
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
                        ->orWhere('status', 'LIKE', '%' . $search . '%');
                });
        }

        return $this;
    }

    public function sort(): self
    {
        $request = $this->request;

        if ($request->has('sort')) {
            $order = $request->order ? $request->order : 'ASC';
            $sort = strtolower($request->sort);

            switch ($sort) {
                case 'name':
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
                    $this->query->orderBy('status', $order);
                    break;

                default:
                    $this->query->latest('id');
                    break;
            }
        }

        return $this;
    }

    public function filter(): self
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
            $status = CinemaStatuses::tryFrom($request->status);

            Log::alert('123', [$request->status]);
            if ($status) {
                $this->query->where('status', $status->value);
            }
        }

        return $this;
    }
}
