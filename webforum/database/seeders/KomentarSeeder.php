<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Komentar;

class KomentarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        for ($i = 0; $i < 10; $i++) {
            Komentar::factory()->create([
                'user_id' => rand(4, 6), 
                'objava_id' => rand(1,8), 
            ]);
        }
    }
}
