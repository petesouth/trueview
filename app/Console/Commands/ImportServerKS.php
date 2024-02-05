<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

class ImportServerKS extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:serverks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import server & org from keyserver';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function addOrgToDB($data) {
        /*
         * check org exist
         */
        $org = DB::table('orgs')
            ->where('name', '=', $data['customer_name'])
            ->first();

        if(is_null($org)){
            /*
             * generate unique org id for new org
             */
            $org_id = uniqid('ORG_');

            $id = DB::table('orgs')->insertGetId([
                'org_id' => $org_id,
                'name' => $data['customer_name'],
            ]);
        }else{
            /*
             * org exist
             */
            $org_array = json_decode(json_encode($org), True);
            $org_id = $org_array['org_id'];
        }

        return $org_id;
    }

    public function addServerToDB($data, $org_id) {

        /*
         * calculate wnty expire day
         */    
        $date = date_create($data['contract_start']);
        $wnty_expire = date_add($date, date_interval_create_from_date_string($data['contract_duration'].' days'));;

        /*
         * insert into db
         */
        $id = DB::table('servers')->insertGetId([
            'system_serial' => $data['system_serial'],
            'model' => $data['model'],
            'contract_type' => $data['contract_type'],
            'contract_sw' => $data['contract_sw'],
            'contract_hw' => $data['contract_hw'],
            'contract_start' => $data['contract_start'],
            'contract_duration' => $data['contract_duration'],
            'customer_name' => $data['customer_name'],
            'status' => $data['status'],
            'features' => $data['features'],
            'license_key' => $data['license_key'],
            'wnty_expire' => $wnty_expire,
            'customer_id' => $org_id,
        ]);
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
            $org_id = $this->addOrgToDB($v);
            $this->addServerToDB($v, $org_id);
        } 

        while($array_meta['next']){
            $url = 'http://keyserver.ixsystems.com'. $array_meta['next'];

            $rs = $this->getServer($url);
            $meta = $rs->meta;
            $servers = $rs->objects;

            $array_meta = json_decode(json_encode($meta), True);
            $array_servers = json_decode(json_encode($servers), True);

            foreach($array_servers as $k => $v){
                $org_id = $this->addOrgToDB($v);
                $this->addServerToDB($v, $org_id);
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
