Ext.define('MVC.Application', {
    name: 'MVC',

    extend: 'Ext.app.Application',

    requires:[
        'Ext.window.*',
        'MVC.Game'

    ],

    models: [
        'Company'
    ],

    views: [
        // TODO: add views here
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
        // TODO: add stores here
    ],

    launch:function(){
        Ext.create('MVC.Game').run();
    }
});
