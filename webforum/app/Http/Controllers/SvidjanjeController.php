<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ObjavaResource;
use App\Models\Objava;

use App\Http\Resources\KomentarResource;
use App\Models\Komentar;


class SvidjanjeController extends Controller
{
   
    public function svidjaMiSeObjava($id)
    {
        $objava = Objava::findOrFail($id);

        $objava->brojSvidjanja++;
        $objava->save();

        return new ObjavaResource($objava);
    }

    public function svidjaMiSeKomentar($id)
    {
        $komentar = Komentar::findOrFail($id);

        $komentar->brojSvidjanja++;
        $komentar->save();

        return new KomentarResource($komentar);
    }

}
