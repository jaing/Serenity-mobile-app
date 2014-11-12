define(['jquery', 'backbone', 'text!modules/products/tpl/index.tpl','models/product'], function($, Backbone,tpl,ProductModel) {

    var ProductsCollection = Backbone.Collection.extend({
        model: ProductModel
    });
    
    return Backbone.View.extend({

        events: {
			'click .fb': 'moreProductInfo',
	        'click .add-product': 'addProduct'
        },

        initialize: function(e) {
            this.getData()
        },

        render: function(template,data) {
            this.$el.html(_.template(template, data)).translate();
            setTimeout(function(){
                Serenity.scrolls['productsScroll'] = new IScroll('#app-body', {
                    mouseWheel: true,
                    scrollbars: true,
                    fadeScrollbars: true,
	                click: true,
	                tap: true
                });
	            $(".icon").bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
		            return $('.tap').removeClass('active');
	            });
            },100);
        },

	    getData: function () {
		    var me = this;

            Serenity.collections.Products = new ProductsCollection();
            this.collection = Serenity.collections.Products;

		    $.ajax({
			    url: 'api/products.json',
			    type: 'GET',
			    dataType: 'JSON'
		    })
		    .done(function(data) {
                me.collection.add(data);
			    me.render(tpl,{
				    products: me.collection.toJSON()
			    })
		    })
		    .fail(function(data) {
			    Serenity.app.handleError(data);
		    });
	    },

	    moreProductInfo: function (e) {
		    e.preventDefault();
            $(e.currentTarget).parents('.product').find('.more').toggleClass('hidden');
            $(e.currentTarget).parents('.product').find('.more').toggleClass('slideDown');

		    $(e.currentTarget).find('.icon').toggleClass('active');
		    return $(e.currentTarget).find('.tap').addClass('active');
	    },

	    addProduct: function (e) {
		    e.preventDefault();
            var prodId = $(e.currentTarget).data('product-id');
            if (Serenity.basket.get(prodId)) {
                Serenity.basket.get(prodId).set('count',Serenity.basket.get(prodId).get('count')+1);
            } else {
                Serenity.basket.add(_.extend(Serenity.collections.Products.get(prodId).toJSON(), {
                    count: 1
                }));
            }
            Serenity.app.message('label.msg.productAddedToBasket');
	    }
    });
});