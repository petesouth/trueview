<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use JWTAuth;

class MessageAddRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return JWTAuth::parseToken()->authenticate();
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'required' => 'The :attribute field is required.',
            'exists' => 'The serial number is invalid. Server should be exists.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'required',
            'content' => 'required',
            'serial' => 'required|exists:servers,system_serial',
            'severity' => 'required|max:20',
            'time' => 'required',
        ];
    }
}
