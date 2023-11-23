<?php

namespace App\Filters;

use App\Models\Cinema;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Builder;

class SessionFilter extends Filter
{
    public function search(): self
    {
        $request = $this->request;

        if ($request->has('search')) {
            $search = strtolower($request->search);

            $this->query
                ->where(function (Builder $query) use ($search) {
                    $query
                        ->whereHas('cinema', function (Builder $query) use ($search) {
                            $query->where('name', 'LIKE', '%' . $search . '%');
                        })
                        ->orWhereHas('movie', function (Builder $query) use ($search) {
                            $query->where('name', 'LIKE', '%' . $search . '%');
                        })
                        ->orWhere('starts_at', 'LIKE', '%' . $search . '%');
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
                case 'cinema':
                    $this->query->orderBy(
                        Cinema::select('name')
                            ->whereColumn('cinemas.id', 'sessions.cinema_id'),
                        $order,
                    );
                    break;

                case 'movie':
                    $this->query->orderBy(
                        Movie::select('name')
                            ->whereColumn('movies.id', 'sessions.movie_id'),
                        $order,
                    );
                    break;

                case 'ticket_price':
                    $this->query->orderBy('ticket_price', $order);
                    break;

                case 'free_places':
                    $this->query->orderBy('free_places', $order);
                    break;

                case 'starts':
                    $this->query->orderBy('starts_at', $order);
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

        // if ($request->has('genres')) {
        //     if (is_array($request->genres)) {
        //         $this->query->where(
        //             function (Builder $query) use ($request) {
        //                 foreach ($request->genres as $key) {
        //                     $genre = Genres::tryFrom($key);

        //                     if ($genre) {
        //                         $query->orWhere('genre', $genre->value);
        //                     }
        //                 }
        //             }
        //         );
        //     }
        // }

        if ($request->has('min_ticket_price')) {
            $this->query->where(
                'ticket_price',
                '>=',
                intval($request->min_ticket_price)
            );
        }

        if ($request->has('max_ticket_price')) {
            $this->query->where(
                'ticket_price',
                '<=',
                intval($request->max_ticket_price)
            );
        }

        if ($request->has('min_free_places')) {
            $this->query->where(
                'free_places',
                '>=',
                intval($request->min_free_places)
            );
        }

        if ($request->has('max_free_places')) {
            $this->query->where(
                'free_places',
                '<=',
                intval($request->max_free_places)
            );
        }

        return $this;
    }
}
