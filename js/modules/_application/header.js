define(['jquery', 'backbone'], function($, Backbone) {

    return Backbone.View.extend({

        events: {
            'click #show-aside-menu': 'showAsideMenu',
	        'click .basket': 'toggleBasket'
        },

        render: function(template) {

        },

        showAsideMenu: function(e) {
            e.preventDefault();
            $('#app-aside').toggleClass('active');
            $('body').toggleClass('no-scroll');
            $('#app-body').toggleClass('app-hidden');
        },

	    toggleBasket: function (e) {
		    e.preventDefault();
            $('#basket').toggleClass('active');
            if ($('#basket').hasClass('active')) {
                Serenity.view.BasketView.getData();
            } else {
                if (Serenity.scrolls['basketScroll']) {
                    Serenity.scrolls['basketScroll'].destroy();
                }
            }
	    },

        setTitle: function(title) {
            this.$el.find('.title').html(title);
        }
    });
});