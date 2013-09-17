Ext.define('SMS.model.Apply', {
	extend: 'Ext.data.Model',
	fields: [{name: 'id', type: 'int'}, 'name','jobname','sex','marry','size','phone','birthday','birthaddress','email','address','education','work',{name:'status', type:'int'}],
	root: { 
		expanded: true 
	}, 
	proxy: { 
		type: 'rest', 
	 	url: './apply',
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