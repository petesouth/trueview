<!doctype html>
  <html class="no-js">
  <head>
    <meta charset="utf-8">
    <title>TrueView UI</title>
    <link rel="stylesheet" href="{{ elixir('css/all.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ elixir('css/app.css') }}" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="{{ elixir('js/all.js') }}"></script>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=RobotoDraft:100,100italic,300,300italic,400,500,700,900,400italic">
  
  </head>
  <body ng-app="tvlogin" ng-class="bodyClasses" ng-controller="tvloginController" class="login">
    @yield('content')
  </body>
</html>
