<?php

namespace App\Http\Requests;

use App\Enums\Genres;
use App\Enums\MovieStatuses;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpstoreMovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:190'],
            'producer' => ['required', 'string', 'max:190'],
            'operator' => ['required', 'string', 'max:190'],
            'genre' => ['required', 'string', Rule::in(Genres::values())],
            'production' => ['required', 'string', 'max:100'],
            'awards' => ['required', 'string', 'max:500'],
            'duration' => ['required', 'integer', 'gt:0'],
            'status' => ['required', 'string', Rule::in(MovieStatuses::values())],
            'price' => ['required', 'integer', 'gte:0'],
        ];
    }
}
