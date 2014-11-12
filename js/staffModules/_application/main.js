define(['jquery', 'backbone','text!staffModules/_application/tpl/msg.tpl','staffModules/_application/modal'], function($, Backbone, tplMsg, ModalView) {

	return Backbone.View.extend({

		events: {

		},

        initialize: function () {
            Serenity.modal = new ModalView();
        },

		render: function(template) {

		},

        loading: function(a) {
            if (a) {
                $('#overlay').fadeIn();
            } else {
                $('#overlay').fadeOut();
            }
        },

        message: function(label,config) {
            var id = _.uniqueId('msg'),
                time = 2000,
                obj = {
                    body: label,
                    config: {},
                    id: id
                };

            if (config) {
                obj.config = config;
                if (config.timeout) {
                    time = config.timeout;
                }
            }

            $('#msg-box').append(_.template(tplMsg, obj));
            $('.msg').translate();

            setTimeout(function(){
                $('#'+id).fadeOut(function(e){
                    $('#'+id).remove();
                })
            },time);
        },

        translate: function(key) {
            var args = key.split('|'), translation;
            key = args.shift();
            translation = Serenity._translations[Serenity.language][key] || key;
            while (args.length) {
                translation = translation.replace('{}', this.translate(args.shift()));
            }
            return translation;
        }
	});
});