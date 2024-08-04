<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:api');

Route::get('/users', function () {
    return User::all();
});

Route::get('/jobs', function () {
    return \App\Models\Job::all();
});