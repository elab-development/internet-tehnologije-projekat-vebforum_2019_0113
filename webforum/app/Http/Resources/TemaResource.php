<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TemaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ID Teme: ' => $this->resource->id,
            'Naziv teme: ' => $this->resource->naziv,
            'Opis: '=> $this->resource->opis,
            'Status: '=> $this->resource->status,
            'Baner: '=> $this->resource->baner,
            'Tema je deo zajednice: '=> (new ZajednicaResource(optional($this->resource->zajednica)))->vratiNaziv(),
            'Tema kreirana od strane korisnika: '=> new UserResource($this->resource->user),
        ];
    }

    public function vratiNaziv(): array
    {
        return [
            $this->resource->naziv,
        ];
    }
}
