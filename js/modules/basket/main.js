define(['jquery', 'backbone', 'text!modules/basket/tpl/index.tpl','models/product','modules/seatMap/main'], function($, Backbone,tpl,ProductModel,SeatMapView) {

    var Basket = Backbone.Collection.extend({
        model: ProductModel
    });

    return Backbone.View.extend({

        events: {
            'click .plus': 'changeProductCount',
            'click .minus': 'changeProductCount',
            'change input': 'changeBasket',
            'click .remove': 'removeProductFromBasket',
            'click .basket-confirm': 'confirmOrder',
            'click .go-back': 'goBack'
        },

        initialize: function(e) {
            Serenity.basket = new Basket();
            Serenity.basket.bind('add remove',this.handleBasketChange, this);
        },

        render: function(template,data) {
            this.$el.html(_.template(template, data)).translate();
            setTimeout(function(){
                Serenity.scrolls['basketScroll'] = new IScroll('#basket', {
                    mouseWheel: true,
                    scrollbars: true,
                    fadeScrollbars: true,
                    click: true,
                    tap: true
                });
            },100);
        },

        getData: function () {
            this.render(tpl,{
                products: Serenity.basket.toJSON()
            });
        },

        handleBasketChange: function (a, b) {
            $('#app-header').find('.badge').html(b.length);
        },

        changeProductCount: function (e) {
            e.preventDefault();
            var pID = $(e.currentTarget).data('product-id'),
                el = this.$el.find('#basket-product-'+pID+' input'),
                cV = el.val();

            if ($(e.currentTarget).hasClass('plus')) {
                el.val(parseInt(cV)+1);
                el.trigger('change');
            } else {
                if (cV != 1) {
                    el.val(parseInt(cV)-1);
                    el.trigger('change');
                }
            }
        },

        changeBasket: function (e) {
            var pId = $(e.currentTarget).data('product-id'),
                currentCount = Serenity.basket.get(pId).get('count');
            Serenity.basket.get(pId).set('count',parseInt($(e.currentTarget).val()));
            this.calculateTotal();
        },

        calculateTotal: function () {
            var total = 0;
            $.each(Serenity.basket.toJSON(), function(index, val) {
                total+=val.price.value*val.count;
            });
            this.$el.find('#basket-total .total').html(total.toFixed(2)+' '+Serenity.basket.toJSON()[0].price.currency);
        },

        removeProductFromBasket: function(e) {
            e.preventDefault();
            var pId = $(e.currentTarget).data('product-id');
            Serenity.basket.remove(pId);
            this.getData();
        },

        confirmOrder: function (e) {
            e.preventDefault();
            if (Serenity.orderType === 'seat') {
                new SeatMapView({
                    el: '#step-2'
                });
            }
            this.$el.find('#step-1').removeClass('slideDown');
            this.$el.find('#step-2').addClass('slideDown');
            this.$el.find('#step-1').addClass('hidden');
            this.$el.find('#step-2').removeClass('hidden');
	        Serenity.app.refreshScroll();
        },

        goBack: function (e) {
            e.preventDefault();
            this.$el.find('#step-2').removeClass('slideDown');
            this.$el.find('#step-1').addClass('slideDown');
            this.$el.find('#step-2').addClass('hidden');
            this.$el.find('#step-1').removeClass('hidden');
	        Serenity.app.refreshScroll();
        }
    });
});