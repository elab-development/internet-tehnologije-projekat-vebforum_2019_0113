<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Objava;

class ObjavaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        for ($i = 0; $i < 10; $i++) {
            Objava::factory()->create([
                'user_id' => rand(4, 6),
                'tema_id' => rand(1,5),
            ]);
        }
    }
}
