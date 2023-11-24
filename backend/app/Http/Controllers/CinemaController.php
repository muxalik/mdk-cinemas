<?php

namespace App\Http\Controllers;

use App\Filters\CinemaFilter;
use App\Http\Requests\UpstoreCinemaRequest;
use App\Http\Resources\CinemaResource;
use App\Http\Resources\ListCinemaResource;
use App\Models\Cinema;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

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

    public function store(
        UpstoreCinemaRequest $request
    ): Response | JsonResponse {
        $cinema = Cinema::create($request->validated());

        if (!$cinema) {
            return response()->json([
                'status' => 'Data not saved due to unexpected error',
            ], 500);
        }

        return response()->noContent();
    }

    public function update(
        Cinema $cinema,
        UpstoreCinemaRequest $request
    ): Response | JsonResponse {
        $ok = $cinema->update($request->validated());

        if (!$ok) {
            return response()->json([
                'status' => 'Data not saved due to unexpected error',
            ], 500);
        }

        return response()->noContent();
    }

    public function destroy(Cinema $cinema): Response | JsonResponse
    {
        if (!$cinema->delete()) {
            return response()->json([
                'status' => 'Data not saved due to unexpected error',
            ], 500);
        }

        return response()->noContent();
    }
}
