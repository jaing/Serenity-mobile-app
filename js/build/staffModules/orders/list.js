define(["jquery","backbone","text!staffModules/orders/tpl/list.tpl","staffModules/seatMap/main"],function(e,t,n,r){var i=t.Collection.extend();return t.View.extend({events:{},initialize:function(e){this.getData()},render:function(e,t){this.$el.html(_.template(e,t)).translate(),new r({el:"#seat-map"})},getData:function(){var t=this;Serenity.collections.Orders=new i,this.collection=Serenity.collections.Orders,e.ajax({url:"api/orders.json",type:"GET",dataType:"JSON"}).done(function(e){t.collection.add(e),t.render(n,{orders:t.collection.toJSON()})}).fail(function(e){Serenity.app.handleError(e)})}})});