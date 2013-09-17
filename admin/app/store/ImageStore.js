Ext.define('SMS.store.ImageStore',{
    extend: 'Ext.data.Store',
    requires: 'SMS.model.ImageModel' , 
    model: 'SMS.model.ImageModel',
	pageSize: 25,
	autoLoad : false,
	autoSync : true
})