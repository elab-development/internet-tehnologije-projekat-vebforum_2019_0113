<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>"Administrator webforuma",
            'email'=>"admin_webforum@gmail.com",
            'password' =>  "admin",
            'jeAdmin' => true,
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name'=>"Kristijan Kestic",
            'email'=>"kiki123@gmail.com",
            'password' =>  "kiki123",
            'jeModeratorZajednice' => true,
            'remember_token' => Str::random(10),
        ]);


        User::create([
            'name'=>"Djina Mitic",
            'email'=>"djiki88@gmail.com",
            'password' =>  "djiki88",
            'jeModeratorTeme' => true,
            'remember_token' => Str::random(10),
        ]);

        User::factory()->times(3)->create();
    }
}
