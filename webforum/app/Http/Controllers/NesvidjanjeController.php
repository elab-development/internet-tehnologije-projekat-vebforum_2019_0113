<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ObjavaResource;
use App\Models\Objava;

use App\Http\Resources\KomentarResource;
use App\Models\Komentar;

class NesvidjanjeController extends Controller
{
    public function nesvidjaMiSeObjava($id)
    {
        $objava = Objava::findOrFail($id);

        $objava->brojNesvidjanja++;
        $objava->save();

        return new ObjavaResource($objava);
    }

    public function nesvidjaMiSeKomentar($id)
    {
        $komentar = Komentar::findOrFail($id);

        $komentar->brojNesvidjanja++;
        $komentar->save();

        return new KomentarResource($komentar);
    }
}
