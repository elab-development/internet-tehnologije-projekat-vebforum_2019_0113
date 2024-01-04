<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ObjavaResource;
use App\Models\Objava;
use Illuminate\Support\Facades\Validator;

use Carbon\Carbon;

use Illuminate\Support\Facades\Auth;

class ObjavaController extends Controller
{
    public function index()
    {
        $objave = Objava::all();
        return ObjavaResource::collection($objave);
    }


    public function show($id)
    {
        $objava = Objava::findOrFail($id);
        return new ObjavaResource($objava);
    }

    public function store(Request $request)
    {

        $user_id = Auth::user()->id; 

    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'tekst' => 'required',
        'tema_id' => 'required',


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
                return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator i moderatori nemaju ovlascenje da kreiraju objave'], 403);
            }

    $objava = new Objava();
    $objava->naziv = $request->naziv;
    $objava->tekst = $request->tekst;
    $objava->datumObjave = Carbon::now()->format('Y-m-d');
    $objava->brojSvidjanja = 0;
    $objava->brojNesvidjanja = 0;
    $objava->tema_id = $request->tema_id;
    $objava->user_id = $user_id;

    $objava->save();

    return response()->json(['Korisnik je uspesno kreirao objavu!!!',
         new ObjavaResource($objava)]);
    }


    public function updateTekst(Request $request, $id)
     {
        $user_id = Auth::user()->id; 
        $jeAdmin = Auth::user()->jeAdmin;
        $objava_user_id = Objava::where('id', $id)->value('user_id');

        if($user_id != $objava_user_id || !$jeAdmin){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Objavu mogu menjati ili korisnik koji ju je kreirao ili admin!'], 403);
        }

         $request->validate([
             'tekst' => 'required'
         ]);

         $objava = Objava::findOrFail($id);

         $objava->update(['tekst' => $request->input('tekst')]);

         return response()->json(['message' => 'Tekst objave je uspesno izmenjen.', new ObjavaResource($objava)]);
     }



    public function destroy($id)
    {

        $user_id = Auth::user()->id; 
        $jeAdmin = Auth::user()->jeAdmin;
        $objava_user_id = Objava::where('id', $id)->value('user_id');

        if($user_id != $objava_user_id || !$jeAdmin){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Objavu mogu brisati ili korisnik koji ju je kreirao ili admin!'], 403);
        }


        $objava = objava::findOrFail($id);
        $objava->delete();
        return response()->json('Data objava je uspesno obrisana!');
    }
}
