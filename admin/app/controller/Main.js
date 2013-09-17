Ext.define('SMS.controller.Main',{
    extend: 'Ext.app.Controller',
	requires: ['SMS.view.Login','SMS.view.Password'],
    init : function(){
		this.getView('Viewport').create();
    },
	onLaunch: function(){
		var UserName = Ext.util.Cookies.get("UserName");
		if (!UserName) {
			Ext.create('SMS.view.Login').show();
		}else{
			Ext.get("logout").show();
			var pwd = Ext.get("changepwd");
			pwd.on('click',function(){
				Ext.create('SMS.view.Password').show();
			})
		}
	},
	views: ['Viewport']
})