@extends('layouts.tvlogin')

<!-- Main Content -->
@section('content')
<div id="login-view">
    <md-content class="login-content no-scroll">
        <div class="ix-logo">
            <img src="/build/ix_logo.png">
        </div>
        <!--div class="panel panel-default"-->
        <div>
            @if (session('status'))
                <!--div class="alert alert-success"-->
                <div>
                    {{ session('status') }}
                </div>
            @endif

            <form class="form-horizontal" role="form" method="POST" action="{{ url('/password/email') }}">
                                        {!! csrf_field() !!}

                <div class=" input-container {{ $errors->has('email') ? ' has-error' : '' }}">
                    <md-input-container class="md-block">
                        <label>E-Mail Address</label>
                        <md-icon md-font-icon="icon-email"></md-icon>
                        <input type="email" name="email" value="{{ old('email') }}">

                        @if ($errors->has('email'))
                            <span >
                                <div ng-message="required">{{ $errors->first('email') }}</div>
                            </span>
                        @endif
                    </md-input-container>
                </div>

                <div>
                    <div>
                        <md-button class="md-raised md-primary login-btn"  type="submit">Send Password Reset Link</md-button>
                    </div>
                </div>
            </form>
                
        </div>
   </md-content>
</div>
@endsection

