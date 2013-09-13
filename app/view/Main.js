Ext.define('MVC.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'Sidebar',
        width: 150
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: '15x15',
            html: Ext.create('MVC.Game').draw_field(),
            padding: 10
        }]
    }]
});
