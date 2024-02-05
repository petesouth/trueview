<!doctype html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <title>TrueView UI</title>
        <link rel="stylesheet" href="{{ elixir('css/all.css') }}" type="text/css" />
        <link rel="stylesheet" href="{{ elixir('css/app.css') }}" type="text/css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="sparkline/jquery.sparkline.js"></script>
        <script src="{{ elixir('js/all.js') }}"></script>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=RobotoDraft:100,100italic,300,300italic,400,500,700,900,400italic">
        <link href='https://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
        <link href="{{ asset('assets/images/favicon.ico') }}" rel="shortcut icon" type="image/x-icon">
    </head>
    <body ng-app="tv" ng-class="bodyClasses">
        <div ng-view>
        </div>
        <div class="full-height" ui-view>
        </div>
        @yield('content')
    </body>

<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);

  (function() {
    var u="//trueview-demo.freehive.io:5000/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '1']);

    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);


    var currentUrl = location.href;
    window.addEventListener('hashchange', function() {
        _paq.push(['setReferrerUrl', currentUrl]);
         currentUrl = '' + window.location.hash.substr(1);
        _paq.push(['setCustomUrl', currentUrl]);
        _paq.push(['setDocumentTitle', 'My New Title']);

        // remove all previously assigned custom variables, requires Piwik 3.0.2
        _paq.push(['setGenerationTimeMs', 0]);
        _paq.push(['trackPageView']);
        
        // make Piwik aware of newly added content
        var content = document.getElementById('content');
        _paq.push(['MediaAnalytics::scanForMedia', content]);
        _paq.push(['FormAnalytics::scanForForms', content]);
        _paq.push(['trackContentImpressionsWithinNode', content]);
        _paq.push(['enableLinkTracking']);
    });
    
  })();
</script>

<noscript><p><img src="//trueview-demo.freehive.io:5000/piwik.php?idsite=1" style="border:0;" alt="" /></p></noscript>
<!-- End Piwik Code -->
</html>
