<?php

namespace App\Exports;

use App\Models\Cinema;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CinemaExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    use Exportable;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $cinemas = Cinema::latest('id')->get();

        return $cinemas->map(function (Cinema $cinema) {
            return [
                'id' => $cinema->id,
                'name' => $cinema->name,
                'district' => $cinema->district,
                'address' => $cinema->address,
                'capacity' => $cinema->capacity,
                'status' => $cinema->is_opened
                    ? 'Opened'
                    : 'Closed',
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Id',
            'Name',
            'District',
            'Address',
            'Capacity',
            'Status',
        ];
    }
}
