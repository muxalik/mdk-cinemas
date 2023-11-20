@extends('pdf.base')

@section('content')
    <div class="table-scrollable">
        <table id="cinemas" class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Cinema</th>
                    <th>District</th>
                    <th>Address</th>
                    <th>Capacity</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody id="body">
                @foreach ($cinemas as $cinema)
                    <tr>
                        <td>{{ $cinema->name }}</td>
                        <td>{{ $cinema->district }}</td>
                        <td>{{ $cinema->address }}</td>
                        <td>{{ $cinema->capacity }}</td>
                        <td>{{ $cinema->is_opened ? 'Opened' : 'Closed' }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
