<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $userRole = 'guest';

        if ($this->jeAdmin) {
            $userRole = 'admin';
        } elseif ($this->jeModeratorZajednice) {
            $userRole = 'moderator_zajednica';
        } elseif ($this->jeModeratorTeme) {
            $userRole = 'moderator_teme';
        }

        return [
            'id_korisnika' => $this->id,
            'ime' => $this->name,
            'elektronska_posta' => $this->email,
            'korisnicka_uloga' => $userRole,
        ];
    }
}
