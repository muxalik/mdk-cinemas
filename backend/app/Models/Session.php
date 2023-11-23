<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Session extends Model
{
    use HasFactory;

    protected $fillable = [
        'cinema_id',
        'movie_id',
        'ticket_price',
        'free_places',
        'starts_at',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
    ];

    public function cinema(): BelongsTo
    {
        return $this->belongsTo(Cinema::class);
    }

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }

    public function getFormattedTicketPriceAttribute(): string
    {
        return '$' . $this->ticket_price;
    }
}
