Ext.define('CourtFinderApp.view.entry.EntryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.entry-entryview',

    onOpened: function (data) {
        var me = this,
            model = Ext.create('model.entry-entrymodel', {
                name: null,
                format: 1,
                location: 1,
                lat: data.lat,
                lng: data.lng
            });
        me.getView().setRecord(model);
    },

    onSaveClick: function () {
        var me = this,
            model = Ext.create('model.entry-entrymodel', me.getView().getValues());
        if (model.isValid()) {
            Ext.Ajax.request({
                url: '../api/CourtFinder/AddCourt?puid=00000000-0000-0000-0000-000000000001',
                jsonData: model.getData(),
                method: 'POST',

                success: function (response) {
                    me.getView().fireEvent('save');
                },

                failure: function (response) {
                    Ext.toast('Server issue: ' + response.status + ' ' + response.statusText, 4000);
                }
            });
        } else {
            CourtFinderApp.FormService.raiseErrors(me.getView(), model);
        }
    },

    onCancelClick: function () {
        // todo: confirm this?
        this.getView().fireEvent('cancel');
    }
});