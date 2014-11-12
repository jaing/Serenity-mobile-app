define([
	'jquery',
	'backbone',
	'staffModules/_application/main',
    'staffModules/products/list',
	'staffModules/products/card',
	'staffModules/categories/list',
    'staffModules/categories/card',
    'staffModules/orders/list',
    'staffModules/orders/card'
], function ($, Backbone, Application, ProductsList, ProductCard, CategoriesList, CategoriesCard, OrdersList, OrdersCard) {


	return Backbone.Router.extend({

		routes: {
			'': 'loadHome',
			'products': 'loadProductList',
            'products/add': 'loadProductAdd',
            'products/edit/:id': 'loadProductEdit',
			'categories': 'loadCategoriesList',
            'categories/add': 'loadCategoriesAdd',
            'categories/edit/:id': 'loadCategoriesEdit',
            'orders': 'loadOrdersList',
            'orders/edit/:id': 'loadOrdersEdit'
		},
		initialize: function() {
			Serenity.app = new Application({
				el: 'body'
			});
		},

		loadPage: function (page) {
			$.each($('.page'), function(index, val) {
				$(val).addClass('hidden').removeClass('slideRight');
			});
			$('#'+page).addClass('slideRight').removeClass('hidden');
		},

		loadHome: function () {
            this.removeViews();
			this.loadPage('page-home');
		},

        removeViews: function (div) {
            $('#app-header .nav>li').removeClass('active');
            $.each(Serenity.view, function(index, val) {
                val.remove();
            });
            var div = $('<div>', {
                id: div,
                class: 'page hidden'
            });
            div.appendTo('#app-main');
        },

        loadOrdersList: function () {
            var p = 'page-orders-list';
            this.removeViews(p);
            Serenity.view.OrdersList = new OrdersList({
                el: '#'+p
            });
            this.loadPage(p);
            $('[data-page="orders"]').addClass('active');
        },

        loadOrdersEdit: function (e) {
            var p = 'page-orders-card';
            this.removeViews(p);
            Serenity.view.OrdersCard = new OrdersCard({
                el: '#'+p,
                oId: e
            });
            this.loadPage(p);
            $('[data-page="orders"]').addClass('active');
        },

		loadCategoriesList: function () {
			var p = 'page-category-list';
			this.removeViews(p);
			Serenity.view.CategoriesList = new CategoriesList({
				el: '#'+p
			});
			this.loadPage(p);
			$('[data-page="categories"]').addClass('active');
		},

		loadCategoriesAdd: function () {
			var p = 'page-categories-card';
			this.removeViews(p);
			Serenity.view.CategoriesCard = new CategoriesCard({
				el: '#'+p,
				state: 'new'
			});
			this.loadPage(p);
			$('[data-page="categories"]').addClass('active');
		},

        loadCategoriesEdit: function (e) {
            var p = 'page-categories-card';
            this.removeViews(p);
            Serenity.view.CategoriesCard = new CategoriesCard({
                el: '#'+p,
                cId: e,
                state: 'edit'
            });
            this.loadPage(p);

            $('[data-page="categories"]').addClass('active');
        },
        
		loadProductList: function () {
            var p = 'page-products-list';
            this.removeViews(p);
			Serenity.view.ProductsList = new ProductsList({
				el: '#'+p
			});
			this.loadPage(p);
			$('[data-page="products"]').addClass('active');
		},

		loadProductAdd: function() {
            var p = 'page-products-card';
            this.removeViews(p);
            Serenity.view.ProductCard = new ProductCard({
                el: '#'+p,
                state: 'new'
            });
            this.loadPage(p);
			$('[data-page="products"]').addClass('active');
		},

        loadProductEdit: function (e) {
            var p = 'page-products-card';
            this.removeViews(p);
            Serenity.view.ProductCard = new ProductCard({
                el: '#'+p,
                pId: e,
                state: 'edit'
            });
            this.loadPage(p);

	        $('[data-page="products"]').addClass('active');
        }

	});
});