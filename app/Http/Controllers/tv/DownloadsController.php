<?php

namespace App\Http\Controllers\tv;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * @resource Orgs
 *
 * All Request should add authorization Header as
 * Authorization: Bearer {jwt_token}
 */
class DownloadsController extends Controller
{
	
	
	public function download($file_name) {
		$file_path = base_path('downloads/'.$file_name);
	    return response()->download($file_path);
	  }
	
	
}
