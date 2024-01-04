<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ObjavaResource;
use App\Models\Objava;
use Illuminate\Support\Facades\Validator;

use Carbon\Carbon;

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

    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'tekst' => 'required',
        'tema_id' => 'required',
        'user_id' => 'required',

    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }


    $objava = new Objava();
    $objava->naziv = $request->naziv;
    $objava->tekst = $request->tekst;
    $objava->datumObjave = Carbon::now()->format('Y-m-d');
    $objava->brojSvidjanja = 0;
    $objava->brojNesvidjanja = 0;
    $objava->tema_id = $request->tema_id;
    $objava->user_id = $request->user_id;

    $objava->save();

    return response()->json(['Korisnik je uspesno kreirao objavu!!!',
         new ObjavaResource($objava)]);
    }


    public function updateTekst(Request $request, $id)
     {
         $request->validate([
             'tekst' => 'required'
         ]);

         $objava = Objava::findOrFail($id);

         $objava->update(['tekst' => $request->input('tekst')]);

         return response()->json(['message' => 'Tekst objave je uspesno izmenjen.', new ObjavaResource($objava)]);
     }



    public function destroy($id)
    {
        $objava = objava::findOrFail($id);
        $objava->delete();
        return response()->json('Data objava je uspesno obrisana!');
    }
}
