/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('CourtFinderApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    routes: {
        'search': 'onSearchRoute',
        'court-entry': 'onCourtEntryRoute'
    },

    onSearchRoute: function () {
        var me = this,
            view = me.getView(),
            searchCard = view.down('#searchView');
        view.setActiveItem(searchCard);
    },

    onCourtEntryRoute: function () {
        var me = this,
            view = me.getView(),
            courtEntryCard = view.down('#courtEntryView');
        view.setActiveItem(courtEntryCard);
    },

    handleSearchMenu: function () {
        this.redirectTo('search');
    },

    handleCourtEntryMenu: function () {
        this.redirectTo('court-entry');
    }
});
