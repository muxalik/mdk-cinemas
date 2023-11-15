<?php

namespace App\Http\Controllers;

use App\Models\Cinema;

class CinemaController extends Controller
{
    public function __invoke()
    {
        return Cinema::latest('id')->paginate(10);
    }
}
