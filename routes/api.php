<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/authenticated-user', [\App\Http\Controllers\Api\UserController::class, 'authenticatedUser']);
});
