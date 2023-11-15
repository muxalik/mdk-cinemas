<?php

namespace App\Models;

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
        'is_opened',
    ];

    protected $casts = [
        'is_opened' => 'bool',
    ];

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }
}
