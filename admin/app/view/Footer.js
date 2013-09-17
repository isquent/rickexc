Ext.define('SMS.view.Footer',{
    extend: 'Ext.Toolbar',
    initComponent : function(){
        Ext.apply(this,{
            id:"bottom",
            //frame:true,
            region:"south",
            height:23,
            items:[]
        });
        this.callParent(arguments);
    }
})