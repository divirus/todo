Ext.define('app.store.chartStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'ajax',
        url: 'php/main.php?type=getChartData'
    },
});
