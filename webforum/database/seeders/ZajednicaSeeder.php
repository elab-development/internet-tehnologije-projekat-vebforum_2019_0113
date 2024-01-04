<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Zajednica;

class ZajednicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */



    public function run(): void
    {
        
        for ($i = 0; $i < 5; $i++) {
            Zajednica::factory()->create([
                'user_id' => rand(4, 6), 
            ]);
        }
    }

}
