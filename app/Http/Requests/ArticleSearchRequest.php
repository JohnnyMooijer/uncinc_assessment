<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search' => 'nullable|string|max:255',
            'image'  => 'nullable|image|max:10240',
        ];
    }

    public function messages(): array
    {
        return [
            'search.string' => 'De zoekterm moet tekst zijn.',
            'search.max'    => 'De zoekterm mag maximaal 255 tekens bevatten.',
            'image.max'     => 'Afbeelding mag maximaal 10MB zijn.',
        ];
    }
}
