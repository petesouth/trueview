<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

class ImportOrgs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:orgs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import Orgs from DreamFactory';

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
            ->where('name', '=', $data['customer'])
            ->first();

        if(is_null($org)){
            /*
             * generate unique org id for new org
             */
            $org_id = uniqid('ORG_');

            $id = DB::table('orgs')->insertGetId([
                'org_id' => $org_id,
                'name' => $data['customer'],
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
            $org_id = $this->addOrgToDB($v);
        }

        

    }


    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Start Orgs importing ...');
        $this->handleCurl();
    }
}
