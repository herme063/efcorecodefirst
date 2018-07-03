Ext.define('CourtFinderApp.view.detail.DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detail-detailview',

    onOpened: function (data) {
        var me = this;
        me.getView().setTitle(data.location);
    }
});
