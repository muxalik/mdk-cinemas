<?php

use App\Http\Controllers\ActorController;
use App\Http\Controllers\CinemaController;
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

Route::get('cinemas', CinemaController::class);
Route::get('cinemas/pdf', [PdfController::class, 'cinemasPdf']);

Route::get('movies', MovieController::class);
Route::get('movies/pdf', [PdfController::class, 'moviesPdf']);

Route::get('actors', ActorController::class);
Route::get('actors/pdf', [PdfController::class, 'actorsPdf']);

Route::get('sessions', SessionController::class);
Route::get('sessions/pdf', [PdfController::class, 'sessionsPdf']);
