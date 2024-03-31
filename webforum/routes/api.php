<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KomentarController;
use App\Http\Controllers\ObjavaController;
use App\Http\Controllers\TemaController;
use App\Http\Controllers\ZajednicaController;

use App\Http\Controllers\SvidjanjeController;
use App\Http\Controllers\NesvidjanjeController;
use App\Http\Controllers\StatistikaController;

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

//login i registracija
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

//KORISNICI
Route::get('users', [UserController::class, 'index']);
Route::get('users/{id}', [UserController::class, 'show']); 

//TEME
Route::get('teme', [TemaController::class, 'index']);
Route::get('teme/{id}', [TemaController::class, 'show']); 

//OBJAVE
Route::get('objave', [ObjavaController::class, 'index']);
Route::get('objave/{id}', [ObjavaController::class, 'show']); 

//KOMENTARI
Route::get('komentari', [KomentarController::class, 'index']);
Route::get('komentari/{id}', [KomentarController::class, 'show']); 
 
//RUTE ZA KOJE NAM TREBA LOGIN
Route::middleware(['auth:sanctum'])->group(function () {

    //ZAJEDNICE
    Route::resource('zajednice', ZajednicaController::class);

    //TEME
    Route::post('teme', [TemaController::class, 'store']);
    Route::put('teme/{id}', [TemaController::class, 'update']); 
    Route::delete('teme/{id}', [TemaController::class, 'destroy']);

    //OBJAVE
    Route::post('objave', [ObjavaController::class, 'store']);
    Route::patch('objave/izmeniTekst/{id}', [ObjavaController::class, 'updateTekst']);
    Route::delete('objave/{id}', [ObjavaController::class, 'destroy']);

    //KOMENTARI
    Route::post('komentari', [KomentarController::class, 'store']);
    Route::patch('komentari/izmeniTekst/{id}', [KomentarController::class, 'updateTekst']);
    Route::delete('komentari/{id}', [KomentarController::class, 'destroy']);

    //SVIDJANJE I NESVIDJANJE OBJAVA
    Route::post('/svidjanje/objava/{id}', [SvidjanjeController::class, 'svidjaMiSeObjava']);
    Route::post('/nesvidjanje/objava/{id}', [NesvidjanjeController::class, 'nesvidjaMiSeObjava']);


    //SVIDJANJE I NESVIDJANJE KOMENTARA
    Route::post('/svidjanje/komentar/{id}', [SvidjanjeController::class, 'svidjaMiSeKomentar']);
    Route::post('/nesvidjanje/komentar/{id}', [NesvidjanjeController::class, 'nesvidjaMiSeKomentar']);

    //STATISTIKE
    Route::get('/statistika', [StatistikaController::class, 'statistika']);

    //LOGOUT
    Route::post('logout', [AuthController::class, 'logout']);

});