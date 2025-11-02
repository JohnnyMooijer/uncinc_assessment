<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // later auth check toevoegen
    }

    public function rules(): array
    {
        return [
            'title'   => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string|min:10',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'   => 'Title is verplicht.',
            'content.required' => 'Content is verplicht.',
            'content.min'      => 'Content moet minimaal 10 tekens zijn.',
        ];
    }
}
