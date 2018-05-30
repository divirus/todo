Ext.define('app.view.viewport', {
    extend: 'Ext.container.Viewport',
    itemId: 'viewport',
    layout: 'border',
    items: [
      {
        xtype: 'tasks',
        region: 'center',
        flex: 1
      },
      {
        xtype: 'taskDetail',
        region: 'east',
        width: '45%'
      }
    ]
});
