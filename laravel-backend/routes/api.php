<?php
// File: routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;

// Public routes (no auth needed)
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require valid Sanctum token)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Dashboard
    Route::get('/dashboard/overview', [DashboardController::class, 'overview']);

    // Students
    Route::get('/students', [StudentController::class, 'index']);
    Route::get('/students/stats', [StudentController::class, 'stats']);
    Route::get('/students/{id}', [StudentController::class, 'show']);

    // Courses
    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/distribution', [CourseController::class, 'distribution']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
});
