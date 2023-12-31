<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActorResource extends JsonResource
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
            'total_movies' => $this->whenCounted(
                'movies',
                $this->movies_count
            ),
            'main_role_movies' => $this->whenCounted(
                'moviesWithMainRole',
                $this->movies_with_main_role_count,
            ),
        ];
    }
}
