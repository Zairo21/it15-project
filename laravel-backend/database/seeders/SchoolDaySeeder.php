<?php
// File: database/seeders/SchoolDaySeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SchoolDay;
use Carbon\Carbon;

class SchoolDaySeeder extends Seeder
{
    public function run(): void
    {
        $holidays = [
            '2024-01-01' => 'New Year\'s Day',
            '2024-02-10' => 'Chinese New Year',
            '2024-02-25' => 'EDSA Anniversary',
            '2024-03-28' => 'Maundy Thursday',
            '2024-03-29' => 'Good Friday',
            '2024-04-09' => 'Araw ng Kagitingan',
            '2024-05-01' => 'Labor Day',
            '2024-06-12' => 'Independence Day',
            '2024-08-26' => 'National Heroes Day',
            '2024-11-01' => 'All Saints Day',
            '2024-11-30' => 'Bonifacio Day',
            '2024-12-25' => 'Christmas Day',
            '2024-12-30' => 'Rizal Day',
        ];

        $events = [
            '2024-02-14' => 'Valentine\'s Day Program',
            '2024-03-15' => 'Foundation Day',
            '2024-05-15' => 'Recognition Day',
            '2024-06-03' => 'Enrollment Period Ends',
            '2024-09-21' => 'University Week Celebration',
            '2024-10-31' => 'Halloween Campus Event',
            '2024-12-15' => 'Christmas Party',
        ];

        $start = Carbon::create(2024, 1, 1);
        $end = Carbon::create(2024, 12, 31);

        $current = $start->copy();
        while ($current <= $end) {
            $dateStr = $current->format('Y-m-d');
            $dayOfWeek = $current->dayOfWeek;

            if ($dayOfWeek == 0 || $dayOfWeek == 6) {
                // Skip weekends
                $current->addDay();
                continue;
            }

            $dayType = 'class_day';
            $title = null;
            $description = null;
            $attendance = rand(380, 490);

            if (isset($holidays[$dateStr])) {
                $dayType = 'holiday';
                $title = $holidays[$dateStr];
                $attendance = 0;
            } elseif (isset($events[$dateStr])) {
                $dayType = 'event';
                $title = $events[$dateStr];
                $attendance = rand(350, 490);
            }

            SchoolDay::create([
                'date' => $dateStr,
                'day_type' => $dayType,
                'title' => $title,
                'description' => $description,
                'attendance_count' => $attendance,
                'total_students' => 500,
                'month' => $current->format('F'),
                'year' => $current->year,
            ]);

            $current->addDay();
        }

        $this->command->info('✅ School days seeded for 2024!');
    }
}
