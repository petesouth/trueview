<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;
use Exception;

class ImportServer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:server';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import server & org from DreamFactory';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    
    
    public function getServerOrgId($data) {
    	/*
    	 * check org exist
    	 */
    	$org = DB::table('orgs')
    	->where('name', '=', $data['customer'])
    	->first();
    	
    	if(is_null($org)){
    		return null;
    	}
    	
	    $org_array = json_decode(json_encode($org), True);
	    $org_id = $org_array['org_id'];
    	
    	return $org_id;
    }
    
    
    public function addServerToDB($data) {
	
        /*
         * calculate wnty expire day
         */    
    	
        $org_id = $this->getServerOrgId($data);
        $date = ( in_array('contract_start', $data) === false ) ? null : date_create($data['contract_start']);
        $wnty_expire = ( $date === null ) ? null : date_add($date, date_interval_create_from_date_string($data['contract_duration'].' days'));;
        
        
        $id = DB::table('servers')->insertGetId([
        		'system_serial' => $data['system_serial'],
        		'hostname' => $data['system_serial'],
        		'ip' => $data['system_serial'],
        		'model' => $data['model'],
        		'contract_type' => $data['contract_type'],
        		'contract_sw' => $data['contract_software'],
        		'contract_hw' => $data['contract_hardware'],
        		'contract_start' => $date,
        		'customer_name' => $data['customer'],
        		'contract_duration' => $data['contract_duration'],
        		'license_key' => $data['license'],
        		'features' => $data['features'],
        		'wnty_expire' => $wnty_expire,
        		'status' => $data['status'],
        		'customer_id' => $org_id,
        ]);
        
        /*
         * insert into db
         * 
         *     'name' => $request["name"], 
                'system_serial' => $request["system_serial"],
                'customer_id' => $request["org_id"],
                'config_name' => $request["config_name"],
                'wnty_expire' => $request["wnty_expire"],
                'model' => $request["model"],
                'hostname' => $request["hostname"],
                'ip' => $request["ip"]]);
         
        $date = ( in_array('contract_start', $data) === false ) ? null : date_create($data['contract_start']);
        $wnty_expire = ( $date === null ) ? null : date_add($date, date_interval_create_from_date_string($data['contract_duration'].' days'));;
        
       $id = DB::table('servers')->insertGetId([
            'system_serial' => $data['system_serial'],
            'model' => $data['model'],
            'contract_type' => $data['contract_type'],
            'contract_sw' => $data['contract_software'],
            'contract_hw' => $data['contract_hardware'],
            'contract_start' => $data['contract_start'],
            'contract_duration' => $data['contract_duration'],
            'customer_name' => $data['customer'],
            'status' => $data['status'],
            'features' => $data['features'],
            'license_key' => $data['license_key'],
            'wnty_expire' => $wnty_expire,
            'customer_id' => $org_id,
        ]);
       */
    }

    public function getSessionTokenDreamFactory() {
        $data = '{"email": "lola@ixsystems.com","password": "lolaix2017","duration": 1000}';
        $ch = curl_init('http://ansiblefactory.freehive.io/api/v2/user/session');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Content-Length: ' . strlen($data);
        $headers[] = 'X-DreamFactory-Api-Key:36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $result = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($result);
        return $result->session_token;
    }

    public function getServerDreamFactory($url) {
        $this->info($url);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'X-DreamFactory-Api-Key:36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88';
        $headers[] = 'X-DreamFactory-Session-Token:' . $this->getSessionTokenDreamFactory();
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $result = curl_exec($ch);
      
        curl_close($ch);
	
        $data = json_decode($result);
        return $data->resource;
    }

    public function handleCurl() {
        $url = "http://ansiblefactory.freehive.io/api/v2/mysql/_table/truenas_key_server";
        $servers = $this->getServerDreamFactory($url);
        $array_servers = json_decode(json_encode($servers), True);
        foreach($array_servers as $k => $v){
        	try {
            	$this->addServerToDB($v);
            } catch (Exception $e) {
        		$this->info($e->getMessage());
        	}
        }

        

    }


    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Start server importing ...');
        $this->handleCurl();
    }
}
