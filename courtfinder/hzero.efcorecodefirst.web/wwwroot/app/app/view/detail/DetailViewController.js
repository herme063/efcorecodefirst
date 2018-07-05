Ext.define('CourtFinderApp.view.detail.DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detail-detailview',

    onOpened: function (data) {
        var me = this;
        me.getViewModel().set({
            uid: data.uid,
            name: data.location,
            rating: data.rating,
            ratingCount: data.ratingCount
        });
        me.getCourtDetail(data.uid);
        me.getCourtReviews(data.uid, 1, 100);
    },

    getCourtDetail: function (uid) {
        var me = this;
        Ext.Ajax.request({
            url: '../api/CourtFinder/GetCourtDetail?uid=' + uid,
            method: 'GET',

            success: function (response, opts) {
                var result = JSON.parse(response.responseText);
                me.getViewModel().set({
                    format: result.format,
                    location: result.location
                });
            },

            failure: function (response, opts) {
                Ext.toast('Server issue: ' + response.status + ' ' + response.statusText, 4000);
            }
        });
    },

    getCourtReviews: function (uid, page, size) {
        var me = this;
        Ext.Ajax.request({
            url: '../api/CourtFinder/GetCourtReviews?uid=' + uid + '&page=' + page + '&size=' + size,
            method: 'GET',

            success: function (response, opts) {
                var result = JSON.parse(response.responseText);
                me.getViewModel().getStore('reviews').loadData(result);
            },

            failure: function (response, opts) {
                Ext.toast('Server issue: ' + response.status + ' ' + response.statusText, 4000);
            }
        });
    }
});
