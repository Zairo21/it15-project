<?php
// File: app/Http/Controllers/StudentController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::query();

        if ($request->has('department')) {
            $query->where('department', $request->department);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('student_id', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $students = $query->paginate(20);

        return response()->json($students);
    }

    public function show($id)
    {
        $student = Student::findOrFail($id);
        return response()->json($student);
    }

    public function stats()
    {
        $stats = [
            'total' => Student::count(),
            'active' => Student::where('status', 'active')->count(),
            'inactive' => Student::where('status', 'inactive')->count(),
            'by_department' => Student::selectRaw('department, count(*) as count')
                                ->groupBy('department')
                                ->orderByDesc('count')
                                ->get(),
            'by_year_level' => Student::selectRaw('year_level, count(*) as count')
                                ->groupBy('year_level')
                                ->orderBy('year_level')
                                ->get(),
            'by_gender' => Student::selectRaw('gender, count(*) as count')
                            ->groupBy('gender')
                            ->get(),
            'monthly_enrollment' => Student::selectRaw('MONTHNAME(enrollment_date) as month, MONTH(enrollment_date) as month_num, count(*) as count')
                                    ->groupBy('month', 'month_num')
                                    ->orderBy('month_num')
                                    ->get(),
        ];

        return response()->json($stats);
    }
}
