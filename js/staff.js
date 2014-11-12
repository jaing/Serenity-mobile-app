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
		text: 'libs/text',
		bootstrap: 'libs/bootstrap'
	},
	shim: {
		'bootstrap': {
			'deps': ['jquery'],
			'exports': 'Bootstrap'
		},
		'backbone': {
			'deps': ['underscore', 'jquery'],
			'exports': 'Backbone'
		}
	}
});

require(['routers/Staff','global','bootstrap'], function(Router) {
    $.ajax({
        url: 'api/global.json',
        type: 'POST'
    }).success(function (data) {
        _.extend(Serenity,data);
        $.ajax({
            url: 'api/'+data.language+'.json',
            type: 'POST'
        }).success(function (f) {
            Serenity._translations[data.language] = f;
            Serenity.router = new Router();
            Backbone.history.start();
            $('body').translate();
            Serenity.app.loading(false);
        });
    });

});