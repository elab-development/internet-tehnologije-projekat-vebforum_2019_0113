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
        $user_id = Auth::user()->id;

        //MODERATOR TEMA
        $jeModeratorTeme = Auth::user()->jeModeratorTeme;
        //MODERATOR ZAJEDNICA
        $jeModeratorZajednice = Auth::user()->jeModeratorZajednice;
        //ADMINISTRATOR
        $jeAdmin = Auth::user()->jeAdmin;
            
        if ($jeModeratorTeme || $jeModeratorZajednice || $jeAdmin) {
         return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator i moderatori nemaju ovlascenje da oznacavju objave svidjanjem!'], 403);
        }


        $objava = Objava::findOrFail($id);

        $objava->brojSvidjanja++;
        $objava->save();

        return new ObjavaResource($objava);
    }

    public function svidjaMiSeKomentar($id)
    {

        $user_id = Auth::user()->id;

        //MODERATOR TEMA
        $jeModeratorTeme = Auth::user()->jeModeratorTeme;
        //MODERATOR ZAJEDNICA
        $jeModeratorZajednice = Auth::user()->jeModeratorZajednice;
        //ADMINISTRATOR
        $jeAdmin = Auth::user()->jeAdmin;
            
        if ($jeModeratorTeme || $jeModeratorZajednice || $jeAdmin) {
         return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator i moderatori nemaju ovlascenje da oznacavju komentare svidjanjem!'], 403);
        }

        $komentar = Komentar::findOrFail($id);

        $komentar->brojSvidjanja++;
        $komentar->save();

        return new KomentarResource($komentar);
    }

}
