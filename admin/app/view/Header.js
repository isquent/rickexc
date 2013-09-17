Ext.define('SMS.view.Header', {
    extend: 'Ext.Component',
    initComponent: function() {
        Ext.applyIf(this, {
            xtype: 'box',
            cls: 'header',
            region: 'north',
            html: '<h1 style="float:left">管理系统</h1><div id="logout" style="float:right;margin-right:20px;display:none">admin, <a href="###" id="changepwd">修改密码</a>, <a href="../index.php?action=user_logout">退出</a></div>',
            height: 30
        });
        this.callParent(arguments);
    }
});