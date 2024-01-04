<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objava extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv', 
        'tekst',
        'datumObjave',
        'brojSvidjanja',
        'brojNesvidjanja' 
    ];
}
