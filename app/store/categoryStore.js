Ext.define('app.store.categoryStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'ajax',
        url: 'php/main.php?type=getCategory'
    }
});
