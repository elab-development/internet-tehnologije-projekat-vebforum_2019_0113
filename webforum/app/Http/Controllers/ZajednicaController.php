<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ZajednicaResource;
use App\Models\Zajednica;
use Illuminate\Support\Facades\Validator;

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

    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'opis' => 'required',
        'user_id' => 'required',

    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }


    $zajednica = new Zajednica();
    $zajednica->naziv = $request->naziv;
    $zajednica->opis = $request->opis;
    $zajednica->brojTema = 0;
    $zajednica->user_id = $request->user_id;

    $zajednica->save();

    return response()->json(['Korisnik je uspesno kreirao zajednicu pod nazivom: '.$zajednica->naziv.'!!!',
         new ZajednicaResource($zajednica)]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required',
            'opis' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        $zajednica = Zajednica::findOrFail($id);

        $zajednica->naziv = $request->naziv;
        $zajednica->opis = $request->opis;
        $zajednica->brojTema = $request->brojtema;
        $zajednica->user_id = $request->user_id;

        $zajednica->save();

        return response()->json(['Zajednica je uspesno izmenjena!', new ZajednicaResource($zajednica)]);
    }


    public function updateOpis(Request $request, $id)
     {
         $request->validate([
             'opis' => 'required'
         ]);

         $zajednica = Zajednica::findOrFail($id);

         $zajednica->update(['opis' => $request->input('opis')]);

         return response()->json(['message' => 'Opis zajednice je uspesno izmenjen.', new ZajednicaResource($zajednica)]);
     }



    public function destroy($id)
    {
        $zajednica = zajednica::findOrFail($id);
        $zajednica->delete();
        return response()->json('Data zajednica je uspesno obrisana!');
    }
}
