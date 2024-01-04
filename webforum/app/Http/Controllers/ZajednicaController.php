<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ZajednicaResource;
use App\Models\Zajednica;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Auth;

class ZajednicaController extends Controller
{
    public function index()
    {
        $zajednice = Zajednica::all();
        return ZajednicaResource::collection($zajednice);
    }


    public function show($id)
    {
        $zajednica = Zajednica::findOrFail($id);
        return new ZajednicaResource($zajednica);
    }

    public function store(Request $request)
    {

        $user_id = Auth::user()->id; 

    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'opis' => 'required',

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
                    return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator i moderatori nemaju ovlascenje da kreiraju zajednice'], 403);
                }


    $zajednica = new Zajednica();
    $zajednica->naziv = $request->naziv;
    $zajednica->opis = $request->opis;
    $zajednica->brojTema = 0;
    $zajednica->user_id = $user_id;

    $zajednica->save();

    return response()->json(['Korisnik je uspesno kreirao zajednicu pod nazivom: '.$zajednica->naziv.'!!!',
         new ZajednicaResource($zajednica)]);
    }

    public function update(Request $request, $id)
    {

        $user_id = Auth::user()->id; 
        $jeModeratorZajednice = Auth::user()->jeModeratorZajednice;
        $zajednica_user_id = Zajednica::where('id', $id)->value('user_id');

        if($user_id != $zajednica_user_id || !$jeModeratorZajednice){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Zajednicu mogu menjati samo moderator zajednica ili korisnik koji ju je kreirao!'], 403);
        }

        $validator = Validator::make($request->all(), [
            'naziv' => 'required',
            'opis' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        $zajednica = Zajednica::findOrFail($id);

        $zajednica->naziv = $request->naziv;
        $zajednica->opis = $request->opis;
        $zajednica->brojTema = $request->brojtema;
        $zajednica->user_id = $user_id;

        $zajednica->save();

        return response()->json(['Zajednica je uspesno izmenjena!', new ZajednicaResource($zajednica)]);
    }


    public function updateOpis(Request $request, $id)
     {

        $user_id = Auth::user()->id; 
        $jeModeratorZajednice = Auth::user()->jeModeratorZajednice;
        $zajednica_user_id = Zajednica::where('id', $id)->value('user_id');

        if($user_id != $zajednica_user_id || !$jeModeratorZajednice){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Zajednicu mogu menjati samo moderator zajednica ili korisnik koji ju je kreirao!'], 403);
        }

         $request->validate([
             'opis' => 'required'
         ]);

         $zajednica = Zajednica::findOrFail($id);

         $zajednica->update(['opis' => $request->input('opis')]);

         return response()->json(['message' => 'Opis zajednice je uspesno izmenjen.', new ZajednicaResource($zajednica)]);
     }



    public function destroy($id)
    {

        $user_id = Auth::user()->id; 
        $jeModeratorZajednice = Auth::user()->jeModeratorZajednice;
        $zajednica_user_id = Zajednica::where('id', $id)->value('user_id');

        if($user_id != $zajednica_user_id || !$jeModeratorZajednice){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Zajednicu mogu brisati samo moderator zajednica ili korisnik koji ju je kreirao!'], 403);
        }

        $zajednica = zajednica::findOrFail($id);
        $zajednica->delete();
        return response()->json('Data zajednica je uspesno obrisana!');
    }
}
