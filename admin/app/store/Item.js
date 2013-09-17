Ext.define('SMS.store.Item',{
    extend: 'Ext.data.Store',
    requires: 'SMS.model.Item', 
    model: 'SMS.model.Item',
	autoLoad : false,
	autoSync : true
})