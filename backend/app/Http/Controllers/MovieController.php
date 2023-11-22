<?php

namespace App\Http\Controllers;

use App\Filters\MovieFilter;
use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = (new MovieFilter(
            $request,
            Movie::query()
        ))
            ->filter()
            ->search()
            ->sort()
            ->apply();

        return MovieResource::collection(
            $query->paginate(10)
        );
    }
}
