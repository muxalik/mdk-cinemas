<?php

namespace App\Http\Controllers;

use App\Filters\CinemaFilter;
use App\Http\Resources\CinemaResource;
use App\Models\Cinema;
use Illuminate\Http\Request;

class CinemaController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = (new CinemaFilter(
            $request,
            Cinema::query(),
        ))->handle();

        return CinemaResource::collection(
            $query->paginate(10),
        );
    }
}
