<?php

namespace App\Exports;

use App\Models\Session;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SessionExport implements FromCollection, ShouldAutoSize, WithHeadings
{
    use Exportable;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $sessions = Session::query()
            ->with('cinema', 'movie')
            ->latest('id')
            ->get();

        return $sessions->map(fn (Session $session) => [
            'id' => $session->id,
            'cinema' => $session->cinema->name,
            'movie' => $session->movie->name,
            'ticket_price' => $session->ticket_price . '$',
            'free_places' => $session->free_places,
            'starts' => $session->starts_at->toDateTimeString(),
        ]);
    }

    public function headings(): array
    {
        return [
            'Id',
            'Cinema',
            'Movie',
            'Ticket price',
            'Free places',
            'Starts',
        ];
    }
}
