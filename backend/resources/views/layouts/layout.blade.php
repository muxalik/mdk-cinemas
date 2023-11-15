<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Панель администратора')</title>

    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    @vite(['resources/css/fontawesome/all.min.css', 'resources/css/app.css', 'resources/css/select2.min.css', 'resources/css/adminlte/adminlte.min.css', 'resources/css/base.css'])
    @yield('head')
</head>

<body class="hold-transition sidebar-mini width-screen layout-fixed overflow-x-hidden">
    <div class="wrapper">

        @include('layouts.menu')

        @include('layouts.sidebar')

        <div class="content-wrapper">
            @yield('content')
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>

    @vite(['resources/js/bootstrap.bundle.min.js', 'resources/js/app.js', 'resources/js/adminlte/adminlte.min.js'])
</body>

</html>
