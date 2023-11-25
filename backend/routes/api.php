<?php

use App\Http\Controllers\ActorController;
use App\Http\Controllers\ActorMovieController;
use App\Http\Controllers\CinemaController;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('cinemas/pdf', [PdfController::class, 'exportCinemas']);
Route::get('cinemas/excel', [ExcelController::class, 'exportCinemas']);
Route::get('cinemas/list', [CinemaController::class, 'list']);
Route::apiResource('cinemas', CinemaController::class);

Route::get('movies/pdf', [PdfController::class, 'exportMovies']);
Route::get('movies/excel', [ExcelController::class, 'exportMovies']);
Route::get('movies/list', [MovieController::class, 'list']);
Route::apiResource('movies', MovieController::class);

Route::get('actors/pdf', [PdfController::class, 'exportActors']);
Route::get('actors/excel', [ExcelController::class, 'exportActors']);
Route::resource('actors', ActorController::class);

Route::get('sessions/pdf', [PdfController::class, 'exportSessions']);
Route::get('sessions/excel', [ExcelController::class, 'exportSessions']);
Route::apiResource('sessions', SessionController::class);

Route::get('/genres', GenreController::class);
