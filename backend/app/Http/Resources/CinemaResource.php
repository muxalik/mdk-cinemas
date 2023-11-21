<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CinemaResource extends JsonResource
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
            'district' => $this->district,
            'address' => $this->address,
            'category' => $this->category,
            'capacity' => $this->capacity,
            'status' => $this->is_opened ? 'Opened' : 'Closed',
        ];
    }
}
