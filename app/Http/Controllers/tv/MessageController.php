<?php

namespace App\Http\Controllers\tv;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\MessageAddRequest;
use App\Http\Requests\MessageUpdateRequest;

use Carbon\Carbon;

/**
 * @resource Alerts
 *
 * All Request should add authorization Header as 
 * Authorization: Bearer {jwt_token}
 */
class MessageController extends Controller
{
    /**
     * Get all alerts by orgid
     *
     * @param $org_id
     * @return Response
     */
    public function all_message($org_id)
    {
        return DB::select('SELECT m.* FROM messages m JOIN servers s ON m.serial = s.system_serial WHERE s.customer_id = ?', [$org_id]);
    }

    /**
     * Get count of new alerts by orgid
     *
     * @hideFromAPIDocumentation
     * @param $org_id
     * @return Response
     */
    public function new_message($org_id)
    {
        return DB::select('SELECT count(*) AS count FROM messages m JOIN servers s ON m.serial = s.system_serial WHERE m.is_read = 0 AND s.customer_id = ?', [$org_id]);    
    }

    /**
     * Get wheter new alerts received
     *
     * @hideFromAPIDocumentation
     * @param $org_id
     * @return Response
     */
    public function is_update($org_id)
    {
        $rs = DB::select('SELECT * FROM msg_log WHERE org_id = ?', [$org_id]);
        $new_msg = MessageController::new_message($org_id);

        DB::table('msg_log')
            ->where('org_id', $org_id)
            ->update([
                'is_update' => '0',
                'new_msg' => $new_msg[0]->count,
            ]);

        return $rs;
    }

    /**
     * Mark alert is read
     *
     * @hideFromAPIDocumentation
     * @param Request
     * @return Response
     */
    public function read_message(Request $request)
    {
        $msg_statu = DB::select('SELECT is_read FROM messages WHERE uuid = ?', [$request['id']]);
        if( $msg_statu[0]->is_read == 0){

            DB::table('messages')
                ->where('id', $request['id'])
                ->update([
                    'is_read' => 1,
                ]);
            $org_id = DB::select('SELECT customer_id FROM servers s JOIN messages m ON s.system_serial = m.serial WHERE m.uuid = ?', [$request['id']]);
            $new_msg = MessageController::new_message($org_id[0]->customer_id);

            $rs = DB::table('msg_log')
                ->where('org_id', $org_id[0]->customer_id)
                ->update([
                    'is_update' => '0',
                    'new_msg' => $new_msg[0]->count,
                ]);  
            return $rs;
        }else{
            return 0;
        }
    }
    
    
    /**
     * Add new alert
     *
     * @param Request
     * @return Response
     */
    public function add_v1(Request $request)
    {
    	
    	$uuid = DB::table('messages')->insertGetId([
    			'content' => $request["content"],
    			'serial' => $request["serial"],
    			'severity' => $request["severity"],
    			'time' => $request["time"],
    			'is_read' => 0,
    			'created_at' => Carbon::now(),
    			'updated_at' => Carbon::now()
    	]);
    	
    	return response()
    	->json([
    			'uuid' => $uuid,
    			'message' => 'Alert Added.'
    	]); 
    }
    

    /**
     * Add new alert
     *
     * @param Request
     * @return Response
     */
    public function add(MessageAddRequest $request)
    {
        $uuid = DB::table('messages')->insertGetId([
            'content' => $request["content"],
            'serial' => $request["serial"],
            'severity' => $request["severity"],
            'time' => $request["time"],
            'is_read' => 0,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        return response()
            ->json([
                'uuid' => $uuid, 
                'message' => 'Alert Added.'
            ]); 
    }

    /**
     * Update alert
     *
     * @param Request
     * @return Response
     */
    public function update(MessageUpdateRequest $request, $uuid)
    {
        $is_exist = DB::table('messages')
            ->where('uuid', '=', $uuid)
            ->exists();
        if(!$is_exist){
            return response()
                ->json([
                    'uuid' => $uuid,
                    'message' => 'Alert is not exists.'
                ]);
        }

        $rs = DB::table('messages')
            ->where('uuid', $uuid)
            ->update([
                'severity' => $request["severity"],
                'time' => $request["time"],
                'updated_at' => Carbon::now()
            ]);

        return response()
            ->json([
                'uuid' => $uuid,
                'message' => 'Alert Updated.'
            ]);
    }

    /**
     * Delete alert
     *
     * @param $id
     * @return message
     */
    public function destory($id)
    {

        $rs = DB::table('messages')
            ->where('uuid', $id)
            ->delete();

        return response()
            ->json([
                'message' => 'Alert Deleted.'
            ]);
        ;
    }
}
