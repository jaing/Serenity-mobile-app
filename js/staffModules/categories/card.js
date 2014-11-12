define(['jquery', 'backbone', 'text!staffModules/categories/tpl/card.tpl','models/product'], function($, Backbone,tpl,ProductModel) {

    var CategoriesCollection = Backbone.Collection.extend();
    var AllCategoriesCollection = Backbone.Collection.extend();
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
		},

		getData: function () {
			var me = this,
				p = {}

            if (Serenity.collections.Categories) {
                this.parseCategories();
                
                if (this.options.state != 'new') {
                    this.renderEdit();
                } else {
                    this.renderNew();
                }

            } else {
                Serenity.collections.Categories = new CategoriesCollection();
                this.collection = Serenity.collections.Categories;
                $.ajax({
                    url: 'api/categories.json',
                    type: 'GET',
                    dataType: 'JSON'
                }).done(function(data) {
                    me.collection.add(data);
                    me.parseCategories();

                    if(me.options.state != 'new') {
                        me.renderEdit();
                    } else {
                        me.renderNew();
                    }
                }).fail(function(data) {
                    Serenity.app.handleError(data);
                });
            }
		},

        renderEdit: function() {
            var p = Serenity.collections.AllCategoriesCollection.get(this.options.cId).toJSON(),
                products,
                me = this;

            Serenity.collections.Products = new ProductsCollection();

            $.ajax({
                url: 'api/staffProducts.json',
                type: 'GET',
                dataType: 'JSON'
            }).done(function(data) {
                Serenity.collections.Products.add(data);
                products = Serenity.collections.Products.toJSON();
                me.render(tpl,{
                    config: me.options,
                    p: p,
                    c: Serenity.collections.Categories.toJSON(),
                    products: products
                });
                me.loadForm(p);
            }).fail(function(data) {
                Serenity.app.handleError(data);
            });
        },

        renderNew: function() {
            this.render(tpl,{
                config: this.options,
                p: {},
                c: Serenity.collections.Categories.toJSON()
            });
        },

        parseCategories: function () {
            Serenity.collections.AllCategoriesCollection = new AllCategoriesCollection();
            $.each(Serenity.collections.Categories.toJSON(), function(index, val) {
                Serenity.collections.AllCategoriesCollection.add(val);
                $.each(val.children, function(index, val) {
                    Serenity.collections.AllCategoriesCollection.add(val);
                });
            });
        },

		loadForm: function (data) {
			console.log(data);
            this.$el.find('[name="id"]').val(data.id);
            this.$el.find('[name="name"]').val(Serenity.app.translate('label.categories.'+data.id));
            if (data.parent) {
                this.$el.find('[name="parent"]').val(data.parent);
            }
		}
	});
});