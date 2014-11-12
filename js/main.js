Serenity = {
    _config: {
        global: {
            language: 'PL'
        }
    },
    _translations: {

    },
    router: {},
    app: {},
    scrolls: {},
    collections: {},
    basket: {},
    view: {},
    user: {}
};

require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery-2.1.1',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
	    iscroll: 'libs/iscroll',
        text: 'libs/text'
    },
    shim: {
        'backbone': {
            'deps': ['underscore', 'jquery','iscroll','text']
        }
    }
});

require(['routers/Router','global'], function(Router) {
    Serenity.router = new Router();
    Backbone.history.start();
});