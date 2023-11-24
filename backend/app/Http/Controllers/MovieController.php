<?php

namespace App\Http\Controllers;

use App\Filters\MovieFilter;
use App\Http\Requests\UpstoreMovieRequest;
use App\Http\Resources\ListMovieResource;
use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

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

    public function store(
        UpstoreMovieRequest $request
    ): Response | JsonResponse {
        $movie = Movie::create($request->validated());

        if (!$movie) {
            return response()->json([
                'status' => 'Data not saved due to unexpected error',
            ], 500);
        }

        return response()->noContent();
    }

    public function update(
        Movie $movie,
        UpstoreMovieRequest $request
    ): Response | JsonResponse {
        $ok = $movie->update($request->validated());

        if (!$ok) {
            return response()->json([
                'status' => 'Data not saved due to unexpected error',
            ], 500);
        }

        return response()->noContent();
    }

    public function destroy(Movie $movie): JsonResponse
    {
        if (!$movie->delete()) {
            return response()->json([
                'status' => 'Movie was not deleted due to unexpected error',
            ], 500);
        }

        return response()->noContent();
    }
}
