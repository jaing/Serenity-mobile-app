define(["jquery","backbone","modules/_application/main","modules/user/main"],function(e,t,n,r){return t.Router.extend({routes:{"":""},initialize:function(){var t=this;Serenity.app=new n,e.ajax({url:"api/global.json",type:"POST"}).success(function(e){_.extend(Serenity,e),t.loadLanguage(e.language)})},loadLanguage:function(t){var n=this;e.ajax({url:"api/"+t+".json",type:"POST"}).success(function(e){Serenity._translations[t]=e,n.loadApplication()})},loadApplication:function(){e("body").translate(),new r({el:"#user-app"})}})});