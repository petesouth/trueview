<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @resource Authentication
 */
class AuthController extends Controller
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Login
     *
     * @param $Request
     * @return JWTtoken
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        $throttles = $this->isUsingThrottlesLoginsTrait();

        if ($throttles && $lockedOut = $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        $credentials = $this->getCredentials($request);

        if ($token = Auth::guard($this->getGuard())->attempt($credentials)) {
            return $this->handleUserWasAuthenticated($request, $throttles, $token);
            /*
            if(Auth::user()['confirmed']){
                return $this->handleUserWasAuthenticated($request, $throttles, $token);
            }else{
                return response()->json([
                    'message'  => "Please verify your email to active your account.",
                ]);
            }
            */
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        if ($throttles && ! $lockedOut) {
            $this->incrementLoginAttempts($request);
        }

        return $this->sendFailedLoginResponse($request);
    }
    /* override function authenticated on AuthenticateUsers.php */
    protected function authenticated($request, $user, $token)
    {
        return response()->json(['token' => $token]);
    }
    /* override function sendFailedLoginResponse on AuthenticateUsers.php */
    protected function sendFailedLoginResponse(Request $request)
    {
        return response()->json([
            'message'  => $this->getFailedLoginMessage(),
        ]);
    }

    /*
     * override register
     *
     * @hideFromAPIDocumentation
     */
    public function register(Request $request)
    {
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            $request->headers->set('Accept', 'application/json');

            $this->throwValidationException(
                $request, $validator
            );
        }

        $this->create($request->all());

        $credentials = [
            'email' => $request['email'],
            'password' => $request['password'],
        ];

        $token = Auth::guard($this->getGuard())->attempt($credentials);

        return response()->json(['token' => $token]);
    }


    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
            'password_confirmation' => 'required',
            //'company' => 'required|max:255',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            //'company' => $data['company'],
            'org_id' => $data['org_id'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role_id' => isset($data['role_id']) ? $data['role_id']:3,
            'api_token' => str_random(60),
        ]);
    }
}
