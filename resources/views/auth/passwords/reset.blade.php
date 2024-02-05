@extends('layouts.tvlogin')

@section('content')
<div id="login-view">
    <md-content class="login-content no-scroll">
        <div class="ix-logo">
            <img src="/build/ix_logo.png">
        </div>
        <div>
            @if (session('status'))
                <div class="alert alert-success">
                    {{ session('status') }}
                </div>
            @endif

            <!--form class="form-horizontal" role="form" method="POST" action="{{ url('/password/reset') }}"-->
            <form class="form-horizontal" role="form" method="POST" ng-submit="tvreset()">
                {!! csrf_field() !!}

                <input type="hidden" name="token" value="{{ $token }}">

                <div class="input-container {{ $errors->has('email') ? ' has-error' : '' }}">
                    <md-input-container class="md-block">
                        <label>E-Mail Address</label>
                        <md-icon md-font-icon="icon-email"></md-icon>
                        <input type="email" name="email" value="{{ $email or old('email') }}">

                        <div class="err-message" ng-if="err_email != ''"> @{{err_email}} </div>

                        @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif

                    </md-input-container>

                </div>

                <div class="input-container {{ $errors->has('password') ? ' has-error' : '' }}">
                    <md-input-container class="md-block">
                        <label>Password</label>
                        <md-icon md-font-icon="icon-email"></md-icon>
                        <input type="password" name="password">

                        <div class="err-message" ng-if="err_password != ''"> @{{err_password}} </div>

                        @if ($errors->has('password'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                    </md-input-container>
                </div>

                <div class="input-container {{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                    <md-input-container class="md-block">
                        <label>Confirm Password</label>
                        <md-icon md-font-icon="icon-email"></md-icon>
                        <input type="password" name="password_confirmation">

                        @if ($errors->has('password_confirmation'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password_confirmation') }}</strong>
                            </span>
                        @endif
                    </md-input-container>

                </div>

                <div>
                    <md-button class="md-raised md-primary login-btn"  type="submit">Reset Password</md-button>
                </div>
            </form>    
        </div>
   </md-content>
</div>
@endsection
