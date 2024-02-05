<?php

namespace App\Http\Controllers\tv;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::select('SELECT * FROM tickets where status <> "closed";');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $id = DB::table('tickets')->insertGetId([
            'kayako_fusion_ticket_link' => $request['kayako_fusion_ticket_link'],
            'ticket_id' => $request['ticket_id'],
            'priority' => $request['priority'],
            'company' => $request['company'],
            'status' => $request['status'],
            'days_open' => $request['days_open'],
            'subject' => $request['subject'],
            'chief_complaint' => $request['chief_complaint'],
            'department' => $request['department'],
            'owner' => $request['owner'],
            'date' => $request['date'],
            'last_replier' => $request['last_replier'],
            'last_activity' => $request['last_activity'],
            'order_number' => $request['order_number'],
            'invoice_number' => $request['invoice_number'],
            'serial_number_system_1' => $request['serial_number_system_1'],
            'serial_number_system_2' => $request['serial_number_system_2'],
            'serial_number_system_3' => $request['serial_number_system_3'],
            'hardware_platform' => $request['hardware_platform'],
            'expansion_shelf' => $request['expansion_shelf'],
            'system_location' => $request['system_location'],
            'main_contact_person' => $request['main_contact_person'],
            'main_contact_email' => $request['main_contact_email'],
            'customer_internal_ticket' => $request['customer_internal_ticket'],
            'sla_plan' => $request['sla_plan'],
            'support_level' => $request['support_level'],
            'hardware_support_expiration' => $request['hardware_support_expiration'],
            'software_support_expiration' => $request['software_support_expiration'],
            'resolution_type' => $request['resolution_type'],
            'sales_rep' => $request['sales_rep'],
            'os' => $request['os'],
            'resolution' => $request['resolution'],
            'course_of_action' => $request['course_of_action'],
            'RMA_number' => $request['RMA_number'],
            'inbound_tracking_number' => $request['inbound_tracking_number'],
            'date_shipped_to_customer' => $request['date_shipped_to_customer'],
            'date_of_returned_part_from_customer' => $request['date_of_returned_part_from_customer'],
            'RMA_manufacturer' => $request['RMA_manufacturer'],
            'tracking_number_to_vendor' => $request['tracking_number_to_vendor'],
            'date_of_returned_fixed_part' => $request['date_of_returned_fixed_part'],
            'model_number' => $request['model_number'],
            'RMA_contact_name' => $request['RMA_contact_name'],
            'RMA_ship_to_address' => $request['RMA_ship_to_address'],
            'special_instructions' => $request['special_instructions'],
            'part_serial_number' => $request['part_serial_number'],
            'main_contact_phone_number' => $request['main_contact_phone_number']
        ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($org_id)
    {
        return DB::select('SELECT * FROM tickets WHERE org_id = ? order by company', [$org_id]);
    }

    public function showbyid($id)
    {
        $ticket = DB::select('SELECT * FROM tickets where id = ?', [$id]);
        return response()
                ->json($ticket);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
