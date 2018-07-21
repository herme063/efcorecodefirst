Ext.define('CourtFinderApp.utils.AuthService', {
    alternateClassName: [ 'CourtFinderApp.AuthService' ],
    singleton: true,

    playerInfo: null,

    login: function (loginModel) {
        var me = this;
        if (loginModel.get('email') != 'test@error.org') {
            me.playerInfo = {
                uid: null,
                email: loginModel.get('email')
            };
            return true;
        } else {
            me.playerInfo = null;
            return 'invalid email and/or password';
        }
    },

    create: function (signUpModel) {
        var me = this;
        if (signUpModel.get('name') != 'error') {
            return true;
        } else {
            return 'email already used';
        }
    }
});