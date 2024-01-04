<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KomentarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ID Komentara: ' => $this->resource->id,
            'Tekst komentara: '=> $this->resource->tekst,
            'Datum komentarisanja: '=> $this->resource->datumKomentarisanja,
            'Broj svidjanja: '=> $this->resource->brojSvidjanja,
            'Broj nesvidjanja: '=> $this->resource->brojNesvidjanja,
            'Komentar se nalazi u okviru objave: '=> (new ObjavaResource(optional($this->resource->objava)))->vratiNaziv(),
            'Komentar kreiran od strane korisnika: '=> new UserResource($this->resource->user),
        ];
    }
}
