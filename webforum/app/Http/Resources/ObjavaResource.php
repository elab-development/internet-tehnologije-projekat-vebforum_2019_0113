<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ObjavaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ID Objave: ' => $this->resource->id,
            'Naziv objave: ' => $this->resource->naziv,
            'Tekst objave: '=> $this->resource->tekst,
            'Datum objave: '=> $this->resource->datumObjave,
            'Broj svidjanja: '=> $this->resource->brojSvidjanja,
            'Broj nesvidjanja: '=> $this->resource->brojNesvidjanja,
            'Objava se nalazi u okviru teme: '=> (new TemaResource(optional($this->resource->tema)))->vratiNaziv(),
            'Objava kreirana od strane korisnika: '=> new UserResource($this->resource->user),
        ];
    }

    public function vratiNaziv(): array
    {
        return [
            $this->resource->naziv,
        ];
    }
}
