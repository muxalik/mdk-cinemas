<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Actor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function movies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class)
            ->withPivot('is_main_role')
            ->withTimestamps();
    }

    public function moviesWithMainRole(): BelongsToMany
    {
        return $this->movies()->wherePivot('is_main_role', true);
    }
}
