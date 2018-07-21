/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('CourtFinderApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        loggedName: 'no_user@noreply.org',
        isLoggedIn: false
    }

    //TODO - add data, formulas and/or methods to support your view
});
