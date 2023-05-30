<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TerminadoController;
use App\Http\Controllers\LoginController;
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

Route::prefix('/clients')->group(function () {
    Route::middleware('login')->get('', [ClientController::class, 'getAll']);
    Route::middleware('validate.id', 'login')->get('/{id}', [ClientController::class, 'getById']);
    Route::middleware('login')->post('', [ClientController::class, 'post']);
    Route::middleware('validate.id', 'login')->delete('/{id}', [ClientController::class, 'delete']);
    Route::middleware('validate.id', 'login')->patch('/{id}', [ClientController::class, 'update']);
    Route::middleware('validate.id', 'login')->get('/{id}/documents', [ClientController::class, 'documents']);
    Route::middleware('validate.id', 'login')->get('/{id}/terminados', [ClientController::class, 'terminados']);
});

Route::prefix('/documents')->group(function () {
    Route::middleware('login')->get('', [DocumentController::class, 'getAll']);
    Route::middleware('validate.id', 'login')->get('/{id}', [DocumentController::class, 'getById']);
    Route::middleware('login')->post('', [DocumentController::class, 'post']);
    Route::middleware('validate.id', 'login')->delete('/{id}', [DocumentController::class, 'delete']);
    Route::middleware('validate.id', 'login')->patch('/{id}', [DocumentController::class, 'update']);
    Route::middleware('validate.id', 'login')->get('/{id}/client', [DocumentController::class, 'client']);
});

Route::prefix('/terminados')->group(function () {
    Route::middleware('login')->get('', [TerminadoController::class, 'getAll']);
    Route::middleware('validate.id', 'login')->get('/{id}', [TerminadoController::class, 'getById']);
    Route::middleware('login')->post('', [TerminadoController::class, 'post']);
    Route::middleware('validate.id', 'login')->delete('/{id}', [TerminadoController::class, 'delete']);
    Route::middleware('validate.id', 'login')->patch('/{id}', [TerminadoController::class, 'update']);
    Route::middleware('validate.id', 'login')->get('/{id}/client', [TerminadoController::class, 'client']);
});

Route::prefix('/users')->group(function () {
    Route::middleware('login')->get('', [LoginController::class, 'getUsers']);
    Route::middleware('login')->get('/logout', [LoginController::class, 'logout']);
    Route::middleware('login')->get('/me', [LoginController::class, 'whoAmI']);
    Route::middleware('validate.id', 'login')->get('/{id}', [LoginController::class, 'getById']);
    Route::middleware('validate.id', 'login')->patch('/{id}', [LoginController::class, 'updateUser']);
    Route::middleware('validate.id', 'login')->delete('/{id}', [LoginController::class, 'deleteUser']);
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register', [LoginController::class, 'crearUser']);
});

Route::prefix('/events')->group(function () {
    Route::middleware('login')->get('', [EventController::class, 'getAll']);
    Route::middleware('validate.id', 'login')->get('/{id}', [EventController::class, 'getById']);
    Route::middleware('login')->post('', [EventController::class, 'post']);
    Route::middleware('validate.id', 'login')->delete('/{id}', [EventController::class, 'delete']);
    Route::middleware('validate.id', 'login')->patch('/{id}', [EventController::class, 'update']);
});
