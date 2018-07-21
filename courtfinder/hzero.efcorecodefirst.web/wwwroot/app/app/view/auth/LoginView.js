
Ext.define('CourtFinderApp.view.auth.LoginView',{
    extend: 'Ext.form.Panel',
    xtype: 'auth-loginview',
    requires: [
        'CourtFinderApp.view.auth.LoginViewController',
        'CourtFinderApp.view.auth.LoginViewModel',
        'CourtFinderApp.view.auth.SignUpView',
        'CourtFinderApp.model.auth.SignUpModel'
    ],

    controller: 'auth-loginview',
    viewModel: {
        type: 'auth-loginview'
    },

    layout: 'vbox',
    items: [{
        xtype: 'emailfield',
        name: 'email',
        label: 'Email',
        labelAlign: 'placeholder'
    }, {
        xtype: 'passwordfield',
        name: 'password',
        label: 'Password',
        labelAlign: 'placeholder'
    }, {
        xtype: 'container',
        padding: '15 0 10 0',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        defaults: {
            xtype: 'button'
        },
        items: [{
            ui: 'action',
            text: 'Login',
            handler: 'onLoginClick'
        }, {
            ui: 'decline',
            text: 'Cancel',
            handler: 'onCancelClick'
        }]
    }, {
        style: 'text-align: center; padding: 3px 0;',
        html: '<a href="#" onclick="return false;" class="login-link">Forgot something?</a>',
        listeners: {
            click: {
                element: 'element',
                preventDefault: true,
                fn: 'onForgetfulClick'
            }
        }
    }, {
        style: 'text-align: center; padding: 3px 0;',
        html: '<a href="#" onclick="return false;" class="login-link">No Account? Sign Up</a>',
        listeners: {
            click: {
                element: 'element',
                preventDefault: true,
                fn: 'onSignUpClick'
            }
        }
    }],

    listeners: {
        opened: 'onOpened'
    }
});
