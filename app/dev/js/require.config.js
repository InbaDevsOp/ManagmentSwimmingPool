var SwimmingPoolApplicationHost = "http://localhost:8080";


require.config({
    baseUrl: 'app/dev/js',

    paths: {

        jquery: '../../../bower_components/jquery/dist/jquery',
        "jquery.validate": '../../../bower_components/jquery-validation/dist/jquery.validate',

        backbone: '../../../bower_components/backbone/backbone',
        marionette: '../../../bower_components/backbone.marionette/lib/backbone.marionette',
        underscore: '../../../bower_components/underscore/underscore',
        'bootstrap-modal': '../../../bower_components/bootstrap/js/modal',

        /* handlebars from the require handlerbars plugin below */
        handlebars: '../../../bower_components/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../../../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../../../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../../../bower_components/require-handlebars-plugin/hbs',

        /* styles */
        styles: '../styles',
    },
    shim: {
        'jquery.validate': {
            deps: ['jquery']
        }
    },
    hbs: {
        disableI18n: true,
        helperPathCallback: // Callback to determine the path to look for helpers
            function(name) { // ('/templates/helpers/'+name by default)
            return 'Templates/helpers/' + name;
        },
    },

});
