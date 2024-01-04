<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\KomentarResource;
use App\Models\Komentar;
use Illuminate\Support\Facades\Validator;

use Carbon\Carbon;

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

    $validator = Validator::make($request->all(), [
        'tekst' => 'required',
        'objava_id' => 'required',
        'user_id' => 'required',

    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }


    $komentar = new Komentar();
    $komentar->tekst = $request->tekst;
    $komentar->datumKomentarisanja = Carbon::now()->format('Y-m-d');
    $komentar->brojSvidjanja = 0;
    $komentar->brojNesvidjanja = 0;
    $komentar->objava_id = $request->objava_id;
    
    $objava = Objava::find($komentar->objava_id);

    $komentar->user_id = $request->user_id;

    $komentar->save();



    return response()->json(['Korisnik je uspesno ostavio komentar na objavi: '.$objava->naziv.' !!!',
         new KomentarResource($komentar)]);
    }


    public function updateTekst(Request $request, $id)
     {
         $request->validate([
             'tekst' => 'required'
         ]);

         $komentar = Komentar::findOrFail($id);

         $komentar->update(['tekst' => $request->input('tekst')]);

         return response()->json(['message' => 'Tekst komentara je uspesno izmenjen.', new KomentarResource($komentar)]);
     }



    public function destroy($id)
    {
        $komentar = komentar::findOrFail($id);
        $komentar->delete();
        return response()->json('Dati komentar je uspesno obrisan!');
    }
}
