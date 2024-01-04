<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Zajednica>
 */
class ZajednicaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv'=>$this->faker->name(), 
            'opis'=>$this->faker->sentance(),
            'brojTema'=>$this->faker->numberBetween(1, 5),
            'user_id'=>User::factory() 
        ];
    }
}
