<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TemaResource extends JsonResource
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
            'id_teme' => $this->id,
            'naziv_teme' => $this->naziv,
            'opis' => $this->opis,
            'status' => $this->status,
            'baner' => $this->baner,
            'zajednica' => new ZajednicaResource($this->zajednica),
            'user' => new UserResource($this->user),
          
        ];
    }

    public function vratiNaziv()
    {
        return [
            'naziv' => $this->naziv,
        ];
    }
}
