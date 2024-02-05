<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use JWTAuth;

class OrgUpdateRequest extends Request
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
            'exists:orgs,id' => 'The org should be exists.'
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
            'id' => 'required|exists:orgs,id',
            'name' => 'required',
            'influx' => '',
        ];

    }
}
