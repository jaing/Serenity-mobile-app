define(["jquery","backbone","text!modules/seatMap/tpl/index.tpl"],function(e,t,n){return t.View.extend({events:{},initialize:function(e){this.getData()},render:function(e,t){this.$el.html(_.template(e,t)).translate()},getData:function(){var t=this;e.ajax({url:"api/seatMap.json",type:"POST"}).success(function(e){t.render(n,e)})}})});