<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use JWTAuth;

class UserUpdateRequest extends Request
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
        $id = $this->id;
        return $rules = [
            'id' => 'required|exists:users,id',
            'name' => 'required|max:25', 
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'org_id' => 'required',
        ];
    }
}
