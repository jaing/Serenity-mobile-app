define(['jquery', 'backbone', 'text!staffModules/orders/tpl/card.tpl','models/product'], function($, Backbone,tpl,ProductModel) {

    var ProductsCollection = Backbone.Collection.extend({
        model: ProductModel
    });

    return Backbone.View.extend({

        events: {

        },

        initialize: function(e) {
            this.options = e;
            this.getData();
        },

        render: function(template,data) {
            this.$el.html(_.template(template, data)).translate();
            this.$el.find('[name="status"]').val(data.o.status);
        },

        getData: function () {
            var me = this;

            Serenity.collections.Products = new ProductsCollection();
            
            $.ajax({
            	url: 'api/products.json',
            	type: 'GET',
            	dataType: 'JSON'
            }).done(function(data) {
                Serenity.collections.Products.add(data);
                me.loadOrder();


            }).fail(function(data) {
                Serenity.app.handleError(data);
            });
        },

        loadOrder: function () {
            var me = this;
            if (Serenity.collections.Orders && Serenity.collections.Orders.get(this.options.oId)) {
                o = Serenity.collections.Orders.get(this.options.oId).toJSON();
                me.renderOrder(o);
            } else {
                $.ajax({
                    url: 'api/order.json',
                    type: 'POST'
                }).success(function (data) {
                    me.renderOrder(data);
                });
            }
        },

        renderOrder: function (data) {
            var products = [];
            $.each(data.products, function(index, val) {
                products.push(Serenity.collections.Products.get(val).toJSON());
            });
            this.render(tpl,{
                products: products,
                o: data
            });
        }
    });
});