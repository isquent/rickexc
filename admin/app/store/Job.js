Ext.define('SMS.store.Job',{
    extend: 'Ext.data.Store',
    requires: 'SMS.model.Job' , 
    model: 'SMS.model.Job',
	pageSize: 25,
	autoLoad : false,
	autoSync : true
})