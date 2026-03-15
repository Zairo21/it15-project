<?php
// File: database/seeders/CourseSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            // Computer Studies
            ['code' => 'CS101', 'name' => 'Introduction to Computing', 'dept' => 'College of Computer Studies', 'units' => 3, 'instructor' => 'Dr. Ramon Cruz'],
            ['code' => 'CS201', 'name' => 'Data Structures and Algorithms', 'dept' => 'College of Computer Studies', 'units' => 3, 'instructor' => 'Prof. Elena Santos'],
            ['code' => 'CS301', 'name' => 'Database Management Systems', 'dept' => 'College of Computer Studies', 'units' => 3, 'instructor' => 'Dr. Miguel Reyes'],
            ['code' => 'CS401', 'name' => 'Software Engineering', 'dept' => 'College of Computer Studies', 'units' => 3, 'instructor' => 'Prof. Ana Mendoza'],
            ['code' => 'IT101', 'name' => 'Web Development', 'dept' => 'College of Computer Studies', 'units' => 3, 'instructor' => 'Dr. Jose Garcia'],
            ['code' => 'IT201', 'name' => 'Integrative Programming', 'dept' => 'College of Computer Studies', 'units' => 3, 'instructor' => 'Prof. Maria Torres'],
            // Engineering
            ['code' => 'ENG101', 'name' => 'Engineering Mathematics', 'dept' => 'College of Engineering', 'units' => 3, 'instructor' => 'Dr. Carlos Villanueva'],
            ['code' => 'ENG201', 'name' => 'Thermodynamics', 'dept' => 'College of Engineering', 'units' => 3, 'instructor' => 'Prof. Sofia Hernandez'],
            ['code' => 'ENG301', 'name' => 'Fluid Mechanics', 'dept' => 'College of Engineering', 'units' => 3, 'instructor' => 'Dr. Roberto Flores'],
            // Business
            ['code' => 'BUS101', 'name' => 'Principles of Management', 'dept' => 'College of Business Administration', 'units' => 3, 'instructor' => 'Dr. Patricia Ramos'],
            ['code' => 'BUS201', 'name' => 'Financial Accounting', 'dept' => 'College of Business Administration', 'units' => 3, 'instructor' => 'Prof. Eduardo Aquino'],
            ['code' => 'BUS301', 'name' => 'Marketing Management', 'dept' => 'College of Business Administration', 'units' => 3, 'instructor' => 'Dr. Melissa Castillo'],
            // Education
            ['code' => 'ED101', 'name' => 'Foundations of Education', 'dept' => 'College of Education', 'units' => 3, 'instructor' => 'Prof. Fernando Diaz'],
            ['code' => 'ED201', 'name' => 'Curriculum Development', 'dept' => 'College of Education', 'units' => 3, 'instructor' => 'Dr. Jessica Perez'],
            // Arts and Sciences
            ['code' => 'AS101', 'name' => 'General Biology', 'dept' => 'College of Arts and Sciences', 'units' => 3, 'instructor' => 'Dr. Andres Morales'],
            ['code' => 'AS201', 'name' => 'General Chemistry', 'dept' => 'College of Arts and Sciences', 'units' => 3, 'instructor' => 'Prof. Diana Lopez'],
            // Nursing
            ['code' => 'NUR101', 'name' => 'Anatomy and Physiology', 'dept' => 'College of Nursing', 'units' => 3, 'instructor' => 'Dr. Gabriela Gonzalez'],
            ['code' => 'NUR201', 'name' => 'Medical-Surgical Nursing', 'dept' => 'College of Nursing', 'units' => 3, 'instructor' => 'Prof. Luis Ramirez'],
            // Criminology
            ['code' => 'CRIM101', 'name' => 'Introduction to Criminology', 'dept' => 'College of Criminology', 'units' => 3, 'instructor' => 'Dr. Veronica Jimenez'],
            // Architecture
            ['code' => 'ARCH101', 'name' => 'Architectural Design I', 'dept' => 'College of Architecture', 'units' => 6, 'instructor' => 'Prof. Marcos Laguna'],
        ];

        $schedules = [
            'MWF 7:30-8:30 AM', 'MWF 8:30-9:30 AM', 'MWF 9:30-10:30 AM',
            'TTH 7:30-9:00 AM', 'TTH 9:00-10:30 AM', 'TTH 10:30-12:00 PM',
            'MWF 1:00-2:00 PM', 'TTH 1:00-2:30 PM',
        ];

        $rooms = ['Room 101', 'Room 102', 'Room 201', 'Room 202', 'Lab 301', 'Lab 302', 'Lecture Hall A', 'Lecture Hall B'];

        foreach ($courses as $course) {
            Course::create([
                'course_code' => $course['code'],
                'course_name' => $course['name'],
                'department' => $course['dept'],
                'units' => $course['units'],
                'instructor' => $course['instructor'],
                'enrolled_count' => rand(20, 40),
                'max_slots' => 40,
                'schedule' => $schedules[array_rand($schedules)],
                'room' => $rooms[array_rand($rooms)],
                'status' => 'active',
            ]);
        }

        $this->command->info('✅ 20 courses seeded successfully!');
    }
}
