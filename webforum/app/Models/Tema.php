<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tema extends Model
{
    use HasFactory;

    protected $table = 'teme';

    protected $fillable = [
        'naziv', 
        'opis'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function zajednica()
    {
        return $this->belongsTo(Zajednica::class);
    }

    public function objave()
    {
        return $this->hasMany(Objava::class);
    }

}
