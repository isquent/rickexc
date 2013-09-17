Ext.define('SMS.view.TabPanel',{
    extend: 'Ext.tab.Panel',
    initComponent : function(){
        Ext.apply(this,{
            id: 'content-panel',
            region: 'center', 
            defaults: {
               autoScroll:true,
               bodyPadding: 0
            },
            activeTab: 0,
            border: false,
           //plain: true,
            items: [{
              id: 'HomePage',
              title: '首页',
              iconCls:'home',
              layout: 'fit'
            }]
        });
        this.callParent(arguments);
    }
})