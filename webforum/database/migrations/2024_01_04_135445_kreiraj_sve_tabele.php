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
        Schema::create('zajednice', function (Blueprint $table) {
            $table->id();
            $table->string('naziv',50);
            $table->string('opis',150);
            $table->integer('brojTema');
            $table->timestamps();
        });
        Schema::create('teme', function (Blueprint $table) {
            $table->id();
            $table->string('naziv',50);
            $table->string('opis',150);
            $table->timestamps();
        });
        Schema::create('objave', function (Blueprint $table) {
            $table->id();
            $table->string('naziv',50);
            $table->string('tekst',150);
            $table->date('datumObjave');
            $table->integer('brojSvidjanja');
            $table->integer('brojNesvidjanja');
            $table->timestamps();
        });
        Schema::create('komentari', function (Blueprint $table) {
            $table->id();
            $table->string('tekst',150);
            $table->date('datumKomentarisanja');
            $table->integer('brojSvidjanja');
            $table->integer('brojNesvidjanja');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zajednice');
        Schema::dropIfExists('teme');
        Schema::dropIfExists('objave');
        Schema::dropIfExists('komentari');
    }
};
