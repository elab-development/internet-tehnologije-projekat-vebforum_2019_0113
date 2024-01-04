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
        Schema::table('users', function (Blueprint $table) {
            $table->string('jeAdmin')->default(false); 
            $table->string('jeModeratorZajednice')->default(false); 
            $table->string('jeModeratorTeme')->default(false); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table ->dropColumn('jeAdmin');
            $table ->dropColumn('jeModeratorZajednice');
            $table ->dropColumn('jeModeratorTeme');
        });
    }
};
