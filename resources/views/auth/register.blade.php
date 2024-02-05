@extends('layouts.tvlogin')

@section('content')
<div id="login-view">
    <md-content class="login-content autoScroll">
        <div class="ix-logo">
            <img src="/build/ix_logo.png">
        </div>
        <!--form class="form-horizontal" role="form" method="POST" action="{{ url('/register') }}"-->
        <form class="form-horizontal" role="form" method="POST" ng-submit="tvregister()">
            {!! csrf_field() !!}

            <div class="input-container {{ $errors->has('name') ? ' has-error' : '' }}">
                <md-input-container class="md-icon-float md-block">
                    <label>Name</label>
                    <md-icon md-font-icon="icon-perm-identity" class="name"></md-icon>
                    <input type="text"  name="name" value="{{ old('name') }}" ng-model="user.name">

                    <div class="err-message" ng-if="err_name != ''"> @{{err_name}} </div>

                    @if ($errors->has('name'))
                        <span>
                            <div ng-message="required">{{ $errors->first('name') }}</div>
                        </span>
                    @endif
                </md-input-container>
            </div>
            <div class="input-container {{ $errors->has('email') ? ' has-error' : '' }}">
                <md-input-container class="md-icon-float md-block">
                    <label>E-mail</label>
                    <md-icon md-font-icon="icon-email" class="email"></md-icon>
                    <input type="email" name="email" value="{{ old('email') }}" ng-model="user.email">

                    <div class="err-message" ng-if="err_email != ''"> @{{err_email}} </div>

                    @if ($errors->has('email'))
                        <span>
                            <div ng-message="required">{{ $errors->first('email') }}</div>
                        </span>
                    @endif
                </md-input-container>
            </div>
        <div class="input-container {{ $errors->has('company') ? ' has-error' : '' }}">
                <md-input-container class="md-icon-float md-block">
                    <label>company</label>
                    <md-icon md-font-icon="icon-domain" class="company"></md-icon>
                    <input type="text" name="org_id" value="{{ old('company') }}" ng-model="user.org_id">

                    <div class="err-message" ng-if="err_org_id != ''"> @{{err_org_id}} </div>

                    @if ($errors->has('company'))
                        <span>
                            <div ng-message="required">{{ $errors->first('company') }}</div>
                        </span>
                    @endif
                </md-input-container>
            </div>
            <div class="input-container {{ $errors->has('password') ? ' has-error' : '' }}">
                <md-input-container class="md-icon-float md-block">
                    <label>Password</label>
                    <md-icon md-font-icon="icon-lock-outline" class="password"></md-icon>
                    <input type="password" name="password" ng-model="user.password">

                    <div class="err-message" ng-if="err_password != ''"> @{{err_password}} </div>

                    @if ($errors->has('password'))
                        <span>
                            <div ng-message="required">{{ $errors->first('password') }}</div>
                        </span>
                    @endif
                </md-input-container>
            </div>
            <div class="input-container {{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                <md-input-container class="md-icon-float md-block">
                    <label>Confirm Password</label>
                    <md-icon md-font-icon="icon-lock" class="password"></md-icon>
                    <input type="password"  name="password_confirmation" ng-model="user.password_confirmation">

                    <div class="err-message" ng-if="err_password_confirmation != ''"> @{{err_password_confirmation}} </div>

                    @if ($errors->has('password_confirmation'))
                        <span>
                            <div ng-message="required">{{ $errors->first('password_confirmation') }}</div>
                        </span>
                    @endif
                </md-input-container>
            </div>
            <div>
                <div>
                    <md-button class="md-raised md-primary login-btn"  type="submit">Register</md-button><br>
                </div>
            </div>
        </form>
   </md-content>
</div>
@endsection

