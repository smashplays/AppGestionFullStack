<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('terminados', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('model');
            $table->string('serial');
            $table->string('password')->nullable();
            $table->string('charger')->nullable();
            $table->string('pattern')->nullable();
            $table->string('task');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('terminados');
    }
};
