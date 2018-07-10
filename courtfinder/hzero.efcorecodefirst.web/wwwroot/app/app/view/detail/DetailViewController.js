Ext.define('CourtFinderApp.view.detail.DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detail-detailview',

    onOpened: function (uid) {
        var me = this;
        me.getCourtDetail(uid);
        me.getCourtReviews(uid, 1, 100, me.getView().down('#sortSelectField').getValue());
    },

    onDestroy: function (view) {
        var me = this;
        if (view._reviewEntryView) {
            view._reviewEntryView.destroy();
            delete view._reviewEntryView;
        }
    },

    onCloseClick: function () {
        this.getView().fireEvent('finished', 'close');
    },

    onWriteReviewClick: function (btn) {
        var me = this,
            view = me.getView(),
            uid = me.getViewModel().get('uid');
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
                width: 400,
                listeners: {
                    save: function () {
                        view._reviewEntryView.close();
                        view.fireEvent('opened', uid);
                    },
                    cancel: function () {
                        view._reviewEntryView.close();
                    }
                }
            });
        }

        view._reviewEntryView.setTitle('Review for ' + me.getViewModel().get('name'));
        view._reviewEntryView.fireEvent('opened', uid);
        view._reviewEntryView.show();
    },

    onReviewSortChange: function (field, newValue, oldValue) {
        var me = this,
            uid = me.getViewModel().get('uid');
        me.getCourtReviews(uid, 1, 100, field.getValue());
    },

    getCourtDetail: function (uid) {
        var me = this;
        Ext.Ajax.request({
            url: '../api/CourtFinder/GetCourtDetail?uid=' + uid,
            method: 'GET',

            success: function (response, opts) {
                var result = JSON.parse(response.responseText);
                me.getViewModel().set({
                    uid: result.uid,
                    name: result.name,
                    rating: result.rating,
                    ratingCount: result.ratingCount,
                    lat: result.lat,
                    lng: result.lng,
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
                me.getViewModel().getStore('reviews').loadData(result, false);
            },

            failure: function (response, opts) {
                Ext.toast('Server issue: ' + response.status + ' ' + response.statusText, 4000);
            }
        });
    }
});
