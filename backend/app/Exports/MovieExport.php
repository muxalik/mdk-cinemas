<?php

namespace App\Exports;

use App\Models\Movie;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MovieExport implements FromCollection, ShouldAutoSize, WithHeadings
{
    use Exportable;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $movies = Movie::latest('id')->get();

        return $movies->map(fn (Movie $movie) => [
            'id' => $movie->id,
            'name' => $movie->name,
            'producer' => $movie->producer,
            'operator' => $movie->operator,
            'genre' => $movie->genre->value,
            'production' => $movie->production,
            'awards' => $movie->awards,
            'duration' => $movie->duration,
            'status' => $movie->is_available ? 'Available' : 'Not available',
            'price' => $movie->price . '$',
        ]);
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'producer',
            'operator',
            'genre',
            'production',
            'awards',
            'duration',
            'status',
            'price',
        ];
    }
}
