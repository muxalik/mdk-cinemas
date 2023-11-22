<?php

namespace App\Models;

use App\Enums\Genres;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'producer',
        'operator',
        'genre',
        'production',
        'awards',
        'duration',
        'advert_screenshot',
        'is_available',
        'price',
    ];

    protected $casts = [
        'genre' => Genres::class,
        'is_available' => 'bool',
    ];

    public function actors(): BelongsToMany
    {
        return $this->belongsToMany(Actor::class)
            ->withPivot('is_main_role')
            ->withTimestamps();
    }

    public function getFormattedDurationAttribute(): string
    {
        $hours = floor($this->duration / 60);
        $minutes = $this->duration % 60;

        return "{$hours}h" . ($minutes ? " {$minutes}m" : "");
    }

    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 0, '.', ' ');
    }
}
