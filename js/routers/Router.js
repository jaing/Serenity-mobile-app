define(['jquery', 'backbone', 'modules/_application/main', 'modules/user/main'], function ($, Backbone, Application, UserView) {


    return Backbone.Router.extend({

        routes: {
            '': ''
        },
        initialize: function() {
            var me = this;
            Serenity.app = new Application();

            $.ajax({
                url: 'api/global.json',
                type: 'POST'
            }).success(function (data) {
                _.extend(Serenity,data);
                me.loadLanguage(data.language);
            });

        },
        loadLanguage: function (code) {
            var me = this;
            $.ajax({
                url: 'api/'+code+'.json',
                type: 'POST'
            }).success(function (data) {
                Serenity._translations[code] = data;
                me.loadApplication();
            });
        },
        loadApplication: function() {
            $('body').translate();
            new UserView({
                el: '#user-app'
            });
        }

    });
});