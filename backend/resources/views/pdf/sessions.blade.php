@extends('pdf.base')

@section('content')
    <div class="table-scrollable">
        <table id="sessions" class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Cinema</th>
                    <th>Movie</th>
                    <th>Ticket Price</th>
                    <th>Free places</th>
                    <th>Starts</th>
                </tr>
            </thead>
            <tbody id="body">
                @foreach ($sessions as $session)
                    <tr>
                        <td>{{ $session->cinema->name }}</td>
                        <td>{{ $session->movie->name }}</td>
                        <td>{{ $session->ticket_price }}</td>
                        <td>{{ $session->free_places }}</td>
                        <td>{{ $session->starts_at->toDateTimeString() }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
