Ext.onReady(function (){
  Ext.application({
    name: 'app',
    controllers: ['main'],
    launch: function() {
      Ext.create('app.view.viewport');
    }
  })
});
Ext.$ = Ext.ComponentQuery.query;
