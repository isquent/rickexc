Ext.define('SMS.store.History',{
    extend: 'Ext.data.Store',
    requires: 'SMS.model.History', 
    model: 'SMS.model.History',
	autoLoad : false,
	autoSync : true
})