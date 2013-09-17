Ext.define('SMS.store.Class',{
    extend: 'Ext.data.Store',
    requires: 'SMS.model.Class' , 
    model: 'SMS.model.Class',
	autoLoad : false,
	autoSync : true
})