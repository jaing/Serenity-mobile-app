define(['jquery', 'backbone', 'text!staffModules/products/tpl/card.tpl','models/product'], function($, Backbone,tpl) {

    var CategoriesCollection = Backbone.Collection.extend();

    return Backbone.View.extend({

        events: {
            'click .add-extended-body': 'addExtendedBody',
            'click .btn-language': 'languageModal'
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
                p = {};

            Serenity.collections.Categories = new CategoriesCollection();

            $.ajax({
                url: 'api/categories.json',
                type: 'GET',
                dataType: 'JSON'
            }).done(function(data) {
                Serenity.collections.Categories.add(data);
                if (me.options.state != 'new' && Serenity.collections.Products && Serenity.collections.Products.get(me.options.pId)) {
                    p = Serenity.collections.Products.get(me.options.pId).toJSON();
                    me.render(tpl,{
                        config: me.options,
                        p: p,
                        categories: Serenity.collections.Categories.toJSON()
                    });
                    me.loadForm(p);
                } else if(me.options.state != 'new') {
                    $.ajax({
                        url: 'api/product.json',
                        type: 'POST'
                    }).success(function (data) {
                        me.render(tpl,{
                            config: me.options,
                            p: data,
                            categories: Serenity.collections.Categories.toJSON()
                        });
                        me.loadForm(data);
                    });
                } else {
                    me.render(tpl,{
                        config: me.options,
                        p: {},
                        categories: Serenity.collections.Categories.toJSON()
                    });
                }
            }).fail(function(data) {
                Serenity.app.handleError(data);
            });
        },

        addExtendedBody: function (e) {
            e.preventDefault();
            $(e.currentTarget).toggle();
            $(e.currentTarget).next().toggleClass('hidden');
        },

        loadForm: function (data) {

            this.$el.find('[name="id"]').val(data.id);
            this.$el.find('[name="name"]').val(Serenity.app.translate('label.product.name.'+data.id));
            this.$el.find('[name="body"]').val(Serenity.app.translate('label.product.body.'+data.id));
            this.$el.find('[name="status"]').val(data.status);
            this.$el.find('[name="price"]').val(data.price.value);
            this.$el.find('[name="category"]').val(data.category);
            this.$el.find('[name="currency"]').val(data.price.currency);
            this.$el.find('[name="discount"]').val(data.price.discount);
            if (data.hasExtendedBody) {
                this.$el.find('[name="extendedBody"]').val(Serenity.app.translate('label.product.extendedBody.'+data.id));
            }
            if (data.isPromotion) {
                this.$el.find('[name="isPromotion"]').attr('checked',true);
            }
        },

        languageModal: function (e) {
            e.preventDefault();
            var pId = $(e.currentTarget).data('product-id');
            Serenity.modal.show(
                'label.staff.languageSettings',
                'asdasd',
                [
                    {
                        class: 'btn-primary',
                        label: 'label.staff.save',
                        handler: function() {
                            alert(123)
                        }
                    }
                ]
            );
        }
    });
});