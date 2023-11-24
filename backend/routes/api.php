<?php

use App\Http\Controllers\ActorController;
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

Route::prefix('cinemas')->group(function () {
    Route::get('pdf', [PdfController::class, 'exportCinemas']);
    Route::get('excel', [ExcelController::class, 'exportCinemas']);
    Route::get('list', [CinemaController::class, 'list']);
    Route::apiResource('/', CinemaController::class)->only('index');
});

Route::prefix('movies')->group(function () {
    Route::get('pdf', [PdfController::class, 'exportMovies']);
    Route::get('excel', [ExcelController::class, 'exportMovies']);
    Route::get('list', [MovieController::class, 'list']);
    Route::apiResource('/', MovieController::class)->only('index');
});

Route::get('pdf', [PdfController::class, 'exportActors']);
Route::get('excel', [ExcelController::class, 'exportActors']);
Route::apiResource('actors', ActorController::class);

Route::get('sessions/pdf', [PdfController::class, 'exportSessions']);
Route::get('sessions/excel', [ExcelController::class, 'exportSessions']);
Route::apiResource('sessions', SessionController::class);

Route::get('/genres', GenreController::class);
