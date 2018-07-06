Ext.define('CourtFinderApp.view.review.ReviewEntryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.review-reviewentryview',

    onOpened: function (uid) {
        var me = this;
        me.getViewModel().set('uid', uid);
    },

    onSaveClick: function () {
        // todo: submit to the server
        this.getView().fireEvent('save');
    },

    onCancelClick: function () {
        // todo: confirm this?
        this.getView().fireEvent('cancel');
    }
});
