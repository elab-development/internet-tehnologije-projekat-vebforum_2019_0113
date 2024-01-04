<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\Objava;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Komentar>
 */
class KomentarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tekst' =>$this->faker->sentence(),
            'datumKomentarisanja' =>now(),
            'brojSvidjanja' =>$this->faker->numberBetween($min = 100, $max = 1000),
            'brojNesvidjanja' =>$this->faker->numberBetween($min = 100, $max = 1000),
            'user_id' =>User::factory(), 
            'objava_id' =>Objava::factory(), 
        ];
    }
}
