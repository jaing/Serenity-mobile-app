define(['jquery', 'backbone', 'text!staffModules/orders/tpl/list.tpl', 'staffModules/seatMap/main'], function($, Backbone,tpl, SeatMapView) {

    var OrdersCollection = Backbone.Collection.extend();

    return Backbone.View.extend({

        events: {

        },

        initialize: function(e) {
            this.getData()
        },

        render: function(template,data) {
            this.$el.html(_.template(template, data)).translate();
            new SeatMapView({
                el: '#seat-map'
            })
        },

        getData: function () {
            var me = this;
            Serenity.collections.Orders = new OrdersCollection();
            this.collection = Serenity.collections.Orders;

            $.ajax({
                url: 'api/orders.json',
                type: 'GET',
                dataType: 'JSON'
            }).done(function(data) {
                me.collection.add(data);
                me.render(tpl,{
                    orders: me.collection.toJSON()
                });
            }).fail(function(data) {
                Serenity.app.handleError(data);
            });

        }
    });
});