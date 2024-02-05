<?php

namespace App\Http\Controllers\tv;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\OrgUpdateRequest;
use App\Http\Requests\OrgAddRequest;

/**
 * @resource Orgs
 *
 * All Request should add authorization Header as 
 * Authorization: Bearer {jwt_token}
 */
class OrgController extends Controller
{
    /**
     * Get all orgs
     *
     * @return Response
     */
    public function index()
    {
        return DB::select('SELECT * FROM orgs;');
    }

    /**
     * Get a single org by orgId
     *
     * @param $id
     * @return Response
     */
    public function showbyorgid($id)
    {
        return DB::select('select * from orgs where org_id = ?', [$id]);

    }

    /**
     * Get a single org by id
     *
     * @param $id
     * @return Response
     */
    public function showbyid($id)
    {
        return DB::select('select * from orgs where id = ?', [$id]);

    }

    /**
     * Get a single org by id
     *
     * @param $id
     * @return Response
     */
    public function showbyname($name)
    {
        $name = base64_decode($name);//urldecode($name);
        //$org = DB::select('select * from orgs where name = ?', [$name]);
        $org = DB::table('orgs')
            ->where('name', '=', $name)
            ->first();
       
        if(is_null($org)){
            return response()
                ->json([
                    'message'=> $name
                ]);
        }

        return response()
            ->json($org);
    }

    /**
     * Create a new org
     *
     * @param Request $request
     * @return Response
     */
    public function create(OrgAddRequest $request)
    {

        $id = DB::table('orgs')->insertGetId(
            ['org_id' => $request["org_id"], 
            'name' => $request["name"],
            'influx' => $request["influx"]
        ]);

        return response()
            ->json([
                'id' => $id, 
                'message' => 'Org Added.'
            ]);
    }

    /**
     * Update org
     *
     * @param Request $request
     * @return Response
     */
    public function update(OrgUpdateRequest $request)
    {
        $rs = DB::table('orgs')
            ->where('id', $request["id"])
            ->update([ 
                'name' => $request["name"],
                'influx' => $request["influx"]
            ]);

        return response()
            ->json([
                'message' => 'Org Updated.'
            ]);
    }

    /**
     * Delete org
     *
     * @param $id
     * @return Response
     */
    public function destory($id)
    {

        $rs = DB::table('orgs')
            ->where('id', $id)
            ->delete();

        return response()
            ->json([
                'message' => 'Org Deleted.'
            ]);
        ;
    }
}
