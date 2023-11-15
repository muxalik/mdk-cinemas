<?php

namespace App\Http\Controllers;

use App\Models\Cinema;
use Illuminate\Http\Request;

class CinemaController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->has('search')) {            
            return Cinema::query()
                ->where('name', 'LIKE', '%' . $request->search . '%')
                ->latest('id')
                ->paginate(10);
        }

        return Cinema::latest('id')->paginate(10);
    }
}
