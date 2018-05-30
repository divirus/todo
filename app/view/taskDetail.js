Ext.define('app.view.taskDetail', {
  extend: 'Ext.grid.Panel',
  xtype: 'taskDetail',
  title: 'Детали задания',
  store: 'taskDetailStore',
  itemId: 'taskDetail',
  bbar: {
    layout: 'form',
    dock: 'bottom',
    items: [
      {
        xtype: 'tagfield',
        itemId: 'taskTags',
        fieldLabel: 'Теги',
        margin: '6 6 6 6'
        // value: preselect,
        // displayField: 'name',
        // valueField: 'id',
        // store: tagStore,
        // queryMode: 'local',
        // filterPickList: false
      }
    ],
  },
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
      }
    ]
  },
  columns: [
      {
        xtype: 'checkcolumn',
        text: 'Готово',
        dataIndex: 'done',
        width: 50,
      },
      {
        text: '',
        dataIndex: 'name',
        flex: 1
      },
  ]
});
