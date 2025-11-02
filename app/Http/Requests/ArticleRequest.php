<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'   => 'required|string|max:255',
            'content' => 'required|string|min:10',
            'image'   => 'nullable|image|max:10240',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'   => 'Title is verplicht.',
            'content.required' => 'Content is verplicht.',
            'content.min'      => 'Content moet minimaal 10 tekens zijn.',
            'image.max'        => 'Afbeelding mag maximaal 10MB zijn.',
        ];
    }
}
