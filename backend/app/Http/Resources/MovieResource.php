<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
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
            'name' => $this->name,
            'producer' => $this->producer,
            'operator' => $this->operator,
            'genre' => $this->genre->value,
            'production' => $this->production,
            'awards' => $this->awards,
            'duration' => $this->formatted_duration,
            'status' => $this->status->value,
            'price' => [
                'formatted' => $this->formatted_price,
                'digital' => $this->price,
            ],
        ];
    }
}
