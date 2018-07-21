Ext.define('CourtFinderApp.view.auth.LoginViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-loginview',

    onOpened: function (email) {
        var me = this,
            model = Ext.create('CourtFinderApp.model.auth.LoginModel', {
                email: email,
                password: ''  
            });
        me.getView().setRecord(model);
    },

    onLoginClick: function (btn) {
        var me = this,
            view = me.getView(),
            model = Ext.create(
                'CourtFinderApp.model.auth.LoginModel', 
                Ext.apply({}, view.getValues()));
        if (model.isValid()) {
            var response = CourtFinderApp.AuthService.login(model);
            if (response === true) {
                view.fireEvent('finished', view);
            } else {
                Ext.toast('unable to login: ' + response, 4000);
            }
        } else {
            CourtFinderApp.FormService.raiseErrors(view, model);
        }
    },

    onCancelClick: function (btn) {
        this.getView().fireEvent('finished', this.getView());
    },

    onSignUpClick: function () {
        var me = this,
            view = me.getView();
        if (!view._signupView) {
            view._signupView = Ext.Viewport.add({
                xtype: 'auth-signupview',
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
                    created: function (form, model) {
                        view._signupView.close();
                        view.fireEvent('opened', model.get('email'));
                    },

                    finished: function () {
                        view._signupView.close();
                    }
                }
            });
        }

        view._signupView.setTitle('New Account');
        view._signupView.fireEvent('opened');
        view._signupView.show();
    },

    onForgetfulClick: function () {

    }
});
