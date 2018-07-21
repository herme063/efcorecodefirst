Ext.define('CourtFinderApp.view.auth.SignUpViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-signupview',

    onOpened: function () {
        var me = this,
            model = Ext.create('CourtFinderApp.model.auth.SignUpModel', {
                email: '',
                name: '',
                password: '' ,
                confirmPassword: ''
            });
        me.getView().setRecord(model);
    },

    onCreateClick: function (btn) {
        var me = this,
            model = Ext.create(
                'CourtFinderApp.model.auth.SignUpModel', 
                Ext.apply({}, me.getView().getValues()));
        if (model.isValid()) {
            var response = CourtFinderApp.AuthService.create(model);
            if (response === true) {
                me.getView().fireEvent('created', me.getView(), model);
            } else {
                Ext.toast('unable to create: ' + response, 4000);
            }
        } else {
            CourtFinderApp.FormService.raiseErrors(me.getView(), model);
        }
    },

    onCancelClick: function (btn) {
        this.getView().fireEvent('finished', this.getView());
    }
});
