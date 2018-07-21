Ext.define('CourtFinderApp.utils.ConfirmPasswordValidator', {
    extend: 'Ext.data.validator.Validator',
    alias: 'data.validator.confirmpassword',

    type: 'confirmpassword',

    config: {
        message: 'password does not match',

        passwordField: 'Password'
    },

    validate: function (value, record) {
        return value === record.get(this.getPasswordField()) ? true : this.getMessage();
    }
});