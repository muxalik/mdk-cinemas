<?php

use App\Enums\MovieStatuses;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('producer');
            $table->string('operator');
            $table->string('genre');
            $table->string('production');
            $table->string('awards')->nullable();
            $table->integer('duration');
            $table->string('advert_screenshot')->nullable();
            $table->enum('status', MovieStatuses::values());
            $table->unsignedInteger('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
