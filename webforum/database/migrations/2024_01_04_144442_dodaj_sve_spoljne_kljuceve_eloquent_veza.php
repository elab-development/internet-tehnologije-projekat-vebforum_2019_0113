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
        //TABELA ZAJEDNICE
        Schema::table('zajednice', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('set null');
        });

        //TABELA TEME
        Schema::table('teme', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('zajednica_id')->nullable()->references('id')->on('zajednice')->onDelete('set null');
        });

        //TABELA OBJAVE
        Schema::table('objave', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('tema_id')->nullable()->references('id')->on('teme')->onDelete('set null');
        });

        //TABELA KOMENTARI
        Schema::table('komentari', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('objava_id')->nullable()->references('id')->on('objave')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //TABELA ZAJEDNICE
        Schema::table('zajednice', function (Blueprint $table) {
            $table->dropForeign('user_id');
        });


        //TABELA TEME
        Schema::table('teme', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropForeign('zajednica_id');
        });

        //TABELA OBJAVE
        Schema::table('objave', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropForeign('tema_id');
        });


        //TABELA KOMENTARI
        Schema::table('komentari', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropForeign('objava_id');
        });
    }
};
