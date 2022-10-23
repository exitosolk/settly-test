<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ClientsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function() {

    Route::get('/checkingAuthenticated', function(){
        return response()->json(['message'=>'Permission granted.','status'=>200], 200);
    });

    //client
    Route::get('view-client',[ClientsController::class,'index']);
    Route::post('store-client',[ClientsController::class,'store']);

});

Route::middleware(['auth:sanctum'])->group(function() {

    Route::post('logout',[AuthController::class,'logout']);
});

