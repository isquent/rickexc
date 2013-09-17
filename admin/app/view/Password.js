Ext.define('SMS.view.Password',{
    extend:'Ext.window.Window',
    alias: 'widget.pwdForm',
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
                fieldLabel: '密   码',
                allowBlank: false,
                blankText : '密码不能为空',
                name:'PassWord',
                id:'PassWord',
                width:240,
                inputType : 'password' 
            },{
                xtype: 'textfield',
                fieldLabel: '密   码',
                allowBlank: false,
                blankText : '密码不能为空',
                name:'PassWord2',
                id:'PassWord2',
                width:240,
                inputType : 'password',
				initialPassField : 'PassWord',
				validator : function(val,field){
					var field = this;
				    if (field.initialPassField) {
				        var pwd = Ext.getCmp(field.initialPassField);
				        return (val == pwd.getValue());
				    }
				    return true;					
				},
				passwordText: '密码不匹配！'
            }],
            buttons:[{
                text:'修改',
                handler:function(){
                    var form = this.up('form').getForm();
                    var win = this.up('window');
                    if(form.isValid()){
                        form.submit({
                            clientValidation: true,
                            waitMsg:'请稍后',
                            waitTitle:'正在修改密码',
                            url:'../index.php?action=user_pwd',
                            success: function(form, action) {
                                win.destroy();
                                Ext.MessageBox.show({
                                    width:150,
                                    title:"",
                                    buttons: Ext.MessageBox.OK,
                                    msg:"密码修改成功"
                                })								
                            },
                            failure: function(form, action) {
                                Ext.MessageBox.show({
                                    width:150,
                                    title:"密码修改失败",
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
            title: '修改密码',
            closeAction: 'hide',
            closable : true, 
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