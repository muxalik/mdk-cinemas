<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class MovieExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        //
    }
}
