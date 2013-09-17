Ext.define('SMS.model.ImageModel', {
	extend: 'Ext.data.Model',
	fields: [{name: 'id', type: 'int', useNull: true}, 'name','path','oldname','enable','title','desc'],
	root: {
		expanded: true 
	}, 
	proxy: { 
		type: 'rest', 
	 	url: './image',
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
			type : 'json',
			writeAllFields: false
		}
	}
})