<?php

namespace App\Http\Controllers;

use App\Filters\ActorFilter;
use App\Http\Resources\ActorResource;
use App\Models\Actor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
