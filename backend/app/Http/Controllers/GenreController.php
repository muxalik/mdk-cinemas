<?php

namespace App\Http\Controllers;

use App\Enums\Genres;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function __invoke(Request $request)
    {
        return Genres::items();
    }
}
