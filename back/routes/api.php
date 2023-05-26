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
    Route::get('', [ClientController::class, 'getAll']);
    Route::middleware('validate.id')->get('/{id}', [ClientController::class, 'getById']);
    Route::post('', [ClientController::class, 'post']);
    Route::middleware('validate.id')->delete('/{id}', [ClientController::class, 'delete']);
    Route::middleware('validate.id')->patch('/{id}', [ClientController::class, 'update']);
    Route::middleware('validate.id')->get('/{id}/documents', [ClientController::class, 'documents']);
    Route::middleware('validate.id')->get('/{id}/terminados', [ClientController::class, 'terminados']);
});

Route::prefix('/documents')->group(function () {
    Route::get('', [DocumentController::class, 'getAll']);
    Route::middleware('validate.id')->get('/{id}', [DocumentController::class, 'getById']);
    Route::post('', [DocumentController::class, 'post']);
    Route::middleware('validate.id')->delete('/{id}', [DocumentController::class, 'delete']);
    Route::middleware('validate.id')->patch('/{id}', [DocumentController::class, 'update']);
    Route::middleware('validate.id')->get('/{id}/client', [DocumentController::class, 'client']);
});

Route::prefix('/terminados')->group(function () {
    Route::get('', [TerminadoController::class, 'getAll']);
    Route::middleware('validate.id')->get('/{id}', [TerminadoController::class, 'getById']);
    Route::post('', [TerminadoController::class, 'post']);
    Route::middleware('validate.id')->delete('/{id}', [TerminadoController::class, 'delete']);
    Route::middleware('validate.id')->patch('/{id}', [TerminadoController::class, 'update']);
    Route::middleware('validate.id')->get('/{id}/client', [TerminadoController::class, 'client']);
});

Route::prefix('/users')->group(function () {
    Route::get('', [LoginController::class, 'getUsers']);
    Route::middleware('login')->get('/logout', [LoginController::class, 'logout']);
    Route::middleware('login')->get('/me', [LoginController::class, 'whoAmI']);
    Route::middleware('validate.id')->get('/{id}', [LoginController::class, 'getById']);
    Route::middleware('validate.id')->patch('/{id}', [LoginController::class, 'updateUser']);
    Route::middleware('validate.id')->delete('/{id}', [LoginController::class, 'deleteUser']);
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register', [LoginController::class, 'crearUser']);
});

Route::prefix('/events')->group(function () {
    Route::get('', [EventController::class, 'getAll']);
    Route::middleware('validate.id')->get('/{id}', [EventController::class, 'getById']);
    Route::post('', [EventController::class, 'post']);
    Route::middleware('validate.id')->delete('/{id}', [EventController::class, 'delete']);
    Route::middleware('validate.id')->patch('/{id}', [EventController::class, 'update']);
});
