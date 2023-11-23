<?php

namespace App\Http\Controllers;

use App\Filters\MovieFilter;
use App\Http\Resources\ListMovieResource;
use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MovieController extends Controller
{
    public function index(Request $request)
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

    public function list(): AnonymousResourceCollection
    {
        return ListMovieResource::collection(
            Movie::all(),
        );
    }
}
