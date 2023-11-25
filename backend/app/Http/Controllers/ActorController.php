<?php

namespace App\Http\Controllers;

use App\Filters\ActorFilter;
use App\Filters\ActorMovieFilter;
use App\Http\Requests\UpdateActorRequest;
use App\Http\Resources\ActorMovieResource;
use App\Http\Resources\ActorResource;
use App\Models\Actor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ActorController extends Controller
{
    public function index(Request $request)
    {
        $query = (new ActorFilter(
            $request,
            Actor::withCount('movies', 'moviesWithMainRole'),
        ))
            ->filter()
            ->search()
            ->sort()
            ->apply();

        return ActorResource::collection(
            $query->paginate(10)
        );
    }

    public function edit(
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

    public function update(
        Actor $actor,
        UpdateActorRequest $request
    ): Response {
        $actor->update($request->only('name'));

        collect($request->movies)
            ->each(function (array $movie) use ($actor) {
                $actor->movies()->updateExistingPivot(
                    $movie['id'],
                    [
                        'is_main_role' => $movie['is_main_role'],
                    ]
                );
            });

        $actor->movies()->detach($request->deleted_movies);

        return response()->noContent();
    }

    public function destroy(Actor $actor): Response | JsonResponse
    {
        if (!$actor->delete()) {
            return response()->json([
                'status' => 'Data not saved due to unexpected error',
            ], 500);
        }

        return response()->noContent();
    }
}
