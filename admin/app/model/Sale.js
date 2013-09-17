Ext.define('SMS.model.Sale', {
	extend: 'Ext.data.Model',
	fields: [{name: 'id', type: 'int', useNull: true}, 'name','address','salephone','serverphone','city','category'],
	root: { 
		expanded: true 
	}, 
	proxy: { 
		type: 'rest', 
	 	url: './sale',
		api: {
			//read : '../index.php?action=sale_getList',
			//update : '../index.php?action=sale_update',
			//write : '../index.php?action=sale_add',
			//destroy : '../index.php?action=sale_delete'
		},
	 	reader: {
	 		type: 'json',
			root: 'items',
			totalProperty: 'total'
	 	},
		write: {
			type : 'json'
		}
	}
})