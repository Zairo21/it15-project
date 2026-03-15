<?php
// File: database/migrations/xxxx_create_school_days_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_days', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('day_type'); // class_day, holiday, event, suspension
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->integer('attendance_count')->default(0);
            $table->integer('total_students')->default(500);
            $table->string('month');
            $table->integer('year');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_days');
    }
};
