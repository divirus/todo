Ext.define('app.controller.main', {
  extend: 'Ext.app.Controller',
  views: ['tasks', 'taskDetail'],
  stores: ['tasksStore', 'taskDetailStore', 'categoryStore', 'statusStore', 'tagsStore', 'taskHistoryStore', 'chartStore'],
  config: {
    control: {
      '#tasks': {
        select: 'getTaskId'
      },
      '#addTask': {
        click: 'addTaskButtonClick'
      },
      '#addTaskDetail': {
        click: 'addTaskDetailButtonClick'
      },
      '#editTask': {
        click: 'editTaskButtonClick'
      },
      '#deleteTask': {
        click: 'deleteTaskButtonClick'
      },
      '#deleteTaskDetail': {
        click: 'deleteTaskDetailButtonClick'
      },
      '#taskSaveButton': {
        click: 'saveTaskButtonClick'
      },
      '#taskDetailSaveButton': {
        click: 'saveTaskDetailButtonClick'
      },
      '#taskDetailCheckColumn': {
        checkchange: 'checkTaskDetail'
      },
      '#taskCheckColumn': {
        checkchange: 'checkTask'
      },
      '#chartTaskButton': {
        click: 'getTaskChart'
      },
      '#historyTaskButton': {
        click: 'getTaskHistory'
      }
    }
  },
  getTaskId: function() {
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
        if (data.length > 0) {
          Ext.$('#taskTags')[0].setValue(data[0].tag);
          Ext.$('#taskDetail')[0].getStore().reload();
          Ext.$('#taskDetail')[0].getStore().loadRawData(data);
        } else {
          Ext.$('#taskDetail')[0].getStore().reload();
          Ext.$('#taskTags')[0].setValue();
        }
      },
      failure: function(response)
      {
        console.log(response.responseText);
      }
    });
  },
  getTaskHistory: function(record, e) {
    if(Ext.$('#tasks')[0].getSelectionModel().getSelection().length > 0) {
      if(Ext.$('taskHistoryForm').length === 0){
        Ext.create('app.view.taskHistoryForm').show();
        var idTask = Ext.$('#tasks')[0].getSelectionModel().getSelection()[0].data.id_task;
        var ajax = Ext.Ajax;
        ajax.setWithCredentials(true);
        ajax.setUseDefaultXhrHeader(false);
        ajax.request({
          url: 'php/main.php?type=getTaskHistory',
          method: 'GET',
          params: {'id_task': idTask},
          success: function(response) {
            var data = Ext.decode(response.responseText);
            if (data.length > 0) {
              Ext.$('#taskHistory')[0].getStore().reload();
              Ext.$('#taskHistory')[0].getStore().loadRawData(data);
            }
          },
          failure: function(response)
          {
            console.log(response.responseText);
          }
        });
      }
    }else{
      Ext.Msg.alert('Внимание', 'Для просмотра истории, выберите задание.', Ext.emptyFn);
    }
  },
  getTaskChart: function() {
    if(Ext.$('taskChart').length === 0){
      Ext.create('app.view.taskChart').show();
    }
  },
  addTaskButtonClick: function() {
    if(Ext.$('taskAddForm').length === 0){
      Ext.create('app.view.taskAddForm').show();
    }
  },
  editTaskButtonClick: function() {
    if(Ext.$('#tasks')[0].getSelectionModel().getSelection().length > 0) {
      if(Ext.$('taskAddForm').length === 0){
        Ext.create('app.view.taskAddForm').show();

      }
    }else{
      Ext.Msg.alert('Внимание', 'Для редактирования, выберите задание.', Ext.emptyFn);
    }
  },
  addTaskDetailButtonClick: function() {
    if(Ext.$('#tasks')[0].getSelectionModel().getSelection().length > 0) {
      if(Ext.$('taskAddDetailForm').length === 0){
        Ext.create('app.view.taskAddDetailForm').show();
      }
    }else{
      Ext.Msg.alert('Внимание', 'Для добавления пункта задания, выберите задание.', Ext.emptyFn);
    }
  },
  saveTaskButtonClick: function() {
    var data = Ext.$('#taskAddForm')[0].getForm().getValues();
    var tags = Object.keys(data.taskTags).map(function (key){ return data.taskTags[key]; });
    data.taskTags = tags.join(',');
    var ajax = Ext.Ajax;
    ajax.setWithCredentials(true);
    ajax.setUseDefaultXhrHeader(false);
    ajax.request({
      url: 'php/main.php?type=addTask',
      method: 'POST',
      //jsonData: data,
      params:
        {
          'taskCategory': data.taskCategory,
          'taskDateStart': data.taskDateStart,
          'taskName': data.taskName,
          'taskStatus': data.taskStatus,
          'taskTags': data.taskTags
        },
      success: function(response) {
        Ext.$('#tasks')[0].getStore().reload();
      },
      failure: function(response)
      {
        console.log(response.responseText);
      }
    });
  },
  saveTaskDetailButtonClick: function() {
    var me = this;
    var idTask = Ext.$('#tasks')[0].getSelectionModel().getSelection()[0].data.id_task;
    var name = Ext.$('#taskDetailNameField')[0].getValue();
    var ajax = Ext.Ajax;
    ajax.setWithCredentials(true);
    ajax.setUseDefaultXhrHeader(false);
    ajax.request({
      url: 'php/main.php?type=addDetailTask',
      method: 'POST',
      //jsonData: data,
      params: {'id_task': idTask, 'name': name},
      success: function(response) {
        me.getTaskId();
      },
      failure: function(response)
      {
        console.log(response.responseText);
      }
    });
  },
  deleteTaskButtonClick: function() {
    if(Ext.$('#tasks')[0].getSelectionModel().getSelection().length > 0) {
      var idTask = Ext.$('#tasks')[0].getSelectionModel().getSelection()[0].data.id_task;
      var ajax = Ext.Ajax;
      ajax.setWithCredentials(true);
      ajax.setUseDefaultXhrHeader(false);
      ajax.request({
        url: 'php/main.php?type=deleteTask',
        method: 'GET',
        params: {'id_task': idTask},
        success: function(response) {
          Ext.$('#tasks')[0].getStore().reload();
        },
        failure: function(response)
        {
          console.log(response.responseText);
        }
      });
    } else {
      Ext.Msg.alert('Внимание', 'Выберите задание для удаления.', Ext.emptyFn);
    }
  },
  deleteTaskDetailButtonClick: function() {
    if(Ext.$('#taskDetail')[0].getSelectionModel().getSelection().length > 0) {
      var me = this;
      var idTaskDetail = Ext.$('#taskDetail')[0].getSelectionModel().getSelection()[0].data.id;
      var ajax = Ext.Ajax;
      ajax.setWithCredentials(true);
      ajax.setUseDefaultXhrHeader(false);
      ajax.request({
        url: 'php/main.php?type=deleteTaskDetail',
        method: 'GET',
        params: {'id_task_detail': idTaskDetail},
        success: function(response) {
          me.getTaskId();
        },
        failure: function(response)
        {
          console.log(response.responseText);
        }
      });
    } else {
      Ext.Msg.alert('Внимание', 'Выберите пункт для удаления.', Ext.emptyFn);
    }
  },
  checkTaskDetail: function(rowIndex, checked, record, e, eOpts) {
    var me = this;
    var id = e.data.id;
    var checked = e.data.done;
    var ajax = Ext.Ajax;
    ajax.setWithCredentials(true);
    ajax.setUseDefaultXhrHeader(false);
    ajax.request({
      url: 'php/main.php?type=updateTaskDetailStatus',
      method: 'POST',
      //jsonData: data,
      params: {'id': id, 'checked': checked},
      success: function(response) {
        me.getTaskId();
      },
      failure: function(response)
      {
        console.log(response.responseText);
      }
    });
  },
  checkTask: function(rowIndex, checked, record, e, eOpts) {
    var id_task = e.data.id_task;
    var checked = e.data.done;
    var ajax = Ext.Ajax;
    ajax.setWithCredentials(true);
    ajax.setUseDefaultXhrHeader(false);
    ajax.request({
      url: 'php/main.php?type=updateTaskStatus',
      method: 'POST',
      //jsonData: data,
      params: {'id_task': id_task, 'checked': checked},
      success: function(response) {
        Ext.$('#tasks')[0].getStore().reload();
      },
      failure: function(response)
      {
        console.log(response.responseText);
      }
    });
  },

});
