<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ZajednicaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id_zajednice' => $this->id,
            'naziv_zajednice' => $this->naziv,
            'opis' => $this->opis,
            'broj_tema' => $this->brojTema,
            'korisnik' => new UserResource($this->user),
            
        ];
    }

    public function vratiNaziv()
    {
        return [
            'naziv' => $this->naziv,
        ];
    }
}

