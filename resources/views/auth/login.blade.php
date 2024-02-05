<!-- layout for login page -->

@extends('layouts.tvlogin')

@section('content')
<div id="login-view">
    <md-content class="login-content autoScroll">
        <div class="ix-logo">
            <img src="/build/ix_logo.png">
        </div>
        
        <form class="form-horizontal" role="form" method="POST" ng-submit="tvlogin()">
            {!! csrf_field() !!}

            <div class="input-container {{ $errors->has('email') ? ' has-error' : '' }}">
                <md-input-container class="md-icon-float md-block">
                    <label>E-mail</label>
                    <md-icon md-font-icon="icon-perm-identity" class="name"></md-icon>
                    <input ng-model="user.email" type="email" name="email" value="{{ old('email') }}">
                    
                    <div class="err-message" ng-if="err_email != ''"> @{{err_email}} </div>
                    
                    @if ($errors->has('email'))
                        <span >
                          <div ng-message="required" ng-model="err_email">{{ $errors->first('email') }}</div>
                        </span>
                    @endif
                </md-input-container>
                            
            
            </div>

            <div class="input-container {{ $errors->has('password') ? ' has-error' : '' }}">
                <md-input-container class="md-block">
                    <label>Password</label>
                    <md-icon md-font-icon="icon-lock-outline" class="password"></md-icon>
                    <input ng-model="user.password" type="password" name="password">

                    <div class="err-message" ng-if="err_password != ''"> @{{err_password}} </div>

                    @if ($errors->has('password'))
                        <span>
                            <div ng-message="required" ng-model="err_password">{{ $errors->first('password') }}</div>
                        </span>
                    @endif
                </md-input-container>
            </div>

            <div>
                <md-checkbox name="remember">Remember Me</md-checkbox>
                
            </div>

            <div>
                <!--div class="col-md-6 col-md-offset-4"-->
                <div>
                    <md-button class="md-raised md-primary login-btn"  type="submit">Login</md-button><br>
                    <!--a class="btn btn-link" href="{{ url('/password/reset') }}">Forgot Your Password?</a-->
                    <a href="{{ url('/password/reset') }}">Forgot Your Password?</a>
                </div>
            </div>
        </form>
   </md-content>
</div>
@endsection

