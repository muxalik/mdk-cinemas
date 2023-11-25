<?php

namespace App\Http\Controllers;

use App\Filters\ActorMovieFilter;
use App\Http\Resources\ActorMovieResource;
use App\Models\Actor;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ActorMovieController extends Controller
{
    public function index(
        Actor $actor,
        Request $request
    ): AnonymousResourceCollection {
        $query = ActorMovieFilter::sort(
            $actor->movies(),
            $request,
        );

        return ActorMovieResource::collection(
            $query->get()
        );
    }

    public function destroy(Actor $actor, Movie $movie): Response
    {
        $actor->movies()->detach($movie->id);

        return response()->noContent();
    }
}
