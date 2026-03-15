<?php
// File: app/Models/SchoolDay.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolDay extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'day_type',
        'title',
        'description',
        'attendance_count',
        'total_students',
        'month',
        'year',
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
