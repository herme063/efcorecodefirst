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
        ':any': {
            action: 'onAnyRoute',
            conditions: {
                ':any': '(.+(\\.+)*)'
            }
        }
    },

    onAnyRoute: function (route) {
        var me = this,
            vm = me.getViewModel();
        if (CourtFinderApp.AuthService.playerInfo) {
            vm.set({
                loggedName: CourtFinderApp.AuthService.playerInfo.email,
                isLoggedIn: true
            });
        } else {
            vm.set({
                loggedName: null,
                isLoggedIn: false
            });
        }
    },

    onSignInClick: function () {
        var me = this,
            view = me.getView();
        if (!view._loginView) {
            view._loginView = Ext.Viewport.add({
                xtype: 'auth-loginview',
                floated: true,
                modal: true,
                closeAction: 'hide',
                showAnimation: {
                    type: 'popIn',
                    duration: 250,
                    easing: 'ease-out'
                },
                hideAnimation: {
                    type: 'popOut',
                    duration: 250,
                    easing: 'ease-out'
                },
                centered: true,
                width: 400,
                listeners: {
                    finished: function () {
                        view._loginView.close();
                        me.redirectTo('search', true); // trigger auth update
                    }
                }
            });
        }

        view._loginView.setTitle('Sign in');
        view._loginView.fireEvent('opened', null);
        view._loginView.show();
    }
});
