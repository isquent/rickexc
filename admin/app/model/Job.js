Ext.define('SMS.model.Job', {
	extend: 'Ext.data.Model',
	fields: [{name: 'id', type: 'int', useNull: true}, 'name','enterprise','num','salary','date','connact','email','address','phone','city','duty','requirement','updatetime',{name:'enable',type:'bool'}],
	root: { 
		expanded: true 
	}, 
	proxy: { 
		type: 'rest', 
	 	url: './job',
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