@extends('layouts.layout')

@section('title', 'Кинотеатры')

@section('content')
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Список кинотеатров</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="">Главная</a></li>
                        <li class="breadcrumb-item active">Список кинотеатров</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title d-block pt-1">Список кинотеатров</h3>
                        </div>
                        <div class="card-body table-responsive p-0">
                            <table class="table table-head-fixed table-striped text-nowrap table-hover">
                                <thead>
                                    <tr>
                                        <th>@lang('cinemas.id')</th>
                                        <th>@lang('cinemas.fio')</th>
                                        <th>@lang('cinemas.phone')</th>
                                        <th>@lang('cinemas.contact_info')</th>
                                        <th>@lang('loyalties.label')</th>
                                        <th>@lang('cinemas.bonuses')</th>
                                        <th>@lang('actions.title')</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($cinemas as $cinema)
                                        <tr>
                                            <td>{{ $cinema->id }}</td>
                                            <td>{{ $cinema->full_name }}</td>
                                            <td>{{ $cinema->phone }}</td>
                                            <td class="h5">
                                                <span
                                                    class="badge badge-info pb-1">{{ $cinema->loyalty?->formatted }}</span>
                                            </td>
                                            <td>{{ $cinema->bonuses }}</td>
                                            <td>
                                                <a class="btn btn-primary btn-sm"
                                                    href="{{ route('cinemas.show', compact('cinema')) }}">
                                                    <i class="fas fa-eye">
                                                    </i>
                                                </a>
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="8">
                                                <p>@lang('cinemas.empty')</p>
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>

                        <div class="card-footer">
                            <div class="row">
                                <div class="col-12 d-flex justify-content-center align-items-center">
                                    {{ $cinemas->onEachSide(1)->links() }}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </section>
@endsection
