<?php

namespace App\Http\Controllers;

use App\Filters\SessionFilter;
use App\Http\Resources\SessionResource;
use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = (new SessionFilter(
            $request,
            Session::query()
        ))
            ->filter()
            ->search()
            ->sort()
            ->apply();

        return SessionResource::collection(
            $query->paginate(10)
        );
    }
}
