<?php

namespace App\Http\Controllers;

use App\Filters\CinemaFilter;
use App\Http\Resources\CinemaResource;
use App\Http\Resources\ListCinemaResource;
use App\Models\Cinema;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CinemaController extends Controller
{
    public function index(Request $request)
    {
        $query = (new CinemaFilter(
            $request,
            Cinema::query()
        ))
            ->filter()
            ->search()
            ->sort()
            ->apply();

        return CinemaResource::collection(
            $query->paginate(10),
        );
    }

    public function list(): AnonymousResourceCollection
    {
        return ListCinemaResource::collection(
            Cinema::all(),
        );
    }
}
