Ext.define('CourtFinderApp.model.auth.SignUpModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'confirmPassword', type: 'string' },
        { name: 'name', type: 'string' }
    ],

    validators: {
        email: [
            { type: 'presence', message: 'is required' },
            { type: 'email', message: 'is invalid' }
        ],
        password: [
            { type: 'presence', message: 'is required' }
        ],
        confirmPassword: [
            { type: 'presence', message: 'is required' },
            { type: 'confirmpassword', passwordField: 'password' },
        ],
        name: [
            { type: 'presence', message: 'is required' }
        ],
    }
});
