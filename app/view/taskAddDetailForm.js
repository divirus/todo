Ext.define('app.view.taskAddDetailForm', {
  extend: 'Ext.window.Window',
  itemId: 'taskAddDetailForm',
  title: 'Добавить пункт',
  layout: {type: 'hbox', align: 'stretch'},
  dragable: true,
  modal: true,
  resizable: true,
  width: 500,
  height: 100,
  bbar: [
    '->',
    {
      text: 'Сохранить',
      name: 'taskSaveButton',
      itemId: 'taskDetailSaveButton',
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
          name: 'taskDetailNameField',
          itemId: 'taskDetailNameField',
        }
      ]
    }
  ]
});
