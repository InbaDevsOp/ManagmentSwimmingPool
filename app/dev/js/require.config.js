var SwimmingPoolApplicationHost = "http://localhost:9090";


require.config({
    baseUrl: 'app/dev/js',

    paths: {

        jquery: '../../../bower_components/jquery/jquery',
        backbone: '../../../bower_components/backbone/backbone',
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

    hbs: {
        disableI18n: true,
    },

});