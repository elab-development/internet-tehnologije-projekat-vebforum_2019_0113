<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ZajednicaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
                    'ID Zajednice: ' => $this->resource->id,
                    'Naziv zajednice: ' => $this->resource->naziv,
                    'Opis: '=> $this->resource->opis,
                    'Broj tema u okviru zajednice: '=>$this->resource->brojTema,
                    'Zajednica kreirana od korisnika: '=> new UserResource($this->resource->user),
                    
        ];
        

    }
    
    public function vratiNaziv(): array
    {
        return [
            $this->resource->naziv,
        ];
    }
}
