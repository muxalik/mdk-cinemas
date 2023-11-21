<?php

namespace App\Exports;

use App\Models\Actor;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ActorExport implements FromCollection, ShouldAutoSize, WithHeadings
{
    use Exportable;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $actors = Actor::query()
            ->withCount('movies')
            ->latest('id')
            ->get();

        return $actors->map(fn (Actor $actor) => [
            'id' => $actor->id,
            'name' => $actor->name,
            'total_movies' => $actor->movies_count,
        ]);
    }

    public function headings(): array
    {
        return [
            'Id',
            'Name',
            'Total movies',
        ];
    }
}
