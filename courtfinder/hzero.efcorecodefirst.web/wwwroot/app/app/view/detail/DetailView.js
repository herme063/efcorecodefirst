
Ext.define('CourtFinderApp.view.detail.DetailView', {
    xtype: 'detail-detailview',
    extend: 'Ext.panel.Panel',

    requires: [
        'CourtFinderApp.view.detail.DetailViewController',
        'CourtFinderApp.view.detail.DetailViewModel'
    ],

    controller: 'detail-detailview',
    viewModel: {
        type: 'detail-detailview'
    },

    title: 'Location Details',
    items: [{
        
    }],

    listeners: {
        opened: 'onOpened'
    }
});
