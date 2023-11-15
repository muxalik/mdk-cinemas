<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->has('search')) {            
            return Movie::query()
                ->where('name', 'LIKE', '%' . $request->search . '%')
                ->latest('id')
                ->paginate(10);
        }

        return Movie::latest('id')->paginate(10);
    }
}
