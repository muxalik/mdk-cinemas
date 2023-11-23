<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class ActorFilter extends Filter
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
                        ->orWhere(function (Builder $query) use ($search) {
                            if (is_numeric($search)) {
                                $query
                                    ->has('movies', intval($search))
                                    ->orHas('moviesWithMainRole', intval($search));
                            }
                        });
                });
        }

        return $this;
    }

    public function sort(): self
    {
        $request = $this->request;

        if ($request->has('sort')) {
            $order = $request->order ? $request->order : 'ASC';

            switch (str($request->sort)->lower()) {
                case 'name':
                    $this->query->orderBy('name', $order);
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
