<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\KomentarResource;
use App\Models\Komentar;
use App\Models\Objava;
use Illuminate\Support\Facades\Validator;

use Carbon\Carbon;

use Illuminate\Support\Facades\Auth;

class KomentarController extends Controller
{
    public function index()
    {
        $komentari = Komentar::all();
        return KomentarResource::collection($komentari);
    }


    public function show($id)
    {
        $komentar = Komentar::findOrFail($id);
        return new KomentarResource($komentar);
    }

    public function store(Request $request)
    {
        $user_id = Auth::user()->id; 

    $validator = Validator::make($request->all(), [
        'tekst' => 'required',
        'objava_id' => 'required',

    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }

            //MODERATOR TEMA
            $jeModeratorTeme = Auth::user()->jeModeratorTeme;
            //MODERATOR ZAJEDNICA
            $jeModeratorZajednice = Auth::user()->jeModeratorZajednice;
            //ADMINISTRATOR
            $jeAdmin = Auth::user()->jeAdmin;
    
            if ($jeModeratorTeme || $jeModeratorZajednice || $jeAdmin) {
                return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator i moderatori nemaju ovlascenje da ostavljaju komentare'], 403);
            }


    $komentar = new Komentar();
    $komentar->tekst = $request->tekst;
    $komentar->datumKomentarisanja = Carbon::now()->format('Y-m-d');
    $komentar->brojSvidjanja = 0;
    $komentar->brojNesvidjanja = 0;
    $komentar->objava_id = $request->objava_id;
    
    $objava = Objava::find($komentar->objava_id);

    $komentar->user_id = $user_id;

    $komentar->save();



    return response()->json(['Korisnik je uspesno ostavio komentar na objavi: '.$objava->naziv.' !!!',
         new KomentarResource($komentar)]);
    }


    public function updateTekst(Request $request, $id)
     {
        $user_id = Auth::user()->id; 
        $jeAdmin = Auth::user()->jeAdmin;
        $komentar_user_id = Komentar::where('id', $id)->value('user_id');

        if($user_id != $komentar_user_id && !$jeAdmin){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Komentar mogu menjati ili korisnik koji ga je kreirao ili admin!'], 403);
        }

         $request->validate([
             'tekst' => 'required'
         ]);

         $komentar = Komentar::findOrFail($id);

         $komentar->update(['tekst' => $request->input('tekst')]);

         return response()->json(['message' => 'Tekst komentara je uspesno izmenjen.', new KomentarResource($komentar)]);
     }



    public function destroy($id)
    {

        $user_id = Auth::user()->id; 
        $jeAdmin = Auth::user()->jeAdmin;
        $komentar_user_id = Komentar::where('id', $id)->value('user_id');

        if($user_id != $komentar_user_id && !$jeAdmin){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Komentar mogu brisati ili korisnik koji ga je kreirao ili admin!'], 403);
        }

        $komentar = komentar::findOrFail($id);

        $komentar->delete();
        return response()->json('Dati komentar je uspesno obrisan!');
    }
}
