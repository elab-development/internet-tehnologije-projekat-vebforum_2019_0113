<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Zajednica;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tema>
 */
class TemaFactory extends Factory
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
            'opis' =>$this->faker->sentence(),
            'status' =>$this->faker->randomElement($array= array('Aktivna','Neaktivna')),
            'baner' =>$this->faker->imageUrl(),
            'user_id' =>User::factory(), 
            'zajednica_id' =>Zajednica::factory(), 
        ];
    }
}
