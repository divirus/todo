Ext.define('app.view.taskAddForm', {
  extend: 'Ext.window.Window',
  itemId: 'taskAddWindow',
  title: 'Добавить задачу',
  layout: {type: 'hbox', align: 'stretch'},
  dragable: true,
  modal: true,
  resizable: true,
  width: 500,
  height: 250,
  bbar: [
    '->',
    {
      text: 'Сохранить',
      name: 'taskSaveButton',
      itemId: 'taskSaveButton',
      margin: '0 6 0 6'
    }
  ],
  items: [
    {
      xtype: 'form',
      itemId: 'taskAddForm',
      layout: {type: 'vbox', aling: 'stretch'},
      defaults: {margin: '6 6 6 6', width: '100%'},
      flex: 1,
      items: [
        {
          xtype: 'textfield',
          name: 'taskName',
          itemId: 'taskName',
          fieldLabel: 'Заголовок'
        },
        {
          xtype: 'combo',
          name: 'taskCategory',
          itemId: 'taskCategory',
          fieldLabel: 'Категория',
          store: 'categoryStore',
          displayField: 'category_name',
          valueField: 'id_category',
          editable: false,
          width: '50%'
        },
        {
          xtype: 'combo',
          name: 'taskStatus',
          itemId: 'taskStatus',
          fieldLabel: 'Статус задачи',
          store: 'statusStore',
          displayField: 'status_name',
          valueField: 'id_status',
          editable: false,
          width: '50%'
        },
        {
          xtype: 'datefield',
          name: 'taskDateStart',
          itemId: 'taskDateStart',
          fieldLabel: 'Дата создания',
          minValue: new Date(),
          format: 'Y-m-d',
          width: '50%'
        },
        {
          xtype: 'tagfield',
          name: 'taskTags',
          itemId: 'taskTags',
          fieldLabel: 'Теги',
          store: 'tagsStore',
          displayField: 'tag_name',
          valueField: 'id_tag'
        }
      ]
    }
  ]
});
