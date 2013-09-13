Ext.define('MVC.model.Company',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',    type: 'int'},
        {name: 'name',  type: 'string'},
        {name: 'email', type: 'string'}
    ]
});
