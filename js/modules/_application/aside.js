define(['jquery', 'backbone', 'text!modules/_application/tpl/aside.tpl'], function($, Backbone,tpl) {

    return Backbone.View.extend({

        events: {

        },

        initialize: function(e) {
            this.getData()
        },

        render: function(template,data) {
            this.$el.html(_.template(template, data)).translate();
        },

        getData: function () {
            this.render(tpl,{

            })
        }
    });
});