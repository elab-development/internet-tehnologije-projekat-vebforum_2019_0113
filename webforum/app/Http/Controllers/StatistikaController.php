<?php

namespace App\Http\Controllers;

use App\Models\Objava;
use App\Models\Tema;
use App\Models\User;
use Illuminate\Http\Request;

class StatistikaController extends Controller
{
    public function statistika()
    {
        $ukupanBrojKorisnika = User::count();
        $ukupanBrojTema = Tema::count();
        $ukupanBrojObjava = Objava::count();

        $teme = Tema::withCount(['objave as objave_po_temi'])
            ->with(['objave' => function($query) {
                $query->orderBy('brojSvidjanja', 'desc')->first();
                $query->orderBy('brojSvidjanja', 'asc')->first();
            }])->get();

        $teme = $teme->map(function($tema) {
            $najboljaObjava = $tema->objave->sortByDesc('brojSvidjanja')->first();
            $najgoraObjava = $tema->objave->sortBy('brojSvidjanja')->first();
            unset($tema->objave);
            $tema->najboljaObjava = $najboljaObjava;
            $tema->najgoraObjava = $najgoraObjava;
            return $tema;
        });

        return response()->json([
            'ukupan_broj_korisnika' => $ukupanBrojKorisnika,
            'ukupan_broj_tema' => $ukupanBrojTema,
            'ukupan_broj_objava' => $ukupanBrojObjava,
            'teme' => $teme
        ]);
    }
}
