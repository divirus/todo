Ext.define('app.store.tagsStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'ajax',
        url: 'php/main.php?type=getTags'
    }
});
