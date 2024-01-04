<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zajednica extends Model
{
    use HasFactory;

    protected $table = 'zajednice';

    protected $fillable = [
        'naziv', 
        'opis',
        'brojTema' 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function teme()
    {
        return $this->hasMany(Tema::class);
    }
}
