<?php

namespace App\Http\Controllers;

use App\Http\Resources\CinemaResource;
use App\Models\Cinema;
use Illuminate\Http\Request;

class CinemaController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = Cinema::query()->latest('id');

        if ($request->has('search')) {
            $query->where('name', 'LIKE', '%' . $request->search . '%');
        }

        return CinemaResource::collection($query->paginate(10));
    }
}
