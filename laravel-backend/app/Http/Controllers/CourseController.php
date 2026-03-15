<?php
// File: app/Http/Controllers/CourseController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::query();

        if ($request->has('department')) {
            $query->where('department', $request->department);
        }

        $courses = $query->get();
        return response()->json($courses);
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json($course);
    }

    public function distribution()
    {
        $distribution = Course::selectRaw('department, sum(enrolled_count) as total_enrolled, count(*) as course_count')
            ->groupBy('department')
            ->orderByDesc('total_enrolled')
            ->get();

        return response()->json($distribution);
    }
}
