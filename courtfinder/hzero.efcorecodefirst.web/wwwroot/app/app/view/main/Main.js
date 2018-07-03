/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 */
Ext.define('CourtFinderApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',

        'CourtFinderApp.view.main.MainController',
        'CourtFinderApp.view.main.MainModel',
        'CourtFinderApp.view.search.SearchView'
    ],

    controller: 'main',
    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        },
        styleHtmlContent: true
    },

    title: 'Court Finder 9000',
    layout: 'fit',

    items: [{
        xtype: 'search-searchview',
        itemId: 'searchView'
    }]
});
