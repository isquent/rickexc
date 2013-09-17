Ext.define('SMS.store.Sale',{
    extend: 'Ext.data.Store',
    requires: 'SMS.model.Sale' , 
    model: 'SMS.model.Sale',
	pageSize: 25,
	autoLoad : false,
	autoSync : true
})