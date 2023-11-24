<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpstoreSessionRequest extends FormRequest
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
            'cinema' => ['required', 'numeric', 'exists:cinemas,id'],
            'movie' => ['required', 'numeric', 'exists:movies,id'],
            'ticket_price' => ['required', 'integer', 'gt:0'],
            'free_places' => ['required', 'integer', 'gte:0'],
            'starts_at' => ['required', 'date', 'date_format:Y-m-d H:i:s']
        ];
    }

    public function validated($key = null, $default = null): array
    {
        $data = parent::validated();

        return [
            'cinema_id' => $data['cinema'],
            'movie_id' => $data['movie'],
            'ticket_price' => $data['ticket_price'],
            'free_places' => $data['free_places'],
            'starts_at' => $data['starts_at'],
        ];
    }
}
