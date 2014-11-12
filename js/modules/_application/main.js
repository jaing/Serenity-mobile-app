define(['jquery', 'backbone','text!modules/_application/tpl/msg.tpl'], function($, Backbone, tplMsg) {

	return Backbone.View.extend({

		events: {

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
		
		handleError: function (e) {
			alert(e)
			console.log(e);
		},

        refreshScroll: function(scroll) {
            if (scroll) {
                Serenity.scrolls[scroll].refresh();
            } else {
                $.each(Serenity.scrolls, function(index, val) {
                    val.refresh();
                });
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
        }
	});
});