Ext.define('CourtFinderApp.model.auth.LoginModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' }
    ],
    validators: {
        email: [
            { type: 'presence', message: 'is required' },
            { type: 'email', message: 'is invalid' }
        ],
        password: [
            { type: 'presence', message: 'is required' }
        ]
    }
});
