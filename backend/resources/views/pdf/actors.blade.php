@extends('pdf.base')

@section('content')
    <div class="table-scrollable">
        <table id="actors" class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Total Movies</th>
                </tr>
            </thead>
            <tbody id="body">
                @foreach ($actors as $actor)
                    <tr>
                        <td>{{ $actor->name }}</td>
                        <td>{{ $actor->movies_count }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
