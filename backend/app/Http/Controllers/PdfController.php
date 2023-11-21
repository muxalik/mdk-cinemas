<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Cinema;
use App\Models\Movie;
use App\Models\Session;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfController extends Controller
{
    public function exportCinemas()
    {
        $cinemas = Cinema::latest('id')->get();

        return Pdf::loadView('pdf.cinemas', compact('cinemas'))
            ->setPaper('a4', 'landscape')
            ->setWarnings(false)
            ->download('cinemas.pdf');
    }

    public function exportMovies()
    {
        $movies = Movie::latest('id')->get();

        return Pdf::loadView('pdf.movies', compact('movies'))
            ->setPaper('a4', 'landscape')
            ->setWarnings(false)
            ->download('movies.pdf');
    }

    public function exportActors()
    {
        $actors = Actor::latest('id')->withCount('movies')->get();

        return Pdf::loadView('pdf.actors', compact('actors'))
            ->setPaper('a4', 'landscape')
            ->setWarnings(false)
            ->download('actors.pdf');
    }

    public function exportSessions()
    {
        $sessions = Session::latest('id')
            ->with('movie', 'cinema')
            ->get();

        return Pdf::loadView('pdf.sessions', compact('sessions'))
            ->setPaper('a4', 'landscape')
            ->setWarnings(false)
            ->download('sessions.pdf');
    }
}
