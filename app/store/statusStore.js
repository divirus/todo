Ext.define('app.store.statusStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'ajax',
        url: 'php/main.php?type=getStatus'
    }
});
