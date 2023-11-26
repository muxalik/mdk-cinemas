<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateActorRequest extends FormRequest
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

            'movies' => ['required', 'array'],
            'movies.*.id' => ['required', 'numeric', 'gt:0', 'exists:movies,id'],
            'movies.*.is_main_role' => ['required', 'boolean'],

            'deleted_movies' => ['nullable', 'array'],
            'deleted_movies.*' => ['nullable', 'numeric', 'gt:0', 'exists:movies,id'],
        ];
    }
}
