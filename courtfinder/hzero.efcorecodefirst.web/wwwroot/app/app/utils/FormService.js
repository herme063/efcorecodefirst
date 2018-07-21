Ext.define('CourtFinderApp.utils.FormService', {
    alternateClassName: ['CourtFinderApp.FormService'],
    singleton: true,

    /**
     * Raises errors on form
     * @param {Ext.form.Panel} form The form view
     * @param {Ext.data.Model} model The data model
     */
    raiseErrors: function (form, model) {
        var errors = model.getValidation().getData(),
            errorsFormatted = '<ul>' + Object.keys(errors).map(function (f) {
                if (errors[f] !== true) {
                    return '<li>' + f + ' => ' + errors[f] + '</li>';
                } else {
                    return '';
                }
            }).join('') + '</ul>'
        Ext.Msg.alert('Input Error', 'Please correct the following: ' + errorsFormatted);
    }
});
