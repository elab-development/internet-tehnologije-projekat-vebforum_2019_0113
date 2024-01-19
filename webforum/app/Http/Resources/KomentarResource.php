<?php
 namespace App\Http\Resources;

 use Illuminate\Http\Resources\Json\JsonResource;
 
 class KomentarResource extends JsonResource
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
             'id_komentara' => $this->id,
             'tekst_komentara' => $this->tekst,
             'datum_komentarisanja' => $this->datumKomentarisanja,
             'broj_svidjanja' => $this->brojSvidjanja,
             'broj_nesvidjanja' => $this->brojNesvidjanja,
             'objava' => new ObjavaResource($this->objava),
             'user' => new UserResource($this->user),
            
         ];
     }
 }
 