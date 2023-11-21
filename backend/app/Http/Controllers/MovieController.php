<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->has('search')) {
            $movies = Movie::query()
                ->where('name', 'LIKE', '%' . $request->search . '%')
                ->latest('id')
                ->paginate(10);

            return MovieResource::collection($movies);
        }

        return MovieResource::collection(
            Movie::latest('id')->paginate(10)
        );
    }
}
