<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;

class ActorMovieFilter
{
    public static function sort(BelongsToMany $movies, Request $request)
    {
        $query = $movies;

        $order = $request->order ? $request->order : 'ASC';
        $sort = strtolower($request->sort);

        switch ($sort) {
            case 'name':
                $query->orderBy('name', $order);
                break;

            case 'main_role':
                $query->orderByPivot('is_main_role', $order);
                break;

            default:
                $query->latest('id');
                break;
        }

        return $query;
    }
}
