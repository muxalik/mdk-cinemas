<?php

namespace App\Http\Controllers;

use App\Filters\ActorFilter;
use App\Http\Resources\ActorResource;
use App\Models\Actor;
use Illuminate\Http\Request;

class ActorController extends Controller
{
    public function __invoke(Request $request)
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
}
