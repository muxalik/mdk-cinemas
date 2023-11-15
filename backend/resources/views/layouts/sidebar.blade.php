<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <div class="sidebar">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <a href="{{ route('cinemas.index') }}"
                        class="nav-link @if (request()->is('cinemas*')) active @endif">
                        <i class="nav-icon fas fa-address-book"></i>
                        <p>
                            Кинотеатры
                        </p>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</aside>
