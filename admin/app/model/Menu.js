Ext.define('SMS.model.Menu', {
	extend: 'Ext.data.Model',
	fields: ['id', 'text','iconCls'],
	root: { 
	 expanded: true 
	}, 
	proxy: {
	 type: 'ajax', 
	 url: '../index.php?action=menu_menulist' 
	} 
})