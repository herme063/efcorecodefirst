Ext.define('CourtFinderApp.view.entry.EntryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.entry-entryview',

    onOpened: function (data) {
        var me = this;
        me.getViewModel().set(data)
        me.getView().reset();
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