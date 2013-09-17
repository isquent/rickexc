Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'SMS',
    appFolder: 'app',
    controllers: [
        'Main',
		'Menu'
    ]
});