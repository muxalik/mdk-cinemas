<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActorMovieResource extends JsonResource
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
            'main_role' => [
                'value' => $this->pivot->is_main_role,
                'formatted' => $this->pivot->is_main_role ? 'Yes' : 'No',
            ],
        ];
    }
}
