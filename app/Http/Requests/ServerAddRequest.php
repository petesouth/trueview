<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use JWTAuth;

class ServerAddRequest extends Request
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
            'system_serial.unique'  => 'Serial number should be unique.',
            //'exists:orgs,id' => 'Customer should be exists.'
            'boolean' => 'The :attribute field is boolean.',

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
            'system_serial' => 'required|unique:servers',
            'model' => '',
            'hostname' => '',
            'ip' => '',
            'customer_id' => 'required',
            //'customer_id' => 'required|exists:orgs,id',
            'config_name' => '',
            'wnty_expire' => 'date',
            'actived' => 'boolean',
        ];
    }
}
