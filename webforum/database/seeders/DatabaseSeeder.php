<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call(UserSeeder::class);
        $this->call(ZajednicaSeeder::class);
        $this->call(TemaSeeder::class);
        $this->call(ObjavaSeeder::class);
        $this->call(KomentarSeeder::class);

    }
}
