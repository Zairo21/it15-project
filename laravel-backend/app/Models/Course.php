<?php
// File: app/Models/Course.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_code',
        'course_name',
        'department',
        'units',
        'instructor',
        'enrolled_count',
        'max_slots',
        'schedule',
        'room',
        'status',
    ];
}
