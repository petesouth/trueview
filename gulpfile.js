var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix
        .sass('../../../public/assets/tvscss/*.scss')
        .styles([
            '../../../bower_components/bootstrap/dist/css/bootstrap.min.css',
            '../../../bower_components/bootstrap-material-design/dist/bootstrap-material-design.min.css',
            '../../../bower_components/angular-material/angular-material.css',
            '../../../bower_components/datetimepicker/build/jquery.datetimepicker.min.css',
            '../../../bower_components/font-awesome/css/font-awesome.css'
        ])
        .scripts([

            '../../../bower_components/jquery/dist/jquery.min.js',
            '../../../public/sparkline/jquery.sparkline.js',
            '../../../bower_components/jquery.formatDateTime-1.1.4/dist/jquery.formatDateTime.min.js',
            '../../../bower_components/angular/angular.min.js',
            '../../../bower_components/angular-resource/angular-resource.min.js',
            '../../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js', 
            '../../../bower_components/angular-route/angular-route.min.js',
            // '../../../bower_components/angular-material/angular-material.js',
            '../../../bower_components/angular-material/angular-material.min.js',
            '../../../bower_components/angular-animate/angular-animate.min.js',
            '../../../bower_components/angular-aria/angular-aria.min.js',
            '../../../bower_components/angular-messages/angular-messages.min.js',
            '../../../bower_components/angular-ui-router/**/*.js',
            '../../../bower_components/angular-design-iconic-font/**/*.js',
            '../../../bower_components/datetimepicker/build/jquery.datetimepicker.full.min.js',
            '../../../bower_components/ngstorage/ngStorage.min.js',
            '../../../bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
            '../../../bower_components/moment/moment.js',
            '../../../bower_components/angular-moment/angular-moment.js',

            '../../../public/js/tvjs/components/systemlist-component.js',
            '../../../public/js/tvjs/components/charttoolbar-component.js',
            '../../../public/js/tvjs/components/json_dashboard-component.js',
            '../../../public/js/tvjs/app.js',
            '../../../public/js/tvjs/themingProvider.js',
            '../../../public/js/tvjs/skinProvider.js',
            '../../../public/js/tvjs/tvModules.js',

            '../../../public/js/tvjs/controllers/dashboard/*.js',
            '../../../public/js/tvjs/controllers/ixfleet/*.js',
            '../../../public/js/tvjs/controllers/alerts/*.js',
            '../../../public/js/tvjs/controllers/support/*.js',
            '../../../public/js/tvjs/controllers/logs/*.js',
            '../../../public/js/tvjs/controllers/downloads/*.js',
            '../../../public/js/tvjs/controllers/snapshots/*.js',
            '../../../public/js/tvjs/controllers/settings/*.js',

            '../../../public/js/tvjs/directives/dashboard/*.js',

            '../../../public/js/tvjs/controllers/*.js',
            '../../../public/js/tvjs/directives/*.js',
            '../../../public/js/tvjs/services/*.js',
            '../../../public/monitcommando/js/lib/elasticsearch-js/elasticsearch.jquery.js',

            '../../../public/monitcommando/js/app/util/util.js'     

        ])

        .version([
            'css/app.css',
            'css/all.css',
            'js/all.js'
        ])
        .copy(
            'public/js/all.js.map', 'public/build/js/all.js.map'
        )
        .copy(
            'public/css/all.css.map', 'public/build/css/all.css.map'
        )
        .copy(
            'public/css/app.css.map', 'public/build/css/app.css.map'
        )
        .copy(
            'bower_components/material-design-iconic-font/fonts/Material-Design-Iconic-Font.ttf', 'public/build/bower_components/material-design-iconic-font/fonts/Material-Design-Iconic-Font.ttf'
        )
        .copy(
            'bower_components/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff', 'public/build/bower_components/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff'
        )
        .copy(
            'bower_components/font-awesome/fonts/fontawesome-webfont.ttf', 'public/build/fonts/fontawesome-webfont.ttf'
        )
        .copy(
            'bower_components/font-awesome/fonts/fontawesome-webfont.woff', 'public/build/fonts/fontawesome-webfont.woff'
        )
        .copy(
            'bower_components/font-awesome/fonts/fontawesome-webfont.woff2', 'public/build/fonts/fontawesome-webfont.woff2'
        ).copy(
            'public/assets/images/ix_logo.png', 'public/build/ix_logo.png'
        );
});
