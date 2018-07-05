Ext.define('CourtFinderApp.view.detail.DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detail-detailview',

    onOpened: function (data) {
        var me = this;
        me.getViewModel().set({
            uid: data.uid,
            name: data.location,
            rating: data.rating,
            ratingCount: data.ratingCount,
            lat: data.lat,
            lng: data.lng
        });
        me.getCourtDetail(data.uid);
        me.getCourtReviews(data.uid, 1, 100, 1);
    },

    onDestroy: function (view) {
        var me = this;
        if (view._reviewEntryView) {
            view._reviewEntryView.destroy();
            delete view._reviewEntryView;
        }
    },

    onWriteReviewClick: function (btn) {
        var me = this,
            view = me.getView();
        if (!view._reviewEntryView) {
            view._reviewEntryView = Ext.Viewport.add({
                xtype: 'review-reviewentryview',
                floated: true,
                modal: true,
                closeAction: 'hide',
                hideOnMaskTap: false,
                showAnimation: {
                    type: 'popIn',
                    duration: 250,
                    easing: 'ease-out'
                },
                hideAnimation: {
                    type: 'popOut',
                    duration: 250,
                    easing: 'ease-out'
                },
                centered: true,
                width: 400
            });
        }

        view._reviewEntryView.setTitle('Review for ' + me.getViewModel().get('name'));
        view._reviewEntryView.reset();
        view._reviewEntryView.show();
    },

    onReviewSortChange: function (btn) {
        var me = this,
            sortBy = me.getViewModel().get('reviewSortBy');
        me.getCourtReviews(data.uid, 1, 100, sortBy);
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

    getCourtReviews: function (uid, page, size, sort) {
        var me = this;
        Ext.Ajax.request({
            url: '../api/CourtFinder/GetCourtReviews?uid=' + uid + '&page=' + page + '&size=' + size + '&sort=' + sort,
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
