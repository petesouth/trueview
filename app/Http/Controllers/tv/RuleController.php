<?php

namespace App\Http\Controllers\tv;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RuleController extends Controller
{
    public function all($org_id)
    {
        return DB::select('select * from rules where org = ?', [$org_id]);
    }

    public function create(Request $request)
    {
       // return $request;
        $id = DB::table('rules')->insertGetId([ 
            'org' => $request["org"],
            'name' => $request["name"]
        ]);
        return $id;
    }

    public function update(Request $request)
    {
        $rs = DB::table('rules')
            ->where('id', $request["id"])
            ->update([ 
                'name' => $request["name"],
                'host' => $request["host"],
                'service' => $request["service"],
                'state' => $request["state"],
                'event' => $request["event"],
                'action' => $request["action"],
                'receiver' => $request["receiver"],
                'enabled' => $request['enabled']
            ]);
        return $rs;
    }

    public function destory(Request $request)
    {
        $rs = DB::table('rules')
            ->where('id', $request["id"])
            ->delete();

        return $rs;
    }
}
