<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;
use \Exception;

class ImportTicket extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:ticket';

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

    public function addTicketToDB($data) {
    	
    	
    	$org_id = $this->getServerOrgId($data);
    	
    	if( $org_id === null ) {
    		return null;
    	}
    	
        $id = DB::table('tickets')->insertGetId([
            'kayako_fusion_ticket_link' => $data['kayako_fusion_ticket_link'],
            'ticket_id' => $data['ticket_id'],
            'priority' => $data['priority'],
            'company' => $data['company'],
        	'org_id' => $org_id,
            'status' => $data['status'],
            'days_open' => $data['days_open'],
            'subject' => $data['subject'],
            'chief_complaint' => $data['chief_complaint'],
            'department' => $data['department'],
            'owner' => $data['owner'],
            'date' =>  date_create_from_format('j M Y h:i A',$data['date']),
            'last_replier' =>  date_create_from_format('j M Y h:i A',$data['last_replier']),
            'last_activity' =>  date_create_from_format('j M Y h:i A',$data['last_activity']),
            'order_number' => $data['order_number'],
            'invoice_number' => $data['invoice_number'],
            'serial_number_system_1' => $data['serial_number_system_1'],
            'serial_number_system_2' => $data['serial_number_system_2'],
            'serial_number_system_3' => $data['serial_number_system_3'],
            'hardware_platform' => $data['hardware_platform'],
            'expansion_shelf' => $data['expansion_shelf'],
            'system_location' => $data['system_location'],
            'main_contact_person' => $data['main_contact_person'],
            'main_contact_email' => $data['main_contact_email'],
            'customer_internal_ticket' => $data['customer_internal_ticket'],
            'sla_plan' => $data['sla_plan'],
            'support_level' => $data['support_level'],
            'hardware_support_expiration' => $data['hardware_support_expiration'],
            'software_support_expiration' => $data['software_support_expiration'],
            'resolution_type' => $data['resolution_type'],
            'sales_rep' => $data['sales_rep'],
            'os' => $data['os'],
            'resolution' => $data['resolution'],
            'course_of_action' => $data['course_of_action'],
            'RMA_number' => $data['RMA_number'],
            'inbound_tracking_number' => $data['inbound_tracking_number'],
            'date_shipped_to_customer' => $data['date_shipped_to_customer'],
            'date_of_returned_part_from_customer' => $data['date_of_returned_part_from_customer'],
            'RMA_manufacturer' => $data['RMA_manufacturer'],
            'tracking_number_to_vendor' => $data['tracking_number_to_vendor'],
            'date_of_returned_fixed_part' => $data['date_of_returned_fixed_part'],
            'model_number' => $data['model_number'],
            'RMA_contact_name' => $data['RMA_contact_name'],
            'RMA_ship_to_address' => $data['RMA_ship_to_address'],
            'special_instructions' => $data['special_instructions'],
            'part_serial_number' => $data['part_serial_number'],
            'main_contact_phone_number' => $data['main_contact_phone_number']
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
        		$this->addTicketToDB($v);
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
