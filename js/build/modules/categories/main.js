define(["jquery","backbone","text!modules/categories/tpl/index.tpl"],function(e,t,n){return t.View.extend({events:{"change #categories":"selectOption"},initialize:function(){this.getData()},render:function(e,t){this.$el.html(_.template(e,t)).translate()},getData:function(){var t=this;e.ajax({url:"api/categories.json",type:"GET",dataType:"JSON"}).done(function(e){t.render(n,{categories:e})}).fail(function(e){Serenity.app.handleError(e)})},loadProducts:function(e){console.log(e)},selectOption:function(t){t.preventDefault();var n=e(t.currentTarget);n.parent().find(".value span").data("translate",e(t.currentTarget).find("option:selected").data("translate")).translate(),this.loadProducts(n.val())}})});