<?php
// File: database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create default admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@um.edu.ph',
            'password' => Hash::make('password'),
        ]);

        $this->command->info('✅ Admin user created: admin@um.edu.ph / password');

        // Run all seeders
        $this->call([
            StudentSeeder::class,
            CourseSeeder::class,
            SchoolDaySeeder::class,
        ]);

        $this->command->info('🎉 All seeders completed successfully!');
    }
}
