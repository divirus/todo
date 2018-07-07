Ext.define('app.view.taskChart', {
    extend: 'Ext.window.Window',
    title: 'График задач',
    resizable: false,
    items:
    [
      {
        xtype: 'chart',
        itemId: 'taskChart',
        width: 600,
        height: 350,
        layout: 'fit',
        store: 'chartStore',
        legend:
        {
          position: 'right'
        },
        axes:
        [
          {
              title: 'Кол-во задач',
              type: 'numeric',
              position: 'left',
              fields: ['open', 'done', 'overdue']
          },
          {
              title: 'Дата',
              type: 'category',
              position: 'bottom',
              fields: ['date']
          }
        ],
        series:
        [
          {
            type: 'line',
            title: 'Открытые',
            xField: 'date',
            yField: 'open',
            style : {
             'stroke-width': 2,
            },
          },
          {
            type: 'line',
            title: 'Закрытые',
            xField: 'date',
            yField: 'done',
            style : {
             'stroke-width': 2,
            },
          },
          {
            type: 'line',
            title: 'Просроченные',
            xField: 'date',
            yField: 'overdue',
            style : {
             'stroke-width': 2,
            },
          }
        ]
      }
    ]
});
