var SwimmingPoolApplicationHost = "http://192.168.1.189:8080";


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
        
        //tmpl: "../../Templates",
        styles: '../styles',

        //handlebars: LAN.Environment.jsLibBaseUrl + 'external/handlebars/1.0.0/handlebars',
    //    templates: LAN.Environment.jsAppBaseUrl + 'dist/templates/' + LAN.Environment.env + '/' + LAN.Environment.home + '/templates',
    //    appCss: LAN.Environment.jsAppBaseUrl + 'styles/' + LAN.Version.styles + '/css/step2',
    //    Auth: LAN.Environment.jsLibBaseUrl + 'lan/commons/appAuth/1.0.0/auth'
    },

/*    map: {
        '*': {
        //    'css': 'require-css' // or whatever the path to require-css is
        }
    },*/

    hbs: {
        disableI18n: true,
        partialsUrl: ''
    },

    /*shim: {
        'bootstrap-modal': { "deps" :['jquery'] }
    }*/
});