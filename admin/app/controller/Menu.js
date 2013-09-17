Ext.define('SMS.controller.Menu',{
    extend: 'Ext.app.Controller',
    refs:[
        {ref: 'smsmenu',selector: 'smstablepanel'},
        {ref: 'tabPanel',selector:'smstablepanel'}
    ],
	stores:['Sale'],
    init:function(){
        this.control({
            'smsmenu': {
                itemmousedown: this.loadMenu
            }
        })
    },
    loadMenu:function(selModel, record){
        if (record.get('leaf')) {
            var panel = Ext.getCmp(record.get('id')); 
            if(!panel){
				panel = this.createPanel(record);
                this.openTab(panel,record.get('id'));
            }else{
                var main = Ext.getCmp("content-panel");
                main.setActiveTab(panel); 
            }
        } 
    },
    openTab : function (panel,id){
        var o = (typeof panel == "string" ? panel : id || panel.id);
        var main = Ext.getCmp("content-panel");
        var tab = main.getComponent(o);      
        if (tab) {
            main.setActiveTab(tab); 
        } else if(typeof panel!="string"){ 
            panel.id = o; 
            var p = main.add(panel); 
            main.setActiveTab(p); 
        } 
    },
	createPanel : function(record){
		var panel;
		var id = record.get('id');
		switch(id){
			case '1_0':
				panel = this.indexPanel(record);
				break;
			case '1_3':
				panel = this.historyPanel(record);
				break;
			case '1_4' :
				panel = this.storyPanel(record);
				break;
			case '1_5' :
				panel = this.adPanel(record);
				break;				
			case '2' :
				panel = this.onlinePanel(record);
				break;
			case '3_1':
				panel = this.classPanel(record);
				break;
			case '3_2':
				panel = this.itemPanel(record);
				break;				
			case '4' :
				panel = this.salePanel(record);
				break;			
			case '5_1' :
				panel = this.jobPanel(record);
				break;
			case '5_2' :
				panel = this.applyPanel(record);
				break;				
			case '7':
				panel = this.bgPanel(record);
				break;
			default :
		        panel ={
		            title: record.get('text'), 
		            iconCls: 'tabs', 
		            html: 'Tab Body ' + record.get('text') + '<br/><br/>', 
		            closable: true 
		        }

			return panel;							
		}		
		return panel;
	},
	adPanel	: function(record){	
		panel = Ext.create("Ext.form.Panel",{
			frame : true,
			title: 'AD',
		    bodyPadding: 5,
		    width: 650,
		    url: 'ad.php',
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
		    defaultType: 'textfield',
		    items: [{
				xtype: 'checkbox',
				name: 'isshow',
				fieldLabel: '是否显示',
				inputValue: true,
				checked: true,
				id : 'isshow'				
		    },{
		        fieldLabel: '点击地址',
		        name: 'url',
				id: 'adurl',
				vtype: 'url',
				allowBlank: true
		    },{
		        fieldLabel: '图片',
		        name: 'pic',
				id : 'adupload',
				xtype: 'filefield',
				buttonText: 'Select Photo...',
		        allowBlank: true,
				listeners:{
					change: function(context, value, eOpts){
						var img_reg = /\.jpg$|\.jpeg$|\.gif$|\.png$|\.bmp$/;
						if(img_reg.test(value)){
                            if(Ext.isIE)
                            {
                               var image = Ext.get('imgPriview').dom;  
                                image.src = Ext.BLANK_IMAGE_URL;  
                                image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src= 'file:///'+value; 
                            }//支持FF
                            else
                            {  	
								oFReader = new FileReader();
							 	oFReader.readAsDataURL(Ext.get('adupload-button-fileInputEl').dom.files[0]);
								oFReader.onload = function (oFREvent) {
								            Ext.get('imgPriview').dom.src = oFREvent.target.result;
								        };
                            }  																
						}
					}
				}				
		    },{
			                xtype: 'container',			               
			               fieldLabel : "预览图片",	
						   align:'center',					   
						   items:[{
							   xtype: 'component',
							   style: {align:'center'},
							   align:'center',
							   id : 'imgPriview',
				               autoEl : {
								   align:'center',
				                   tag : 'img',
				                   src : '../upload/bgimgs/ad.png',//Ext.BLANK_IMAGE_URL,							   
				                   style : 'width:400px;',
				                   complete:'off',
								   width:'400px',
				                   id : 'imageBrowse'
				                }}						   
						   ]			               
						}],
		    buttons: [{
		        text: 'Reset',
		        handler: function() {
		            //this.up('form').getForm().reset();
		        }
		    }, {
		        text: '提交',
		        formBind: true, //only enabled once the form is valid
		        disabled: true,
		        handler: function() {
		            var form = this.up('form').getForm();
		            if (form.isValid()) {
		                form.submit({
		                    url: './ad_upload',
							jsonSubmit: true,
		                    waitMsg: 'set ad info',							
		                    success: function(form, action) {
		                       Ext.Msg.alert('Success', action.result.msg);
		                    },
		                    failure: function(form, action) {
		                        Ext.Msg.alert('Failed', action.result.msg);
		                    }
		                });
		            }
		        }
		    }],
		    renderTo: Ext.getBody()			
		});

	    Ext.Ajax.request({
	        url: './ad_read',
	        success: function(response){
				var re = JSON.parse(response.responseText);
	            Ext.getCmp('adurl').setValue(re['url']);
				Ext.getCmp('isshow').setValue(re['isshow'] ? true : false);
	        }
	    });
		
		return panel;
	},
	salePanel : function(record){
		var store = Ext.create('SMS.store.Sale');
		store.loadPage(1);
		var editing = Ext.create('Ext.grid.plugin.RowEditing',{clicksToMoveEditor:2,listeners:{
			beforeedit: function(editor,context,opt){
				//console.log(context);
			}
		}});
	    panel = Ext.create("Ext.grid.Panel",{
	    	store : store,
			defaults:{
				flex: 1
			},					
	     	columns:[{
	     		text: 'ID',
				dataIndex: 'id',
				align: 'center'
	     	},{
	     		'text' : '专卖店',
				'dataIndex' : 'name',
				align: 'center',
				editor:'textfield',
				flex:2
	     	},{
	     		text: '城市',
				dataIndex: 'city',
				editor:'textfield',
				width: 100
	     	},{
	     		'text' : '地址',
				'dataIndex' : 'address',
				align: 'center',
				editor:{
					xtype: 'textfield'
				},
				flex:3
	     	},{
	     		text: '主营产品',
				dataIndex: 'category',
				align: 'center',
				editor: 'textfield',
				flex: 1
	     	},{
	     		'text' : '销售热线',
				'dataIndex' : 'salephone',
				align: 'center',
				editor: 'textfield',
				flex: 1							     		
	     	},{
	     		'text' : '服务热线',
				'dataIndex' : 'serverphone',
				align: 'center',
				editor: 'textfield',
				flex: 1
	     	}],
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),
	      	viewConfig: {
	      	  stripeRows: true
	     	},
			forceFit: true,
	     	closable: true,
			/*
			selModel: {
				selType: 'checkboxmodel'
			},
			*/
			plugins:[
				editing
			],
			dockedItems:[{
				xtype: 'toolbar',
				doct: 'top',
				items: [{
					text:'add',
					iconCls: 'drop-add',
					handler:function(){
				        var rec = new SMS.model.Sale({
							'name': '',
							'address': '',
							'salephone': '',
							'serverphone': '',
							'city': ''
				        });

				        editing.cancelEdit();
				        store.insert(0, rec);
				        /*
						editing.startEditByPosition({
				            row: 0,
				            column: 1
				        });
						*/
						editing.startEdit(0,0);
						
					}
				},{
					text: 'delete',
					iconCls: 'user',
					//scope: panel,
					handler: function(){
						Ext.MessageBox.confirm('删除', '确定删除 ?', function(btn){
						   if(btn === 'yes'){
		   		                var sm = panel.getSelectionModel();
		   		                 editing.cancelEdit();								
		   		                 store.remove(sm.getSelection());
		   		                 if (store.getCount() > 0) {
		   		                     sm.select(0);
		   		                 }
						   }
						 });
					}
				}]
			},{
				xtype: 'pagingtoolbar',
				store: store,
				dock: 'bottom',
				displayInfo: true,
				displayMsg: 'Displaying {0} - {1} of {2}'
			}]
	    });
		return panel;		
	},
	jobPanel : function(record){
	
		var store = Ext.create('SMS.store.Job');
		store.loadPage(1);
		var editing = Ext.create('Ext.grid.plugin.RowEditing',{clicksToMoveEditor:2,listeners:{
			beforeedit: function(editor,context,opt){
				//console.log(context);
			}
		}});
	    panel = Ext.create("Ext.grid.Panel",{
	    	store : store,
			defaults:{
				flex: 1
			},					
	     	columns:[{
	     		text: 'ID',
				dataIndex: 'id',
				align: 'center',
				flex:1
	     	},{
	     		'text' : '职位名称',
				'dataIndex' : 'name',
				align: 'center',
				flex:2,
				editor:'textfield'
	     	},{
	     		text: '招聘单位',
				dataIndex: 'enterprise',
				flex:2,
				editor: 'textfield',
	     	},{
	     		text: '工作地点',
				dataIndex: 'city',
				editor:'textfield',
				flex:2
	     	},{
	     		'text' : '招聘人数',
				'dataIndex' : 'num',
				align: 'right',
				flex:1,
				editor:{
					xtype: 'numberfield',
					maxValue: 100,
					minValue: 0					
				}
	     	},{
				xtype: 'numbercolumn',
	     		'text' : '薪酬待遇',
				'dataIndex' : 'salary',
				format: '￥0,0',
				align: 'center',
				flex:2,
				editor: {
					xtype: 'numberfield',
					maxValue: 1000000,
					minValue: 0
				}
	     	},{
	     		'text' : '联系电话',
				'dataIndex' : 'phone',
				align: 'center',
				flex:2,
				editor: 'textfield'
	     	},{
	     		text: '有效时间',
				dataIndex: 'date',
				flex:2,
				editor: 'textfield'
	     	},{
	     		text: '联系人',
				dataIndex: 'connact',
				flex:2,
				editor: 'textfield'
	     	},{
	     		text: '电子邮箱',
				dataIndex: 'email',
				flex:2,
				editor: {
					xtype: 'textfield',
					allowBlank: true,
					//validateBlank: false ,
					vtype: 'email'
				}
	     	},{
	     		text: '详细地址',
				dataIndex: 'address',
				flex:3,
				editor: 'textfield'
	     	},{
	     		text: '工作职责',
				dataIndex: 'duty',
				flex:3,
				//width:250,
				editor: {
					xtype: 'textareafield',
					grow: true,					
                    enterIsSpecial: true,
                    listeners: {
                        specialkey: function(field, e){
                            // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                            // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                            if (e.getKey() == e.ENTER) {
                                //field.value += "\nxxxxxxxxxxxxxxxxxxxxxxxxxxx";
                                //e.stopEvent();
                                //e.cancelBubble=true;
                                e.stopPropagation();
                                return ;
                            }
                        }
                    }  										
				}
	     	},{
	     		text: '职位要求',
				dataIndex: 'requirement',
				flex:3,
				//width:250,			
				editor: {
					xtype: 'textareafield',
					grow: true,
                    enterIsSpecial: true,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                //field.value += "\nxxxxxxxxxxxxxxxxxxxxxxxxxxx";
                                e.stopPropagation();
                                return ;
                            }
                        }
                    }					
				}
	     	},{
				xtype: 'checkcolumn',
	     		header: '可用?',
				dataIndex: 'enable',
				flex:1,
				editor: {
	                xtype: 'checkbox',
	                cls: 'x-grid-checkheader-editor'			
				}
	     	}],
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),
	      	viewConfig: {
	      	  stripeRows: true			 
	     	},
			forceFit: false,
	     	closable: true,
			plugins:[
				editing
			],
			dockedItems:[{
				xtype: 'toolbar',
				doct: 'top',
				items: [{
					text:'add',
					iconCls: 'drop-add',
					handler:function(){
				        var rec = new SMS.model.Job({num:1, salary:5000});
				        editing.cancelEdit();
				        store.insert(0, rec);
						editing.startEdit(0,0);						
					}
				},{
					text: 'delete',
					iconCls: 'user',
					//scope: panel,
					handler: function(){
						Ext.MessageBox.confirm('删除', '确定删除 ?', function(btn){
						   if(btn === 'yes'){
		   		                var sm = panel.getSelectionModel();
		   		                 editing.cancelEdit();								
		   		                 store.remove(sm.getSelection());
		   		                 if (store.getCount() > 0) {
		   		                     sm.select(0);
		   		                 }
						   }
						 });
					}
				}]
			},{
				xtype: 'pagingtoolbar',
				store: store,
				dock: 'bottom',
				displayInfo: true,
				displayMsg: 'Displaying {0} - {1} of {2}'
			}]
	    });
		return panel;		
	},
	applyPanel : function(record){
		var me = this;
		var store = Ext.create('SMS.store.Apply');
		store.loadPage(1);
		var editing = Ext.create('Ext.grid.plugin.CellEditing',{clicksToEditor:2,listeners:{
			beforeedit: function(editor,context,opt){
				//console.log(context);
			}
		}});
	    panel = Ext.create("Ext.grid.Panel",{
	    	store : store,
			padding : '8 0 0 0',  
			defaults:{
				flex: 1
			},
	     	columns:[{
	     		text: 'ID',
				dataIndex: 'id',
				align: 'center',
				flex:1
	     	},{
	     		'text' : '职位名称',
				'dataIndex' : 'jobname',
				align: 'center',
				flex:2
	     	},{
	     		text: '姓名',
				dataIndex: 'name',
				flex:2
	     	},{
	     		text: '性别',
				dataIndex: 'sex',
				flex:1,
				renderer: function(value){
					return value == 1 ? '男' : '女' ;
				}
	     	},{
	     		'text' : '婚否',
				'dataIndex' : 'marry',
				flex:1,
				renderer: function(value){
					return value == 1 ? '已婚' : '未婚';
				}
	     	},{
	     		'text' : '身高/体重',
				'dataIndex' : 'size',
				align: 'center',
				flex:2
	     	},{
	     		'text' : '联系电话',
				'dataIndex' : 'phone',
				align: 'center',
				flex:2
	     	},{
	     		text: '出生日期',
				dataIndex: 'birthday',
				flex:2
	     	},{
	     		text: '户籍所在地',
				dataIndex: 'birthaddress',
				flex:3
	     	},{
	     		text: '电子邮箱',
				dataIndex: 'email',
				flex:2
	     	},{
	     		text: '联系地址',
				dataIndex: 'address',
				flex:3
	     	},{
	     		text: '教育经历',
				dataIndex: 'education',
				flex:3,
				//width:250,
	     	},{
	     		text: '工作经历',
				dataIndex: 'work',
				flex:3,
				//width:250
	     	},{
	     		header: '详情',
				dataIndex: '',
				flex:1,
				renderer: function(){return '<a>查看</a>'},
				listeners:{
					scope: this,
					click: function(){
						var record = arguments[5] ;
						me.applyViewWindow(record);
					}					
				}				
	     	},{
	     		header: '状态?',
				dataIndex: 'status',
				flex:2,
				renderer: function(value){
					var show = '';
					switch(value){
						case 0 :
							show='未处理';
							break;
						case 1 :
							show='已通过';
							break;
						case 2:
							show='未通过';
							break;
					}
					return show;
				},
				editor: {
					xtype: 'combo',
					store: [[0,'未处理'],[1,'已通过'],[2,'未通过']]
				}
	     	}],
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),
	      	viewConfig: {
	      	  stripeRows: true			 
	     	},
			forceFit: true,
	     	closable: true,
			plugins:[
				editing
			],
			dockedItems:[{
				xtype: 'toolbar',
				doct: 'top',
				items: [{
					text: 'delete',
					iconCls: 'user',
					//scope: panel,
					handler: function(){
						Ext.MessageBox.confirm('删除', '确定删除 ?', function(btn){
						   if(btn === 'yes'){
		   		                var sm = panel.getSelectionModel();
		   		                 editing.cancelEdit();								
		   		                 store.remove(sm.getSelection());
		   		                 if (store.getCount() > 0) {
		   		                     sm.select(0);
		   		                 }
						   }
						 });
					}
				}]
			},{
				xtype: 'pagingtoolbar',
				store: store,
				dock: 'bottom',
				displayInfo: true,
				displayMsg: 'Displaying {0} - {1} of {2}'
			}]
	    });
		return panel;		
	},	
	classPanel : function(record){
		var familyStore = Ext.create('SMS.store.Class');
		familyStore.load({params:{pid:0}});
		var store = Ext.create('SMS.store.Class');
		store.getProxy().extraParams = {pid:''};
		store.load();
		var editing = Ext.create('Ext.grid.plugin.RowEditing',{clicksToMoveEditor:2,listeners:{
			beforeedit: function(editor,context,opt){
				//console.log(context);
			}
		}});
	    panel = Ext.create("Ext.grid.Panel",{
	    	store : store,
			defaults:{
				flex: 1
			},					
	     	columns:[{
	     		text: 'ID',
				dataIndex: 'id',
				align: 'center'
	     	},{
	     		header:'pid',
				dataIndex: 'pid',
				align: 'center',
				renderer:function(value){
				    var Index = familyStore.findBy(function(record, id) {
				        return record.get('id') == value;
				    });
				    return Index == -1 ? value : familyStore.getAt(Index).get("name");
				},
				editor:{
					xtype: 'combo',
					editable:false,
				    store: familyStore,
					queryMode: 'local',
				    displayField: 'name',
				    valueField: 'id'
				}
	     	},{
	     		'text' : 'name',
				'dataIndex' : 'name',
				align: 'center',
				editor:'textfield',
				flex:1
	     	},{
	     		'text' : '描述',
				'dataIndex' : 'desc',
				align: 'center',
				editor: {
					xtype: 'textareafield',
					grow: true,					
                    enterIsSpecial: true,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                e.stopPropagation();
                                return ;
                            }
                        }
                    }  
				},
				flex: 3
	     	},{
	     		header: '缩略图',
				dataIndex: 'imgpath',
				renderer: function(value,metaData,record,rowIndex,colIndex,store,view){
					if(value)	
						metaData.tdAttr = ' data-qtitle="缩略图" data-qtip=\'<img src=\"../'+value+'\" />\' data-maxWidth=200 ';
					return '<a href="###">'+(value ? '查看' : '上传')+'</a>';
				},
				listeners:{
					scope: this,
					click: function(){
						var record = arguments[5] ;
						this.uploadForm('brand_class_prev','image',record.get('id'),function(item){
							record.set('imgid',item.id);
							record.set('imgpath',item.path+item.name);
						});
					}					
				}
	     	},{
	     		header: '背景图',
				dataIndex: 'bgimgpath',
				renderer: function(value,metaData,record,rowIndex,colIndex,store,view){
					if(value)	
						metaData.tdAttr = ' data-qtitle="背景图" data-qtip=\'<img src=\"../'+value+'\" />\' data-maxWidth=200';
					return '<a href="###">'+(value ? '查看' : '上传')+'</a>';
				},
				listeners:{
					scope: this,
					click: function(){
						var record = arguments[5] ;
						this.uploadForm('brand_class_bg','image',record.get('id'),function(item){
							record.set('bgimgid',item.id);
							record.set('bgimgpath',item.path+item.name);
						});
					}					
				}
	     	}],
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),
	      	viewConfig: {
	      	  stripeRows: true
	     	},
			forceFit: true,
	     	closable: true,
			plugins:[
				editing
			],
			dockedItems:[{
				xtype: 'toolbar',
				doct: 'top',
				items: [{
					text:'add',
					iconCls: 'drop-add',
					handler:function(){
				        var rec = new SMS.model.Class({imgid:0,bgimgid:0});
				        editing.cancelEdit();
				        store.insert(0, rec);
						editing.startEdit(0,0);
					}
				},{
					text: 'delete',
					iconCls: 'user',
					//scope: panel,
					handler: function(){
						Ext.MessageBox.confirm('删除', '确定删除 ?', function(btn){
						   if(btn === 'yes'){
		   		                var sm = panel.getSelectionModel();
		   		                 editing.cancelEdit();								
		   		                 store.remove(sm.getSelection());
		   		                 if (store.getCount() > 0) {
		   		                     sm.select(0);
		   		                 }
						   }
						 });
					}
				}]
			},{
				xtype: 'pagingtoolbar',
				store: store,
				dock: 'bottom',
				displayInfo: true,
				displayMsg: 'Displaying {0} - {1} of {2}'
			}]
	    });
		return panel;		
	},	
	itemPanel : function(record){
		var me = this;
		var familyStore = Ext.create('SMS.store.Class');
		familyStore.load({params:{pid:''}});
		var store = Ext.create('SMS.store.Item');
		store.getProxy().extraParams = {pid:''};
		store.load();
		var editing = Ext.create('Ext.grid.plugin.RowEditing',{clicksToMoveEditor:2,listeners:{
			beforeedit: function(editor,context,opt){}
		}});
		
		Ext.tip.QuickTipManager.init();
		
	    panel = Ext.create("Ext.grid.Panel",{
	    	store : store,
			defaults:{
				flex: 1
			},					
	     	columns:[{
	     		text: 'ID',
				dataIndex: 'id',
				align: 'center'
	     	},{
	     		header:'pid',
				dataIndex: 'pid',
				align: 'center',
				renderer:function(value){//console.log(typeof value);
				    var Index = familyStore.findBy(function(record, id) {
				        return record.get('id') == value;
				    });
					//Index = Index == -1 ? 1 : Index;
				    return Index == -1 ? value : familyStore.getAt(Index).get("name");
				},
				editor:{
					xtype: 'combo',
					editable:false,
				    store: familyStore,
					queryMode: 'local',
				    displayField: 'name',
				    valueField: 'id'
				}
	     	},{
	     		'text' : 'name',
				'dataIndex' : 'name',
				align: 'center',
				editor:'textfield',
				flex:1
	     	},{
	     		'text' : '描述',
				'dataIndex' : 'desc',
				align: 'center',
				editor: {
					xtype: 'textareafield',
					grow: true,					
                    enterIsSpecial: true,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                e.stopPropagation();
                                return ;
                            }
                        }
                    }  
				},
				flex: 3
	     	},{
	     		header: '缩略图',
				dataIndex: 'imgpath',
				renderer: function(value,metaData,record,rowIndex,colIndex,store,view){	
					if(value)						
						metaData.tdAttr = ' data-qtitle="缩略图" data-qtip=\'<img src=\"../'+value+'\" />\'';
					return '<a href="###">'+(value ? '查看' : '上传')+'</a>';
				},
				listeners:{
					scope: this,
					click: function(){
						var record = arguments[5] ;
						this.uploadForm('brand_item_prev','image',record.get('id'),function(item){
							record.set('imgid',item.id);
							record.set('imgpath',item.path+item.name);
						});
					}					
				}
	     	},{
	     		header: '查看',
				renderer: function(){
					return '查看';
				},
				listeners: {
					scope: this,
					click: function(){
						var record = arguments[5] ;
						this.dataViewWindow('brand_item',record.get('id'));
					}
				}
	     	}],
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),
	      	viewConfig: {
	      	  stripeRows: true
	     	},
			forceFit: true,
	     	closable: true,
			plugins:[
				editing
			],
			dockedItems:[{
				xtype: 'toolbar',
				doct: 'top',
				items: [{
					text:'add',
					iconCls: 'drop-add',
					handler:function(){
				        var rec = new SMS.model.Item({imgid:0});
				        editing.cancelEdit();
				        store.insert(0, rec);
						editing.startEdit(0,0);
					}
				},{
					text: 'delete',
					iconCls: 'user',
					//scope: panel,
					handler: function(){
						Ext.MessageBox.confirm('删除', '确定删除 ?', function(btn){
						   if(btn === 'yes'){
		   		                var sm = panel.getSelectionModel();
		   		                 editing.cancelEdit();								
		   		                 store.remove(sm.getSelection());
		   		                 if (store.getCount() > 0) {
		   		                     sm.select(0);
		   		                 }
						   }
						 });
					}
				},{
					xtype: 'combo',
					//fieldLabel: 'search',
				    store: familyStore,
					queryMode: 'local',
				    displayField: 'name',
				    valueField: 'id',
					listeners:{
						change: function(field, newValue, oldValue, eOpts){
							store.getProxy().extraParams = {pid:newValue};
							store.reload();
							//store.load({params:{pid:newValue}});
						}
					}				
				}]
			},{
				xtype: 'pagingtoolbar',
				store: store,
				dock: 'bottom',
				displayInfo: true,
				displayMsg: 'Displaying {0} - {1} of {2}'
			}]
	    });
		return panel;		
	},		
	historyPanel: function(record){	
		var store = Ext.create('SMS.store.History');
		store.loadPage(1);
		var editing = Ext.create('Ext.grid.plugin.RowEditing',{clicksToMoveEditor:2,listeners:{
			beforeedit: function(editor,context,opt){
				//console.log(context);
			}
		}});
	    panel = Ext.create("Ext.grid.Panel",{
	    	store : store,
			defaults:{
				flex: 1
			},					
	     	columns:[{
	     		text: 'ID',
				dataIndex: 'id',
				align: 'center',
				flex:1
	     	},{
	     		header : '标题',
				dataIndex : 'title',
				align: 'center',
				flex:4,
				editor:'textfield'
	     	},{
	     		text: '代码',
				dataIndex: 'code',
				flex:10,				
				editor: 'textfield',
				renderer: 'htmlEncode'
	     	}],
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),
	      	viewConfig: {
	      	  stripeRows: true			 
	     	},
			forceFit: false,
	     	closable: true,
			plugins:[
				editing
			],
			dockedItems:[{
				xtype: 'toolbar',
				doct: 'top',
				items: [{
					text:'add',
					iconCls: 'drop-add',
					handler:function(){
				        var rec = new SMS.model.History({});
				        editing.cancelEdit();
				        store.insert(0, rec);
						editing.startEdit(0,0);						
					}
				},{
					text: 'delete',
					iconCls: 'user',
					//scope: panel,
					handler: function(){
						Ext.MessageBox.confirm('删除', '确定删除 ?', function(btn){
						   if(btn === 'yes'){
		   		                var sm = panel.getSelectionModel();
		   		                 editing.cancelEdit();								
		   		                 store.remove(sm.getSelection());
		   		                 if (store.getCount() > 0) {
		   		                     sm.select(0);
		   		                 }
						   }
						 });
					}
				}]
			},{
				xtype: 'pagingtoolbar',
				store: store,
				dock: 'bottom',
				displayInfo: true,
				displayMsg: 'Displaying {0} - {1} of {2}'
			}]
	    });
		return panel;			
	},
	indexPanel: function(record){
		var me = this;
		var module = 'index_index';
	    panel = Ext.create('Ext.Panel', {
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),	
			forceFit: true,
	     	closable: true,
	   		items: [me.dataView(module,'image')]
	    });
		return panel;			
	},	
	storyPanel: function(record){
		var me = this;
		var module = 'index_story';	
	    panel = Ext.create('Ext.Panel', {
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),	
			forceFit: true,
	     	closable: true,
	   		items: [me.dataView(module,'image')]
	    });
		return panel;
	},
	onlinePanel: function(record){
		var me = this;
		var module = 'online_index';	
		var store = Ext.create('SMS.store.ImageStore');
		//store.before
		store.load({params:{module:module, pid:0}});
		
		var editing = Ext.create('Ext.grid.plugin.RowEditing',{clicksToMoveEditor:2,listeners:{
			beforeedit: function(editor,context,opt){
			}
		}});
	    panel = Ext.create("Ext.grid.Panel",{
	    	store : store,
			defaults:{
				flex: 1
			},					
	     	columns:[{
	     		text: 'ID',
				dataIndex: 'id',
				align: 'center'
	     	},{
	     		'text' : '名称',
				'dataIndex' : 'title',
				align: 'center',
				editor:'textfield',
				flex:2
	     	},{
	     		text: '描述',
				dataIndex: 'desc',
				width: 400,
				editor: {
					xtype: 'textareafield',
					grow: true,					
                    enterIsSpecial: true,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                e.stopPropagation();
                                return ;
                            }
                        }
                    }  										
				}				
	     	},{
	     		'text' : '图片',
				'dataIndex' : 'address',
				align: 'center',
				renderer: function(value, metaData, record, row, col, store, gridView){
					if(record.get('path')){
						return '<img src="..'+record.get('path')+''+record.get('name')+'" width=100 height=100 />';
					}else{
						return '上传';
					}
				},
				flex:3,
				listeners: {
					click: function(obj,cindex,rindex,event,store2,record,el){
						me.uploadForm('online_index','image',record.data.id,function(record){
							//panel.getView().refresh();
							store.reload({params:{module:module, pid:0}});
						});	
					}					
				}
	     	}],
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),
	      	viewConfig: {
	      	  stripeRows: true
	     	},
			forceFit: true,
	     	closable: true,
			plugins:[
				editing
			],
			dockedItems:[{
				xtype: 'toolbar',
				doct: 'top',
				items: [{
					text:'add',
					iconCls: 'drop-add',
					handler:function(){
				        var rec = new SMS.model.ImageModel({
							'title': '',
							'desc': ''
				        });

				        editing.cancelEdit();
				        store.insert(0, rec);
						editing.startEdit(0,0);
						
					}
				},{
					text: 'delete',
					iconCls: 'user',
					//scope: panel,
					handler: function(){
						Ext.MessageBox.confirm('删除', '确定删除 ?', function(btn){
						   if(btn === 'yes'){
		   		                var sm = panel.getSelectionModel();
		   		                 editing.cancelEdit();								
		   		                 store.remove(sm.getSelection());
		   		                 if (store.getCount() > 0) {
		   		                     sm.select(0);
		   		                 }
						   }
						 });
					}
				}]
			},{
				xtype: 'pagingtoolbar',
				store: store,
				dock: 'bottom',
				displayInfo: true,
				displayMsg: 'Displaying {0} - {1} of {2}'
			}]
	    });		
		/*
	    panel = Ext.create('Ext.Panel', {
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),	
			forceFit: true,
	     	closable: true,
	   		items: [me.dataView(module,'image')]
	    });
		*/
		return panel;
	},	
	
	bgPanel : function(record){
		var me = this;
		var store = Ext.create('Ext.data.Store',{
			fields:['page','url'],
			data:[
				{page:'企业文化',url:'index_culture.png'},
				{page:'企业荣誉',url:'index_hornor.png'},
				{page:'企业历程',url:'index_history.png'},
				{page:'销售网络',url:'sale_network.png'},
				{page:'加盟依丽兰',url:'aboutus_connect.png'},
				{page:'招贤纳士',url:'aboutus_job.png'}
			]
		});
	    panel = Ext.create("Ext.grid.Panel",{
	    	store : store,
			defaults:{
				flex: 1
			},					
	     	columns:[{
	     		text: '页面',
				dataIndex: 'page',
				align: 'center',
				flex:1
	     	},{
	     		text: '背景',
				dataIndex: 'url',
				align: 'center',
				flex:2,
				renderer: function(v){
					return '<img height=100 src="../upload/bgimgs/'+v+'?" '+Math.random()+' />';
				}
	     	},{
				//xtype: 'actioncolumn',
	     		text : '上传',
				dataIndex : '',
				align: 'center',
				flex:1,
				renderer: function(){
					return '上传';
				},
				listeners: {
					click: function(obj,cindex,rindex,event,store,record,el){
						me.uploadForm('bg','image',record.data.url,function(record){
							panel.getView().refresh();
						});	
					}					
				}
	     	}],
	     	title: record.get('text'),
	     	id:record.get('text')+record.get('id'),
	      	viewConfig: {
	      	  stripeRows: true			 
	     	},
			forceFit: false,
	     	closable: true
	    });
		return panel;		
	},	
	
	dataView: function(module,pid){
		pid = pid === undefined ? 0 : pid;
		var me = this ;
		var store = Ext.create('SMS.store.ImageStore');
		store.load({params:{module:module, pid:pid}});
		return Ext.create('Ext.Panel',{
 	        id: 'images-view-'+ module ,
			cls: 'images-view',
 	        frame: true,
 	        collapsible: true,
 	        title: 'Simple DataView (0 items selected)',				 
	 		items: [Ext.create('Ext.view.View', {
				id: 'dataview-' + module,
	            store: store,
	            tpl: [
	                '<tpl for=".">',
	                    '<div class="thumb-wrap" id="{name:stripTags}">',
	                        '<div class="thumb"><img src="..{path}{name}" title="{name:htmlEncode}"></div>',
	                        '<span class="x-editable">{oldname:htmlEncode}</span>',
	                    '</div>',
	                '</tpl>',
	                '<div class="x-clear"></div>'
	            ],
	            multiSelect: true,
	            trackOver: true,
	            overItemCls: 'x-item-over',
	            itemSelector: 'div.thumb-wrap',
	            emptyText: 'No images to display',
	            plugins: [
	                //Ext.create('Ext.ux.DataView.DragSelector', {}),
	                //Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
	            ],
	            prepareData: function(data) {
	                Ext.apply(data, {
	                    shortName: Ext.util.Format.ellipsis(data.name, 15),
	                    sizeString: Ext.util.Format.fileSize(data.size),
	                    dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
	                });
	                return data;
	            },
	            listeners: {
	                selectionchange: function(dv, nodes ){
	                    var l = nodes.length,
	                        s = l !== 1 ? 's' : '';
	                    this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
	                }
	            }
			})],
			dockedItems:[{
				xtype: 'toolbar',
				doct: 'top',
				items: [{
					text:'add',
					iconCls: 'drop-add',
					handler:function(){
								me.uploadForm(module,'image',pid,function(record){
						    	store.add(record);
							});
					}
				},{
					text: 'delete',
					iconCls: 'user',
					handler: function(){
						Ext.MessageBox.confirm('删除', '确定删除 ?', function(btn){
						   if(btn === 'yes'){
		   						var view = Ext.getCmp('dataview-'+ module);
		   		                var sm = view.getSelectionModel();
		   		                 store.remove(sm.getSelection());
		   		                 if (store.getCount() > 0) {
		   		                     sm.select(0);
		   		                 }
						   }
						 });
					}
				},{
					text: 'refresh',
					handler: function(){
						store.reload();
					}
				}]
			}]							
		})		
	},
	dataViewWindow: function(module,pid){
        return Ext.create('Ext.window.Window', {
					//id: 'upload_window',
					title: 'image view',
				    width: 800,										
				    layout: 'fit',
					modal: true,
				    items: [this.dataView(module,pid)]
        }).show();
	},
	applyViewWindow: function(record){
	    var bookTplMarkup = [
			'<table width="100%" border="1" cellpadding="2" cellspacing="4">',
	        '<tr><th width="20%">职位名称</th><td>{jobname}</td></tr>',
	        '<tr><th>姓名</th><td>{name}</td></tr>',
			'<tr><th>性别</th><td>{sex:this.setSex}</td></tr>',
	        '<tr><th>婚否</th><td>{marry:this.setMarry}</td></tr>',
	        '<tr><th>身高/体重</th><td>{size}</td></tr>',
	        '<tr><th>联系电话</th><td>{phone}</td></tr>',			
	        '<tr><th>出生日期</th><td>{birthday}</td></tr>',
	        '<tr><th>户籍所在地</th><td>{birthaddress}</td></tr>',
	        '<tr><th>电子邮箱</th><td>{email}</td></tr>',
			'<tr><th>联系地址</th><td>{address}</td></tr>',
			'<tr><th>教育经历</th><td>{education:this.changeLine}</td></tr>',
			'<tr><th>工作经历</th><td>{work:this.changeLine}</td></tr>',
			'</table>',
			{
				setSex : function(s){return s == 1 ? '男' : '女'},
				setMarry : function(m){return m == 1 ? '已婚' : '未婚'},
				changeLine : function(v){return v.replace(/\n/g,'<br />')}
			}
	    ];
	    var bookTpl = Ext.create('Ext.XTemplate', bookTplMarkup);
		
		return Ext.create('Ext.window.Window',{
			//id: 'upload_window',
			title: 'Apply detail',
		    width: 600,										
		    layout: 'fit',
			modal: true,
		    items: [Ext.create('Ext.Panel',{
		    	html: bookTpl.apply(record.data)
		    })]
		}).show();
	},
	uploadForm: function(module,type,pid,callback,id){
        return Ext.create('Ext.window.Window', {
					id: 'upload_window',
					title: 'upload file',
				    width: 400,										
				    layout: 'fit',
				    items: [Ext.create('Ext.form.Panel',{
		        		//title: 'upload file',
						url: 'image.php',
						frame: true,
					    defaults: {
					        anchor: '100%'
					    },
						items:[{
					        xtype: 'filefield',
					        name: 'imageupload',
					        fieldLabel: 'Photo',
					        labelWidth: 50,
					        msgTarget: 'side',
					        allowBlank: false,
					        anchor: '100%',
					        buttonText: 'Select Photo...',
							id:'imageupload',
							listeners:{
								change: function(context, value, eOpts){
									var img_reg = /\.jpg$|\.jpeg$|\.gif$|\.png$|\.bmp$/;
									if(img_reg.test(value)){
			                            if(Ext.isIE)
			                            {
			                               var image = Ext.get('browseImage').dom;  
			                                image.src = Ext.BLANK_IMAGE_URL;  
			                                image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src= 'file:///'+value; 
       
			                            }//支持FF
			                            else
			                            {  	oFReader = new FileReader();
										 	oFReader.readAsDataURL(Ext.get('imageupload-button-fileInputEl').dom.files[0]);
											oFReader.onload = function (oFREvent) {
											            Ext.get('browseImage').dom.src = oFREvent.target.result;
											        };
			                            }  																
									}
								}
							}																								
						},{
			                xtype: 'box',
			               id : 'browseImage',
			               fieldLabel : "预览图片",
			               autoEl : {
			                   tag : 'img',
			                   src : Ext.BLANK_IMAGE_URL,
			                   style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',
			                   complete:'off',
			                   id : 'imageBrowse'
			                }
						}],
					    buttons: [{
					        text: 'Upload',
					        handler: function() {
					            var form = this.up('form').getForm();
					            if(form.isValid()){
					                form.submit({
					                    url: './image_upload',
										jsonSubmit: true,
										params: {
											module: module,
											pid: pid
										},
					                    waitMsg: 'Uploading your photo...',
					                    success: function(form, action) {
											callback(action.result.items);
											Ext.getCmp("upload_window").close();
					                        //store.reload();											
					                    },
										failure: function(form, action){
											Ext.Msg.alert('ERROR', 'Upload failed.'+action.result.error.errorno+':'+action.result.error.errorstring);
										}
					                });
					            }
					        }
					    }]
					})]
        }).show();
	}
})