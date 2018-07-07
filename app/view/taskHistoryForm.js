Ext.define('app.view.taskHistoryForm', {
  extend: 'Ext.window.Window',
  itemId: 'taskHistoryForm',
  title: 'История изменений',
  layout: {type: 'hbox', align: 'stretch'},
  dragable: true,
  modal: true,
  resizable: true,
  width: 500,
  height: 300,
  items: [
    {
      xtype: 'grid',
      store: 'taskHistoryStore',
      itemId: 'taskHistory',
      flex: 1,
      columns: [
        {
          text: '',
          dataIndex: 'history',
          flex: 1
        },
        {
          text: 'Дата',
          dataIndex: 'date',
          minWidth: 100
        }
      ]
    }
  ]
});
