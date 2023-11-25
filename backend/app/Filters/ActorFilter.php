<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class ActorFilter extends Filter
{
    public function search(): self
    {
        $request = $this->request;

        if ($request->has('search')) {
            $search = strtolower($request->search);

            $this->query
                ->where(function (Builder $query) use ($search) {
                    $query
                        ->where('name', 'LIKE', '%' . $search . '%');

                    if (is_numeric($search)) {
                        $query
                            ->orWhereHas('movies', null, '=', intval($search))
                            ->orWhereHas('moviesWithMainRole', null, '=', intval($search));
                    }
                });
        }

        return $this;
    }

    public function sort(): self
    {
        $request = $this->request;

        if ($request->has('sort')) {
            $order = $request->order ? $request->order : 'ASC';

            switch (strtolower($request->sort)) {
                case 'name':
                    $this->query->orderBy('name', $order);
                    break;

                case 'total_movies':
                    $this->query
                        ->withCount('movies')
                        ->orderBy('movies_count', $order);
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

        if ($request->has('min_movies')) {
            $this->query->whereHas(
                'movies',
                fn () => true,
                '>=',
                intval($request->min_movies)
            );
        }

        if ($request->has('max_movies')) {
            $this->query->whereHas(
                'movies',
                fn () => true,
                '<=',
                intval($request->max_movies)
            );
        }

        if ($request->has('min_main_roles')) {
            $this->query->whereHas(
                'moviesWithMainRole',
                fn () => true,
                '>=',
                intval($request->min_main_roles)
            );
        }

        if ($request->has('max_main_roles')) {
            $this->query->whereHas(
                'moviesWithMainRole',
                fn () => true,
                '<=',
                intval($request->max_main_roles)
            );
        }

        return $this;
    }
}
