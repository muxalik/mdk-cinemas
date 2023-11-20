<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Cinema;
use App\Models\Movie;
use App\Models\Session;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfController extends Controller
{
    public function cinemasPdf()
    {
        $cinemas = Cinema::latest('id')->get();

        return Pdf::loadView('pdf.cinemas', compact('cinemas'))
            ->setPaper('a4', 'landscape')
            ->setWarnings(false)
            ->download('Cinemas.pdf');
    }

    public function moviesPdf()
    {
        $movies = Movie::latest('id')->get();

        return Pdf::loadView('pdf.movies', compact('movies'))
            ->setPaper('a4', 'landscape')
            ->setWarnings(false)
            ->download('Movies.pdf');
    }

    public function actorsPdf()
    {
        $actors = Actor::latest('id')->withCount('movies')->get();

        return Pdf::loadView('pdf.actors', compact('actors'))
            ->setPaper('a4', 'landscape')
            ->setWarnings(false)
            ->download('Actors.pdf');
    }

    public function sessionsPdf()
    {
        $sessions = Session::latest('id')
            ->with('movie', 'cinema')
            ->get();

        return Pdf::loadView('pdf.sessions', compact('sessions'))
            ->setPaper('a4', 'landscape')
            ->setWarnings(false)
            ->download('Sessions.pdf');
    }
}
