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
        name: 'taskTags',
        itemId: 'taskTags',
        fieldLabel: 'Теги',
        store: 'tagsStore',
        displayField: 'tag_name',
        valueField: 'id_tag',
        margin: '6 6 6 6',
        readOnly: true,
        selectOnFocus: false,
        editable: false

      }
    ],
  },
  tbar: {
    items: [
      {
        xtype: 'button',
        text: 'Добавить',
        itemId: 'addTaskDetail'
      },
      {
        xtype: 'button',
        text: 'Удалить',
        itemId: 'deleteTaskDetail'
      }
    ]
  },
  columns: [
      {
        text: '',
        name: 'taskDetailName',
        itemId: 'taskDetailName',
        dataIndex: 'name',
        flex: 1
      },
      {
        xtype: 'checkcolumn',
        text: 'Готово',
        name: 'taskDetailCheckColumn',
        itemId: 'taskDetailCheckColumn',
        dataIndex: 'done',
        width: 50,
      },
  ]
});
