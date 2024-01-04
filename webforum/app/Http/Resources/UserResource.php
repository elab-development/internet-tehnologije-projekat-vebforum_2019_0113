<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $data = [
            'ID Korisnika: ' => $this->resource->id,
            'Ime: ' => $this->resource->name,
            'Elektronska posta: ' => $this->resource->email,
        ];

        if ($this->resource->jeAdmin) {
            $data['Korisnicka uloga: '] = 'Ovaj korisnik je administrator.';
        }

        if ($this->resource->jeModeratorZajednice) {
            $data['Korisnicka uloga: '] = 'Ovaj korisnik je moderator zajednica.';
        }

        if ($this->resource->jeModeratorTeme) {
            $data['Korisnicka uloga: '] = 'Ovaj korisnik je moderator tema u okviru zajednica.';
        }

        if (!($this->resource->jeAdmin) && !($this->resource->jeModeratorZajednice)
        && !($this->resource->jeModeratorTeme)) {
            $data['Korisnicka uloga: '] = 'Ovo je obican korisnik foruma.';
        }

        return $data;
    }
}
