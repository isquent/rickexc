Ext.define('SMS.store.Apply',{
    extend: 'Ext.data.Store',
    requires: 'SMS.model.Apply' , 
    model: 'SMS.model.Apply',
	pageSize: 25,
	autoLoad : false,
	autoSync : true
})