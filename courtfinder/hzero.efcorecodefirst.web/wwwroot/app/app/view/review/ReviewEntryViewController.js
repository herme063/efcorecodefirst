Ext.define('CourtFinderApp.view.review.ReviewEntryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.review-reviewentryview',

    onOpened: function (uid) {
        var me = this;
        me.getViewModel().set('uid', uid);
        me.getView().setRecord(Ext.create('CourtFinderApp.model.review.ReviewEntryModel', { 
            uid: uid 
        }));
    },

    onSaveClick: function () {
        var me = this,
            model = Ext.create('CourtFinderApp.model.review.ReviewEntryModel', Ext.apply({
                uid: me.getViewModel().get('uid')
            }, me.getView().getValues()));
        if (model.isValid()) {
            Ext.Ajax.request({
                url: '../api/CourtFinder/AddReview?puid=00000000-0000-0000-0000-000000000001',
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
