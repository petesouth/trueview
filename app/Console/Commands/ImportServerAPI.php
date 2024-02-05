<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ImportServerAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:serverapi';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import server by calling api';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    private $jwt_token;

    public function getTokenTV() {
        $data = '{"email": "admin@tv.com","password": "admin","duration": 1000}';
        $ch = curl_init('http://trueview-demo.freehive.io/api/login');
        //$ch = curl_init('http://10.247.1.159/api/login');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $result = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($result);
        $this->jwt_token = $result->token;

        return $result->token;
    }

    public function addServer($data, $org_id) {
        $date = date_create($data['contract_start']);
        $wnty_expire = date_add($date, date_interval_create_from_date_string($data['contract_duration'].' days'));
        
        /*
         * convert datetime to string
         */
        $date = $date->format('Y-m-d');
        $wnty_expire = $wnty_expire->format('Y-m-d');
        

        $data = '{"system_serial": "' . $data['system_serial'] . '","model": "'. $data['model'] . '","contract_type": "'. $data['contract_type'] . '","contract_sw": "'. $data['contract_sw'] . '","contract_hw": "'. $data['contract_hw'] . '","contract_start": "'. $data['contract_start'] . '","contract_duration": "'. $data['contract_duration'] . '","customer_name": "'. $data['customer_name'] . '","status": "'. $data['status'] . '","features": "'. $data['features'] . '","license_key": "'. $data['license_key'] . '","wnty_expire": "'. $wnty_expire . '","customer_id": "'. $org_id . '","duration": 1000}';
        
        //$ch = curl_init('http://10.247.1.159/api/tv/server/add');
        $ch = curl_init('http://trueview-demo.freehive.io/api/tv/server/add');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: Bearer ' . $this->jwt_token;
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $result = curl_exec($ch);
        curl_close($ch);
        
        //echo $result;
    }

    public function addOrg($data) {
        /*
         * check org exist
         */
        echo $data['customer_name'];
        $encode_orgname = base64_encode($data['customer_name']);
        //$url = 'http://10.247.1.159/api/tv/org/name/' . $encode_orgname;
        $url = 'http://trueview-demo.freehive.io/api/tv/org/name/' . $encode_orgname; 
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: Bearer ' . $this->getTokenTV();
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $result = curl_exec($ch);
        curl_close($ch);
        $org_array = json_decode($result, True);

        if(isset($org_array['message'])){
            $org_id = uniqid('ORG_');

            $data = '{"org_id": "' . $org_id . '","name": "'. $data['customer_name'] . '","duration": 1000}';
            //$ch = curl_init('http://10.247.1.159/api/tv/org/add');
            $ch = curl_init('http://trueview-demo.freehive.io/api/tv/org/add');
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $headers = array();
            $headers[] = 'Content-Type: application/json';
            $headers[] = 'Authorization: Bearer ' . $this->jwt_token;
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            $result = curl_exec($ch);
            curl_close($ch);
        }else{
            $this->info('server exits');
            $org_id = $org_array['org_id'];
        }
        return $org_id;
    }

    public function getServer($url) {
        $this->info($url);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $result = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($result);
        return $data;
    }

    public function handleCurl() {
        $url = 'http://keyserver.ixsystems.com/api/v1/license/?limit=1000&status=ACTIVE';
        $rs = $this->getServer($url);
        $meta = $rs->meta;
        $servers = $rs->objects;

        $array_meta = json_decode(json_encode($meta), True); 
        $array_servers = json_decode(json_encode($servers), True);

        foreach($array_servers as $k => $v){
            $org_id = $this->addOrg($v);
            $this->addServer($v, $org_id);
        } 

        /*
        while($array_meta['next']){
            $url = 'http://keyserver.ixsystems.com'. $array_meta['next'];

            $rs = $this->getServer($url);
            $meta = $rs->meta;
            $servers = $rs->objects;

            $array_meta = json_decode(json_encode($meta), True);
            $array_servers = json_decode(json_encode($servers), True);

            foreach($array_servers as $k => $v){
                $org_id = $this->addOrg($v);
                $this->addServer($v, $org_id);
            }
        } 
         */
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Start tickets importing ...');
        $this->handleCurl();
    }
}
