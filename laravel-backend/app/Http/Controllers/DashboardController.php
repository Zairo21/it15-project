<?php
// File: app/Http/Controllers/DashboardController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Course;
use App\Models\SchoolDay;

class DashboardController extends Controller
{
    public function overview()
    {
        // Monthly enrollment trends (bar chart data)
        $monthlyEnrollment = Student::selectRaw(
            'MONTHNAME(enrollment_date) as month,
             MONTH(enrollment_date) as month_num,
             count(*) as count'
        )
        ->groupBy('month', 'month_num')
        ->orderBy('month_num')
        ->get()
        ->map(fn($item) => [
            'month' => substr($item->month, 0, 3),
            'students' => $item->count,
        ]);

        // Course distribution by department (pie chart data)
        $courseDistribution = Course::selectRaw(
            'department, sum(enrolled_count) as value'
        )
        ->groupBy('department')
        ->orderByDesc('value')
        ->get()
        ->map(fn($item) => [
            'name' => $item->department,
            'value' => (int) $item->value,
        ]);

        // Monthly attendance patterns (line chart data)
        $attendancePatterns = SchoolDay::selectRaw(
            'month,
             MONTH(date) as month_num,
             ROUND(AVG(attendance_count)) as avg_attendance,
             COUNT(*) as school_days'
        )
        ->where('day_type', 'class_day')
        ->groupBy('month', 'month_num')
        ->orderBy('month_num')
        ->get()
        ->map(fn($item) => [
            'month' => substr($item->month, 0, 3),
            'attendance' => (int) $item->avg_attendance,
            'schoolDays' => $item->school_days,
        ]);

        // Summary stats
        $stats = [
            'totalStudents' => Student::count(),
            'activeStudents' => Student::where('status', 'active')->count(),
            'totalCourses' => Course::count(),
            'totalSchoolDays' => SchoolDay::where('day_type', 'class_day')->count(),
            'holidays' => SchoolDay::where('day_type', 'holiday')->count(),
            'avgAttendance' => round(SchoolDay::where('day_type', 'class_day')->avg('attendance_count')),
        ];

        return response()->json([
            'stats' => $stats,
            'monthlyEnrollment' => $monthlyEnrollment,
            'courseDistribution' => $courseDistribution,
            'attendancePatterns' => $attendancePatterns,
        ]);
    }
}
