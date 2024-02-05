<?php

namespace App\Http\Controllers\tv;

use DB;
use \DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Http\Controllers\Controller;

class UploadFileController extends Controller {
	public function index(){
		return view('uploadfile');
	}
	
	
	/**
	 * Get all users
	 *
	 * @return Response
	 */
	public function listAll()
	{
		return DB::select('select id, filename, origfilename, org_id, filetype, description, enabled, created_at from uploads');
	}
	
	
	public function uploadFileApi(Request $request){
		$file = $request->file('uploadedFile');
		$org_id = $request['org_id'];
		
		//Move Uploaded File
		$path_parts = pathinfo($file->getClientOriginalName());
		$extensionName = $path_parts['extension'];
		$fileNameOnDisk = uniqid().".".$extensionName;
		$destinationPath= base_path('downloads');
		$newFilename = $destinationPath."/".$fileNameOnDisk;
		$file->move($destinationPath,$fileNameOnDisk);
		
		if( file_exists($newFilename) !== true ) {
			return response()
			->json(['result' => "FAILED",
					'message' => 'Failed to create file on disk.'
			]);
		} 
		
		$id = $this->insertUploadRecord($request, "".$fileNameOnDisk, "".$file->getClientOriginalName());
		
		if(  $id < 1 ) {
			return response()
			->json(['result' => "FAILED",
					'message' => 'Insert Failed.'
			]);
		}
		
		return response()
		->json(['result' => "SUCCESS",
				'message' => 'File uploaded id:'.$id." ".$fileNameOnDisk
		]);
		
	}
	
	protected function insertUploadRecord( $request, $filename, $origfilename ) {
		$id = DB::table('uploads')->insertGetId([
				'filename' => $filename,
				'origfilename' => $origfilename,
				'org_id' => $request['org_id'],
				'filetype' => $request['filetype'],
				'description' => $request['desc'],
				'enabled' => true,
				'created_at' => new DateTime()
		]);
		
		return $id;
		
	}
}