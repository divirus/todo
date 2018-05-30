Ext.define('app.view.tasks', {
  extend: 'Ext.grid.Panel',
  xtype: 'tasks',
  title: 'Список заданий',
  itemId: 'tasks',
  store: 'tasksStore',
  tbar: {
    items: [
      {
        xtype: 'button',
        text: 'Добавить',
        itemId: 'addTask'
      },
      {
        xtype: 'button',
        text: 'Удалить',
        itemId: 'deleteTask'
      },
    ]
  },
  columns: [
    {
      text: 'Заголовок',
      dataIndex: 'header',
      flex: 1
    },
    {
      text: 'Статус',
      dataIndex: 'status_name',
      minWidth: 100,
    },
    {
      text: 'Дата создания',
      dataIndex: 'date_add',
      minWidth: 110
    },
    {
      text: 'Дата обновления',
      dataIndex: 'date_refresh',
      minWidth: 110
    }
  ]
});
