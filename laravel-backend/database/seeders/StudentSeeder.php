<?php
// File: database/seeders/StudentSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use Carbon\Carbon;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            'College of Computer Studies',
            'College of Engineering',
            'College of Business Administration',
            'College of Education',
            'College of Arts and Sciences',
            'College of Nursing',
            'College of Criminology',
            'College of Architecture',
        ];

        $yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
        $genders = ['Male', 'Female'];

        $firstNames = [
            'Juan', 'Maria', 'Jose', 'Ana', 'Pedro', 'Rosa', 'Miguel', 'Carmen',
            'Antonio', 'Isabel', 'Francisco', 'Elena', 'Carlos', 'Lucia', 'Manuel',
            'Sofia', 'Rafael', 'Paula', 'Andres', 'Diana', 'Luis', 'Gabriela',
            'Roberto', 'Patricia', 'Eduardo', 'Melissa', 'Fernando', 'Jessica',
            'Ricardo', 'Sandra', 'Alejandro', 'Monica', 'Jorge', 'Claudia',
            'Ernesto', 'Veronica', 'Marcos', 'Natalia', 'Rodrigo', 'Stephanie',
        ];

        $lastNames = [
            'Santos', 'Reyes', 'Cruz', 'Bautista', 'Ocampo', 'Garcia', 'Mendoza',
            'Torres', 'Flores', 'Ramos', 'Aquino', 'Villanueva', 'Hernandez',
            'Dela Cruz', 'Gonzalez', 'Lopez', 'Morales', 'Castillo', 'Jimenez',
            'Ramirez', 'Diaz', 'Perez', 'Soria', 'Laguna', 'Pascual', 'Buenaventura',
            'Cayabyab', 'Domingo', 'Espiritu', 'Fernandez', 'Guevara', 'Ilagan',
        ];

        $addresses = [
            'Davao City', 'Tagum City', 'Digos City', 'Panabo City',
            'Mati City', 'Island Garden City of Samal', 'Nabunturan',
        ];

        for ($i = 1; $i <= 500; $i++) {
            $firstName = $firstNames[array_rand($firstNames)];
            $lastName = $lastNames[array_rand($lastNames)];
            $gender = $genders[array_rand($genders)];
            $department = $departments[array_rand($departments)];
            $yearLevel = $yearLevels[array_rand($yearLevels)];

            $enrollmentYear = rand(2021, 2024);
            $enrollmentMonth = rand(6, 8);

            Student::create([
                'student_id' => 'UM-' . str_pad($i, 5, '0', STR_PAD_LEFT),
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => strtolower($firstName) . '.' . strtolower(str_replace(' ', '', $lastName)) . $i . '@student.um.edu.ph',
                'gender' => $gender,
                'birthdate' => Carbon::create(rand(2000, 2006), rand(1, 12), rand(1, 28)),
                'address' => $addresses[array_rand($addresses)],
                'contact_number' => '09' . rand(100000000, 999999999),
                'department' => $department,
                'year_level' => $yearLevel,
                'status' => rand(0, 10) > 1 ? 'active' : 'inactive',
                'enrollment_date' => Carbon::create($enrollmentYear, $enrollmentMonth, rand(1, 20)),
            ]);
        }

        $this->command->info('✅ 500 students seeded successfully!');
    }
}
