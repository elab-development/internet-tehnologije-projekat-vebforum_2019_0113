<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objava extends Model
{
    use HasFactory;

    protected $table = 'objave';

    protected $fillable = [
        'naziv', 
        'tekst',
        'datumObjave',
        'brojSvidjanja',
        'brojNesvidjanja' 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tema()
    {
        return $this->belongsTo(Tema::class);
    }

    public function komentari()
    {
        return $this->hasMany(Komentar::class);
    }
}
