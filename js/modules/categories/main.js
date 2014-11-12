define(['jquery', 'backbone', 'text!modules/categories/tpl/index.tpl'], function($, Backbone,tpl) {

    return Backbone.View.extend({

        events: {
        	'change #categories': 'selectOption'
        },

        initialize: function() {
            this.getData();
        },

        render: function(template, data) {
            this.$el.html(_.template(template, data)).translate();
        },

	    getData: function() {
		    var me = this;
			$.ajax({
				url: 'api/categories.json',
				type: 'GET',
				dataType: 'JSON'
			})
			.done(function(data) {
				me.render(tpl,{
					categories: data
				})
			})
			.fail(function(data) {
				Serenity.app.handleError(data);
			});
	    },

	    loadProducts: function(id) {
		    // TODO: Load products
			console.log(id);
	    },

	    selectOption: function(e) {
		    e.preventDefault();
		    var el = $(e.currentTarget);
		    el.parent().find('.value span').data('translate',$(e.currentTarget).find('option:selected').data('translate')).translate();
		    this.loadProducts(el.val());
	    }

    });
});