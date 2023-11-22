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
            'genre' => $this->genre,
            'production' => $this->production,
            'awards' => $this->awards,
            'duration' => $this->formatted_duration,
            'status' => $this->is_available ? 'Available' : 'Not available',
            'price' => $this->formatted_price,
        ];
    }
}
