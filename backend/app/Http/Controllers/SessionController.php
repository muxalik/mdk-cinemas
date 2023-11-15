<?php

namespace App\Http\Controllers;

use App\Http\Resources\SessionResource;
use App\Models\Session;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = Session::query()
            ->with('movie', 'cinema')
            ->latest('id');

        if ($request->has('search')) {
            $query
                ->whereHas('cinema', function (Builder $query) use ($request) {
                    $query->where('name', 'LIKE', '%' . $request->search . '%');
                })
                ->orWhereHas('movie', function (Builder $query) use ($request) {
                    $query->where('name', 'LIKE', '%' . $request->search . '%');
                });
        }

        return SessionResource::collection($query->paginate(10));
    }
}
