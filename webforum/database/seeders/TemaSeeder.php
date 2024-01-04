<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Tema;
use App\Models\Zajednica;

class TemaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $zajednicas = Zajednica::all();
                
        foreach ($zajednicas as $zajednica) {
            $brojTema = $zajednica->brojTema;
            Tema::factory()->count($brojTema)->create([
                'zajednica_id' => $zajednica->id,
                'user_id' => rand(4, 6),
            ]);
        };
    }
}
