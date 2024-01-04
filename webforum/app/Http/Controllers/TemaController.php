<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\TemaResource;
use App\Models\Tema;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TemaController extends Controller
{
    public function index()
    {
        $teme = Tema::all();
        return TemaResource::collection($teme);
    }


    public function show($id)
    {
        $tema = Tema::findOrFail($id);
        return new TemaResource($tema);
    }

    public function store(Request $request)
    {

    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'opis' => 'required',
        'baner' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'zajednica_id' => 'required',
        'user_id' => 'required',

    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }


    $imeBanera = Str::random(32).".".$request->baner->getClientOriginalExtension();

    $tema = new Tema();
    $tema->naziv = $request->naziv;
    $tema->opis = $request->opis;
    $tema->status = 'Aktivna';
    $tema->baner = $imeBanera;
    $tema->zajednica_id = $request->zajednica_id;

    //povecavanje broja tema za datu zajednicu
    $zajednica = Zajednica::find($tema->zajednica_id);
    if ($zajednica) {
        $zajednica->brojTema++;
        $zajednica->save();
    }


    $tema->user_id = $request->user_id;

    $tema->save();

    //cuvanje slike banera u folderu storage
    Storage::disk('public')->put($imeBanera, file_get_contents($request->baner));

    return response()->json(['Korisnik je uspesno kreirao temu pod nazivom: '.$tema->naziv.'!!!',
         new TemaResource($tema)]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required',
            'opis' => 'required',
            'baner' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'zajednica_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        $tema = Tema::findOrFail($id);

        $tema->naziv = $request->naziv;
        $tema->opis = $request->opis;

        if($request->baner) {
            // Public storage
            $storage = Storage::disk('public');

            // Brisanje stare slike
            if($storage->exists($tema->baner))
                $storage->delete($tema->baner);

            //generisanje imena slike 
            $imeBanera = Str::random(32).".".$request->baner->getClientOriginalExtension();
            //cuva se nova baner
            $tema->baner = $imeBanera;

            // Image save in public folder
            $storage->put($imeBanera, file_get_contents($request->baner));
        }


        $tema->zajednica_id = $request->zajednica_id;
        $tema->user_id = $request->user_id;


        $tema->save();

        return response()->json(['Tema je uspesno izmenjena!', new TemaResource($tema)]);
    }


    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required'
        ]);

        $tema = Tema::findOrFail($id);

        $tema->update(['status' => $request->input('status')]);

        return response()->json(['message' => 'Status teme je uspesno izmenjen.', new TemaResource($tema)]);
    }



    public function destroy($id)
    {
        $tema = tema::findOrFail($id);
          // Public storage
          $storage = Storage::disk('public');

          // Brisanje slike banera iz foldera storage
          if($storage->exists($tema->baner))
              $storage->delete($tema->baner);

        $tema->delete();
        return response()->json('Data tema je uspesno obrisana!');
    }
}
