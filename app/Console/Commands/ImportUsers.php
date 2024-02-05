<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

use \Exception;

class ImportUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import support tickets from DreamFactory';

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
    	->where('name', '=', $data['company'])
    	->first();
    	
    	if(is_null($org)){
    		return null;
    	}
    	
    	$org_array = json_decode(json_encode($org), True);
    	$org_id = $org_array['org_id'];
    	return $org_id;
    }

    public function addUserToDB($data) {
    	
    	$org_id = $this->getServerOrgId($data);
    	
    	if( $org_id === null ) {
    		return null;
    	}
    	
    	$userName = $data['main_contact_email'];
    	
    	$id = DB::table('users')->insertGetId(
    			[	'name' => $userName,
    				'email' => $userName,
    				'password' => bcrypt('admin'),
    				'api_token' =>  str_random(60),
    			    'role_id' => 1,
    				'org_id' => $org_id,
    				'confirmed' => 1,
    				'confirmation_code' =>  str_random(60),
    				
    			]);
        
        return $id;
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

    public function getTicketDreamFactory($url) {
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

    public function handleByDepartment($department) {

        $url = "http://ansiblefactory.freehive.io/api/v2/mysql/_table/erpnext?filter=department%3D" . $department;
        $tickets = $this->getTicketDreamFactory($url);
        $array_tickets = json_decode(json_encode($tickets), True);
        foreach($array_tickets as $k => $v){
        	try {
        		$this->addUserToDB($v);
	        } catch (Exception $e) {
	        	$this->info($e->getMessage());
	        }
        }

      
    }

    private $departments = [
        'TrueNAS',
        'Hardware',
        'RMA'
    ];

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Start tickets importing ...');
        foreach($this->departments as $department){
	        try{
	        	$this->handleByDepartment($department);
	        } catch (Exception $e) {
	        	$this->info($e->getMessage());
	        }
        }
    }
}
