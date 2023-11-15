import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/css/fontawesome/all.min.css",
                "resources/css/adminlte/adminlte.min.css",
                "resources/css/base.css",
                "resources/css/select2.min.css",

                "resources/js/bootstrap.bundle.min.js",
                "resources/js/app.js",
                "resources/js/select2.full.min.js",
                "resources/js/adminlte/adminlte.min.js",
            ],
            refresh: true,
        }),
    ],
});
