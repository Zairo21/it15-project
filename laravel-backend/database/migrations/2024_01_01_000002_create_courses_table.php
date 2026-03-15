<?php
// File: database/migrations/xxxx_create_courses_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course_code')->unique();
            $table->string('course_name');
            $table->string('department');
            $table->integer('units');
            $table->string('instructor');
            $table->integer('enrolled_count')->default(0);
            $table->integer('max_slots')->default(40);
            $table->string('schedule');
            $table->string('room');
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
