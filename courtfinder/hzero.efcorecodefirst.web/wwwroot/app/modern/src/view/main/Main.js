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
        'CourtFinderApp.view.search.SearchView',
        'CourtFinderApp.view.court.CourtEntryView'
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
    tools: [{
        tooltip: 'Search',
        type: 'search',
        handler: 'handleSearchMenu'
    }, {
        tooltip: 'Add Court',
        type: 'plus',
        handler: 'handleCourtEntryMenu'
    }],
    layout: 'card',
    bodyPadding: 5,

    items: [{
        xtype: 'search-searchview',
        itemId: 'searchView'
    }, {
        xtype: 'court-courtentryview',
        itemId: 'courtEntryView'
    }]
});
