<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\Tema;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Objava>
 */
class ObjavaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' =>$this->faker->name(), 
            'tekst' =>$this->faker->paragraph(),
            'datumObjave' =>now(),
            'brojSvidjanja' =>numberBetween($min = 100, $max = 1000),
            'brojNesvidjanja' =>numberBetween($min = 100, $max = 1000),
            'user_id' =>User::factory(), 
            'tema_id' =>Tema::factory(), 
        ];
    }
}
