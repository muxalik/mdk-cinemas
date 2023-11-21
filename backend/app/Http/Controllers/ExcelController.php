<?php

namespace App\Http\Controllers;

use App\Exports\CinemaExport;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ExcelController extends Controller
{
    public function exportCinemas(): BinaryFileResponse
    {
        return (new CinemaExport)->download('cinemas.xlsx');
    }
}
