@extends('pdf.base')

@section('content')
    <div class="table-scrollable">
        <table id="actors" class="table table-bordered table-hover">
            <thead>
                <tr class="header-row-with-bg">
                    <th>Name</th>
                    <th>Total Movies</th>
                </tr>
            </thead>
            <tbody id="body">
                @foreach ($actors as $actor)
                    <tr @if ($loop->iteration % 2 === 0) class="row-with-bg" @endif>
                        <td>{{ $actor->name }}</td>
                        <td>{{ $actor->movies_count }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
