<?php

namespace App\Http\Controllers;

use App\Exports\CinemaExport;
use App\Exports\MovieExport;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ExcelController extends Controller
{
    public function exportCinemas(): BinaryFileResponse
    {
        return (new CinemaExport)->download('cinemas.xlsx');
    }

    public function exportMovies(): BinaryFileResponse
    {
        return (new MovieExport)->download('movies.xlsx');
    }
}
