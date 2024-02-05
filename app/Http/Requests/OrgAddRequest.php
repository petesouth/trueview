<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use JWTAuth;

class OrgAddRequest extends Request
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
            'org_id.unique'  => 'The Org Id should be unique.',
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
            'org_id' => 'required|unique:orgs',
            'name' => 'required',
            'influx' => '',
        ];
    }
}
