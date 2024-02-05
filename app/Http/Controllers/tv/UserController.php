<?php

namespace App\Http\Controllers\tv;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UserAddRequest;
use App\Http\Requests\UserActiveRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @resource Users
 *
 * All Request should add authorization Header as 
 * Authorization: Bearer {jwt_token}
 */
class UserController extends Controller
{
    /**
     * Get all users
     *
     * @return Response
     */
    public function index()
    {
        return DB::select('SELECT u.id, u.name, u.email, u.role_id, u.api_key, r.title AS role FROM users u LEFT JOIN roles r ON u.role_id = r.id');
    }

    /**
     * Get a single user by id
     *
     * @param $id
     * @return Response
     */
    public function show($id)
    {
        return DB::select('SELECT u.id, u.name, u.email, o.name AS company, o.org_id AS org_id, u.email u.api_key AS api_key, u.role_id, r.title AS role FROM users u LEFT JOIN orgs o ON u.org_id = o.org_id LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = ?', [$id]);
    }

    /**
     * Create new user
     *
     * @param Request
     * @return Response
     */
    public function create(UserAddRequest $request){
        $newuser= $request->all();
        if(!isset($newuser['role_id'])){
            $newuser['role_id'] = 3;
        };

        $password=Hash::make($request->input('password'));

        $newuser['password'] = $password;
        $newuser['api_token'] = str_random(60);
        $newuser['confirmed'] = 0;
        $newuser['confirmation_code'] = str_random(30);

        $user = User::create($newuser);

        /*
         * email user to verify email
         */
        $rs = app('App\Http\Controllers\tv\MailController')->verify($user);

        return response()
            ->json([
                'id' => $user["id"], 
                'message' => 'User Added.'
            ]);
    }

    /**
     * Update user
     *
     * @param Request
     * @return Response
     */
    public function update(UserUpdateRequest $request)
    {

        $rs = DB::table('users')
            ->where('id', $request["id"])
            ->update([
                'name' => $request["name"],
                'org_id' => $request["org_id"],
                'email' => $request["email"],
                'role_id' => $request["role_id"]]);

        return response()
            ->json([
                'message' => 'User Updated.'
            ]);
    }

    /**
     * Delete User
     *
     * @param $id
     * @return Response
     */
    public function destory($id)
    {
        $rs = DB::table('users')
            ->where('id', $id)
            ->delete();

        return response()
            ->json([
                'message' => 'User Deleted.'
            ]);
        ;
    }

    /**
     * Confirm User
     *
     * @param $confirm_code
     * @return Response
     */
    public function confirm(UserActiveRequest $request)
    {
        $confirmation_code = $request['confirmation_code'];

        if( ! $confirmation_code)
        {
            throw new InvalidConfirmationCodeException;
        }

        $user = User::whereConfirmationCode($confirmation_code)->first();

        if ( ! $user)
        {
            throw new InvalidConfirmationCodeException;
        }

        $user->password = Hash::make($request['password']);
        $user->confirmed = 1;
        $user->confirmation_code = null;
        $user->save();

        $token = Auth::login($user);
        return response()->json([
            'token' => $token,
        ], 200);

    }
}
