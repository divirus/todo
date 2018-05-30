Ext.define('app.store.tasksStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'ajax',
        url: 'php/main.php?type=getTasks'
    }
});
