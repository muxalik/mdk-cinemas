<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SessionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cinema' => $this->whenLoaded('cinema', [
                'id' =>  $this->cinema->id,
                'name' =>  $this->cinema->name,
            ]),
            'movie' => $this->whenLoaded('movie', [
                'id' => $this->movie->id,
                'name' => $this->movie->name,
            ]),
            'ticket_price' => [
                'formatted' => $this->formatted_ticket_price,
                'digital' => $this->ticket_price,
            ],
            'free_places' => $this->free_places,
            'starts_at' => $this->starts_at->toDateTimeString(),
        ];
    }
}
