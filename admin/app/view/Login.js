Ext.define('SMS.view.Login',{
    extend:'Ext.window.Window',
    alias: 'widget.loginForm',
    requires: ['Ext.form.*'],
    initComponent:function(){
        var form = Ext.widget('form',{
            border: false,
            bodyPadding: 10,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 55,
                labelStyle: 'font-weight:bold'
            },
            defaults: {
                margins: '0 0 10 0'
            },
            items:[{
                xtype: 'textfield',
                fieldLabel: '用户名',
                blankText : '用户名不能为空',
                name:'UserName',
                id:'UserName',
                allowBlank: false,
                width:240
            },{
                xtype: 'textfield',
                fieldLabel: '密   码',
                allowBlank: false,
                blankText : '密码不能为空',
                name:'PassWord',
                id:'PassWord',
                width:240,
                inputType : 'password' 
            }],
            buttons:[{
                text:'登录',
                handler:function(){
                    var form = this.up('form').getForm();
                    var win = this.up('window');
                    if(form.isValid()){
                        form.submit({
                            clientValidation: true,
                            waitMsg:'请稍后',
                            waitTitle:'正在验证登录',
                            url:'../index.php?action=user_login',
                            success: function(form, action) {
                                win.hide();
								Ext.get("logout").show();
                                Ext.getCmp('menu-panel').store.load();
                            },
                            failure: function(form, action) {
                                Ext.MessageBox.show({
                                    width:150,
                                    title:"登录失败",
                                    buttons: Ext.MessageBox.OK,
                                    msg:action.result.errors.msg
                                })
                            }
                        });
                    }
                }
            }]
        })
        Ext.apply(this,{
            height: 130,
            width: 280,
            title: '用户登陆',
            closeAction: 'hide',
            closable : false, 
            iconCls: 'win',
            layout: 'fit',
            modal : true, 
            plain : true,
            resizable: false,
            items:form
        });
        this.callParent(arguments);
    }
});