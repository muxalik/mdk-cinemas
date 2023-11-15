<?php

namespace App\Http\Controllers;

use App\Models\Cinema;

class CinemaController extends Controller
{
    public function index()
    {
        return view('cinemas.index', [
            'cinemas' => Cinema::latest()->paginate(20),
        ]);
    }
}
