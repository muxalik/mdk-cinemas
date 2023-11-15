<?php

use App\Http\Controllers\ActorController;
use App\Http\Controllers\CinemaController;
use App\Http\Controllers\MovieController;
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
Route::get('movies', MovieController::class);
Route::get('actors', ActorController::class);
