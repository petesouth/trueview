<?php

namespace App\Http\Controllers\tv;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class RoleController extends Controller
{
    public function index()
    {
        return DB::select('SELECT * FROM roles');
    }

}
