<?php

namespace App\Http\Controllers\tv;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ServerUpdateRequest;
use App\Http\Requests\ServerAddRequest;

/**
 * @resource Servers
 *
 * All Request should add authorization Header as 
 * Authorization: Bearer {jwt_token} 
 */
class ServerController extends Controller
{
    /**
     * Get all servers
     *  
     * @return Response
     */
    public function index()
    {
        return DB::select('SELECT s.*, o.name as company FROM servers s LEFT JOIN orgs o ON s.customer_id = o.org_id');

    }

    /**
     * Get all servers(registered & unregistered) by orgId
     * 
     * @param $org_id
     * @return Response
     */
    public function org($org_id)
    {
        return DB::select('select * from servers where customer_id = ?', [$org_id]);
    }

    /**
     * Get all actived registered servers by orgId
     *
     * @param $org_id
     * @return Response
     */
    public function actived($org_id)
    {
        return DB::select('select * from servers where registered = 1 and actived = 1 and customer_id = ?', [$org_id]);
    }

    /**
     * Get all registered servers by orgId
     *
     * @param $org_id
     * @return Response
     */
    public function registered($org_id)
    {
        return DB::select('select * from servers where registered = 1 and customer_id = ?', [$org_id]);
    }

    /**
     * Get a single server by server id
     *
     * @param $id
     * @return Response
     */
    public function show($id)
    {
        return DB::select('SELECT s.*, o.org_id, o.name as company FROM servers s LEFT JOIN orgs o ON s.customer_id = o.org_id WHERE s.id = ?', [$id]);
    }

    /**
     * Get org id by serial number
     *
     * @param $serial_number
     * @return Response
     */
    public function showorg($serial_number)
    {
        $org_id = DB::select('SELECT customer_id FROM servers WHERE system_serial = ?', [$serial_number]);
        return response()
            ->json($org_id);
    }

    /**
     * Create a new server
     *
     * @param Request $request
     * @return Response
     */
    public function create(ServerAddRequest $request)
    {

        $id = DB::table('servers')->insertGetId(
            ['id' => $request["id"],
            'name' => $request["name"],
            'system_serial' => $request["system_serial"],
            'model' => $request["model"],
            'hostname' => $request["hostname"],
            'ip' => $request["ip"],
            'customer_id' => $request["customer_id"],
            'config_name' => $request["config_name"],
            'wnty_expire' => $request["wnty_expire"],
            'contract_type' => $request['contract_type'],
            'contract_sw' => $request['contract_sw'],
            'contract_hw' => $request['contract_hw'],
            'contract_start' => $request['contract_start'],
            'contract_duration' => $request['contract_duration'],
            'customer_name' => $request['customer_name'],
            'status' => $request['status'],
            'features' => $request['features'],
            'license_key' => $request['license_key']
        ]);

        return response()
            ->json([
                'id' => $id, 
                'message' => 'Server Added.'
            ]);
    }

    /**
     * Update a server
     *
     * @param Request $request
     * @return Response
     */
    public function update(ServerUpdateRequest $request)
    {
        $rs = DB::table('servers')
            ->where('id', $request["id"])
            ->update([
                'name' => $request["name"], 
                'system_serial' => $request["system_serial"],
                'customer_id' => $request["org_id"],
                'config_name' => $request["config_name"],
                'wnty_expire' => $request["wnty_expire"],
                'model' => $request["model"],
                'hostname' => $request["hostname"],
                'ip' => $request["ip"]]);

        return response()
            ->json([
                'message' => 'Server Updated.'
            ]);
    }

    /**
     * Register a server
     *
     * @param Request $request
     * @return Response
     */
    public function register(Request $request)
    {
        $rs = DB::table('servers')
            ->where('system_serial', $request["system_serial"])
            ->update([
                'name' => $request["name"],
                'registered' => 1]);

        return response()
            ->json([
                'message' => 'Server registered.'
            ]);
    }

    /**
     * Delete a server
     *
     * @param $id
     * @return Response
     */
    public function destory($id)
    {

        $rs = DB::table('servers')
            ->where('id', $id)
            ->delete();

        return response()
            ->json([
                'message' => 'Server Deleted.'
            ]);
        ;
    }
}
