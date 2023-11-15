<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActorResource;
use App\Models\Actor;
use Illuminate\Http\Request;

class ActorController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = Actor::query()
            ->latest('id')
            ->withCount('movies');

        if ($request->has('search')) {
            $query->where('name', 'LIKE', '%' . $request->search . '%');
        }

        return ActorResource::collection($query->paginate(10));
    }
}
