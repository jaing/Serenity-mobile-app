define(['jquery', 'backbone', 'text!staffModules/seatMap/tpl/index.tpl'], function($, Backbone,tpl) {

    return Backbone.View.extend({

        events: {

        },

        initialize: function(e) {
            this.getData();
        },

        render: function(template,data) {
            this.$el.html(_.template(template, data)).translate();
        },

        getData: function () {
            var me = this;
            $.ajax({
                url: 'api/StaffSeatMap.json',
                type: 'POST'
            }).success(function (data) {
                me.render(tpl,data);
            });
        }
    });
});