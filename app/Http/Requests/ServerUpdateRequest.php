<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use JWTAuth;

class ServerUpdateRequest extends Request
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
            'system_serial.unique'  => 'The serial number should be unique.',
            'exists:orgs,id' => 'The customer should be exists.',
            'exists:servers,id' => 'The server should be exists.'
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
            'id' => 'required|exists:servers,id',
            'system_serial' => 'required|unique:servers,system_serial,' . $id,
            'model' => '',
            'hostname' => '',
            'ip' => '',
            'customer_id' => 'required|exists:orgs,org_id',
            'config_name' => '',
            'wnty_expire' => 'date',
            'actived' => 'boolean',
        ];
    }
}
