define(['jquery', 'backbone', 'text!staffModules/categories/tpl/list.tpl'], function($, Backbone,tpl) {

	var CategoriesCollection = Backbone.Collection.extend();

	return Backbone.View.extend({

		events: {

		},

		initialize: function(e) {
			this.getData()
		},

		render: function(template,data) {
			console.log(data);
			this.$el.html(_.template(template, data)).translate();
		},

		getData: function () {
			var me = this;
			Serenity.collections.Categories = new CategoriesCollection();
			this.collection = Serenity.collections.Categories;

			$.ajax({
				url: 'api/categories.json',
				type: 'GET',
				dataType: 'JSON'
			}).done(function(data) {
				me.collection.add(data);
				me.render(tpl,{
					c: me.collection.toJSON()
				});
			}).fail(function(data) {
				Serenity.app.handleError(data);
			});

		}
	});
});