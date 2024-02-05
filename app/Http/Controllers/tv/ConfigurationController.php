<?php

namespace App\Http\Controllers\tv;

use File;
use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class ConfigurationController extends Controller
{
    /**
     * Show tvConfig.json.
     * @Get('api/config')
     * @return Response
     */
    public function show_configInfo()
    {
        return DB::select('SELECT o.influx FROM orgs o LEFT JOIN  users u ON u.org_id = o.org_id WHERE u.id = ?', [Auth::id()]);
    }

    public function update_configInfo_threshold(Request $request)
    {
 	$path = public_path()."/trueview/tvConfig.json";       
        if (!File::exists($path)) {
            throw new Exception("Invalid File");
        }
   
        $json = File::get($path);
        $data = json_decode($json, true);
        
        $data['threshold']['time_out'] = $request->time_out;
        $data['threshold']['filter_key'] = $request->filter_key;
        
        File::put($path, json_encode($data));
    }

    public function update_configInfo_admin(Request $request)
    {
	$path = public_path()."/trueview/tvConfig.json";

        if (!File::exists($path)) {
            throw new Exception("Invalid File");
        }

        $json = File::get($path);
        $data = json_decode($json, true);
	
       // $data['admin']['influxdbserver'] = $request->influxdbserver;
	$data['admin']['grafanaserver'] = $request->grafanaserver;

        File::put($path, json_encode($data));

    }  
}
