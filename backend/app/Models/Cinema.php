<?php

namespace App\Models;

use App\Enums\CinemaStatuses;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cinema extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'district',
        'address',
        'category',
        'capacity',
        'status',
    ];

    protected $casts = [
        'status' => CinemaStatuses::class,
    ];

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }
}
