Ext.define('app.controller.main', {
  extend: 'Ext.app.Controller',
  views: ['tasks', 'taskDetail'],
  stores: ['tasksStore', 'taskDetailStore', 'categoryStore', 'statusStore', 'tagsStore'],
  config: {
    control: {
      '#tasks': {
        select: 'getTaskId'
      },
      '#addTask': {
        click: 'addTaskButtonClick'
      },
      '#taskSaveButton': {
        click: 'saveTaskButtonClick'
      }
    }
  },
  getTaskId: function(rec) {
    var idTask = Ext.$('#tasks')[0].getSelectionModel().getSelection()[0].data.id_task;
    var ajax = Ext.Ajax;
    ajax.setWithCredentials(true);
    ajax.setUseDefaultXhrHeader(false);
    ajax.request({
      url: 'php/main.php?type=getTaskDetail',
      method: 'GET',
      params: {'id_task': idTask},
      success: function(response) {
        var data = Ext.decode(response.responseText);
        Ext.$('#taskDetail')[0].getStore().reload();
        Ext.$('#taskDetail')[0].getStore().loadRawData(data);
      },
    });
  },
  addTaskButtonClick: function() {
    if(Ext.$('taskAddForm').length === 0){
      Ext.create('app.view.taskAddForm').show();
    }
  },
  saveTaskButtonClick: function(){
    var data = Ext.$('#taskAddForm')[0].getForm().getValues();
    var tags = Object.keys(data.taskTags).map(function (key){ return data.taskTags[key]; });
    data.taskTags = tags.join(',');
    var ajax = Ext.Ajax;
    ajax.setWithCredentials(true);
    ajax.setUseDefaultXhrHeader(false);
    ajax.request({
      url: 'php/main.php?type=addTask',
      method: 'POST',
      jsonData: data,
      //params: {'taskCategory': taskCategory, 'taskDateStart': taskDateStart, 'taskName': taskName, 'taskStatus': taskStatus, 'taskTags': taskTags},
      success: function(response) {
        Ext.$('#tasks')[0].getStore().reload();
      },
    });
  }
});
