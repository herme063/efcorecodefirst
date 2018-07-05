Ext.define('CourtFinderApp.view.review.ReviewEntryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.review-reviewentryview',

    onSaveClick: function () {
        // todo: submit to the server
        this.getView().close();
    },

    onCancelClick: function () {
        // todo: confirm this?
        this.getView().close();
    }
});
