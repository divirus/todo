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
      '->',
      {
        xtype: 'button',
        text: 'График задач',
        itemId: 'chartTaskButton'
      },
      {
        xtype: 'button',
        text: 'История изменений',
        itemId: 'historyTaskButton'
      }
    ]
  },
  columns: [
    {
      text: 'Заголовок',
      dataIndex: 'header',
      flex: 1
    },
    {
      text: 'Категория',
      dataIndex: 'category_name',
      minWidth: 100,
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
      xtype: 'checkcolumn',
      text: 'Готово',
      name: 'taskCheckColumn',
      itemId: 'taskCheckColumn',
      dataIndex: 'done',
      width: 50,
    },
  ]
});
