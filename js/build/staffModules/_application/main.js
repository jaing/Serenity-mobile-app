define(["jquery","backbone","text!staffModules/_application/tpl/msg.tpl","staffModules/_application/modal"],function(e,t,n,r){return t.View.extend({events:{},initialize:function(){Serenity.modal=new r},render:function(e){},loading:function(t){t?e("#overlay").fadeIn():e("#overlay").fadeOut()},message:function(t,r){var i=_.uniqueId("msg"),s=2e3,o={body:t,config:{},id:i};r&&(o.config=r,r.timeout&&(s=r.timeout)),e("#msg-box").append(_.template(n,o)),e(".msg").translate(),setTimeout(function(){e("#"+i).fadeOut(function(t){e("#"+i).remove()})},s)},translate:function(e){var t=e.split("|"),n;e=t.shift(),n=Serenity._translations[Serenity.language][e]||e;while(t.length)n=n.replace("{}",this.translate(t.shift()));return n}})});