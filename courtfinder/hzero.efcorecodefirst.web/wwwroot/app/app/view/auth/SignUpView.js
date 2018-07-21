
Ext.define('CourtFinderApp.view.auth.SignUpView',{
    extend: 'Ext.form.Panel',
    xtype: 'auth-signupview',
    requires: [
        'CourtFinderApp.view.auth.SignUpViewController',
        'CourtFinderApp.view.auth.SignUpViewModel'
    ],

    controller: 'auth-signupview',
    viewModel: {
        type: 'auth-signupview'
    },

    layout: {
        type: 'vbox'
    },
    defaults: {
        labelAlign: 'placeholder'
    },
    items: [{
        xtype: 'emailfield',
        name: 'email',
        label: 'Email'
    }, {
        xtype: 'textfield',
        name: 'name',
        label: 'Name'
    }, {
        xtype: 'passwordfield',
        name: 'password',
        label: 'Password'
    }, {
        xtype: 'passwordfield',
        name: 'confirmPassword',
        label: 'Confirm Password'
    }, {
        xtype: 'container',
        padding: '15 0 5 0',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        defaults: {
            xtype: 'button'
        },
        items: [{
            ui: 'action',
            text: 'Create',
            handler: 'onCreateClick'
        }, {
            ui: 'decline',
            text: 'Cancel',
            handler: 'onCancelClick'
        }]
    }]
});
