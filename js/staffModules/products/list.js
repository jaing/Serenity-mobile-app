define(['jquery', 'backbone', 'text!staffModules/products/tpl/list.tpl','models/product'], function($, Backbone,tpl,ProductModel) {

	var ProductsCollection = Backbone.Collection.extend({
		model: ProductModel
	});

	return Backbone.View.extend({

		events: {
			'click .filter legend': 'showFilter'
		},

		initialize: function(e) {
			this.getData()
		},

		render: function(template,data) {
			this.$el.html(_.template(template, data)).translate();
		},

		getData: function () {
			var me = this;

			Serenity.collections.Products = new ProductsCollection();
			this.collection = Serenity.collections.Products;

			$.ajax({
				url: 'api/products.json',
				type: 'GET',
				dataType: 'JSON'
			}).done(function(data) {
				me.collection.add(data);
				me.loadCategories();
			})
			.fail(function(data) {
				Serenity.app.handleError(data);
			});
		},

		loadCategories: function () {
			var me = this;
			$.ajax({
				url: 'api/categories.json',
				type: 'GET',
				dataType: 'JSON'
			}).done(function(data) {
				me.render(tpl,{
					products: me.collection.toJSON(),
					categories: data
				})
			})
				.fail(function(data) {
					Serenity.app.handleError(data);
				});
		},

		showFilter: function (e) {
			this.$el.find('.filter').toggleClass('active');
		}
	});
});