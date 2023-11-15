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
            'cinema' => $this->whenLoaded('cinema', $this->cinema->name),
            'movie' => $this->whenLoaded('movie', $this->movie->name),
            'ticket_price' => $this->ticket_price,
            'free_places' => $this->free_places,
            'starts_at' => $this->starts_at->toDateTimeString(),
        ];
    }
}
