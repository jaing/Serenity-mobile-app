define([
    'jquery', 'backbone',
    'text!modules/user/tpl/index.tpl',
    'modules/products/main',
    'modules/categories/main',
    'modules/basket/main',
    'modules/_application/header',
    'modules/_application/aside'
], function($, Backbone,tpl,ProductsView,CategoriesView,BasketView,HeaderView,AsideView) {


    return Backbone.View.extend({

        events: {
			
        },

        initialize: function(e) {
            this.render(tpl)
        },

        render: function(template) {
            this.$el.html(_.template(template, this.getData())).translate();

            Serenity.view.HeaderView = new HeaderView({
                el: this.$el.find('#app-header')
            });
            Serenity.view.BasketView = new BasketView({
                el: this.$el.find('#basket')
            });
            Serenity.view.ProductsView = new ProductsView({
                el: this.$el.find('.products-container')
            });
            Serenity.view.CategoriesView = new CategoriesView({
                el: this.$el.find('.categories')
            });
            Serenity.view.AsideView = new AsideView({
                el: this.$el.find('#app-aside')
            });
            Serenity.app.loading(false);
        },

        getData: function () {
            return {
                user: Serenity.user,
	            title: Serenity.title
            }
        }
    });
});