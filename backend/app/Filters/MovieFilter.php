<?php

namespace App\Filters;

use App\Enums\Genres;
use Illuminate\Database\Eloquent\Builder;

class MovieFilter extends Filter
{
    public function search(): self
    {
        $request = $this->request;

        if ($request->has('search')) {
            $search = strtolower($request->search);

            $this->query
                ->where(function (Builder $query) use ($search) {
                    $query
                        ->where('name', 'LIKE', '%' . $search . '%')
                        ->orWhere('producer', 'LIKE', '%' . $search . '%')
                        ->orWhere('operator', 'LIKE', '%' . $search . '%')
                        ->orWhere('genre', 'LIKE', '%' . $search . '%')
                        ->orWhere('production', 'LIKE', '%' . $search . '%')
                        ->orWhere('awards', 'LIKE', '%' . $search . '%')
                        ->orWhere('duration', 'LIKE', '%' . $search . '%')
                        ->orWhere(function (Builder $query) use ($search) {
                            if (str_contains('not available', $search)) {
                                $query->where('is_available', false);
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

                case 'producer':
                    $this->query->orderBy('producer', $order);
                    break;

                case 'operator':
                    $this->query->orderBy('operator', $order);
                    break;

                case 'genre':
                    $this->query->orderBy('genre', $order);
                    break;

                case 'production':
                    $this->query->orderBy('production', $order);
                    break;

                case 'awards':
                    $this->query->orderBy('awards', $order);
                    break;

                case 'duration':
                    $this->query->orderBy('duration', $order);
                    break;

                case 'status':
                    $this->query->orderBy('is_available', $order);
                    break;

                case 'price':
                    $this->query->orderBy('price', $order);
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

        if ($request->has('genres')) {
            if (is_array($request->genres)) {
                $this->query->where(
                    function (Builder $query) use ($request) {
                        foreach ($request->genres as $key) {
                            $genre = Genres::tryFrom($key);

                            if ($genre) {
                                $query->orWhere('genre', $genre->value);
                            }
                        }
                    }
                );
            }
        }

        if ($request->has('min_price')) {
            $this->query->where(
                'price',
                '>=',
                intval($request->min_price)
            );
        }

        if ($request->has('max_price')) {
            $this->query->where(
                'price',
                '<=',
                intval($request->max_price)
            );
        }

        if ($request->has('status')) {
            switch ($request->status) {
                case 'available': {
                        $this->query->where('is_available', true);
                        break;
                    }

                case 'not_available': {
                        $this->query->where('is_available', false);
                        break;
                    }
            }
        }

        return $this;
    }
}
