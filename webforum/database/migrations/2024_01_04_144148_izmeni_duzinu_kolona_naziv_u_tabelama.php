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
        Schema::table('zajednice', function (Blueprint $table) {
            $table ->string('naziv', 100)->change();
        });
        Schema::table('teme', function (Blueprint $table) {
            $table ->string('naziv', 100)->change();
        });
        Schema::table('objave', function (Blueprint $table) {
            $table ->string('naziv', 100)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('zajednice', function (Blueprint $table) {
            $table ->string('naziv', 50)->change();
        });
        Schema::table('teme', function (Blueprint $table) {
            $table ->string('naziv', 50)->change();
        });
        Schema::table('objave', function (Blueprint $table) {
            $table ->string('naziv', 50)->change();
        });
    }
};
