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
        Schema::table('teme', function (Blueprint $table) {
            $table->string('status')->default('Aktivna'); 
            $table->string('baner')->default('https://thumbs.dreamstime.com/b/transparent-pattern-background-simulation-alpha-channel-png-seamless-gray-white-squares-vector-design-grid-162521286.jpg'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('teme', function (Blueprint $table) {
            $table ->dropColumn('status');
            $table ->dropColumn('baner');
        });
    }
};
