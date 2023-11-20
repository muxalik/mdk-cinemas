@extends('pdf.base')

@section('content')
    <div class="table-scrollable">
        <table id="movies" class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Producer</th>
                    <th>Operator</th>
                    <th>Genre</th>
                    <th>Production</th>
                    <th>Awards</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody id="body">
                @foreach ($movies as $movie)
                    <tr>
                        <td>{{ $movie->name }}</td>
                        <td>{{ $movie->producer }}</td>
                        <td>{{ $movie->operator }}</td>
                        <td>{{ $movie->genre }}</td>
                        <td>{{ $movie->production }}</td>
                        <td>{{ $movie->awards }}</td>
                        <td>{{ $movie->duration }}</td>
                        <td>{{ $movie->is_available ? 'Available' : 'Not available' }}</td>
                        <td>{{ $movie->price }}$</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
