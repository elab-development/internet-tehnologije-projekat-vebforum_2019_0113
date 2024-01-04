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

        $objava->brojNesvidjanja++;
        $objava->save();

        return new ObjavaResource($objava);
    }

    public function nesvidjaMiSeKomentar($id)
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

        $komentar->brojNesvidjanja++;
        $komentar->save();

        return new KomentarResource($komentar);
    }
}
