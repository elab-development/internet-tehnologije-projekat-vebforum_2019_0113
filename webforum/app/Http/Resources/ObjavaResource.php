<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\KomentarResource; // Assuming you have a KomentarResource

class ObjavaResource extends JsonResource
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
            'id' => $this->id,
            'naziv' => $this->naziv,
            'tekst' => $this->tekst,
            'datum_objave' => $this->datumObjave,
            'broj_svidjanja' => $this->brojSvidjanja,
            'broj_nesvidjanja' => $this->brojNesvidjanja,
            'tema' => new TemaResource($this->tema),
            'user' => new UserResource($this->user),
            'komentari' => KomentarResource::collection($this->whenLoaded('comments'))
        ];
    }

    public function vratiNaziv()
    {
        return [
            'naziv' => $this->naziv,
        ];
    }
}
