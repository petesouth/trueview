<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UserActiveRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
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
            'email.unique'  => 'The email should be unique.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $rules = [
            'password' => 'required|confirmed|min:6',
            'password_confirmation' => 'required',
        ];
    }
}
