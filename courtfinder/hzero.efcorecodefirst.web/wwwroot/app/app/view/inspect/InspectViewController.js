Ext.define('CourtFinderApp.view.inspect.InspectViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inspect-inspectview',

    onOpened: function (lat, lng) {
        var me = this;
        me.getViewModel().set({
            lat: lat,
            lng: lng
        });
    },

    onDestroy: function (view) {
        var me = this;
        if (view._entryView) {
            view._entryView.destroy();
            delete view._entryView;
        }
    },

    onCloseClick: function () {
        var me = this;
        me.getView().fireEvent('discard');
    },

    onAddClick: function (btn) {
        var me = this,
            view = me.getView(),
            lat = me.getViewModel().get('lat'),
            lng = me.getViewModel().get('lng');
        if (!view._entryView) {
            view._entryView = Ext.Viewport.add({
                xtype: 'entry-entryview',
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
                        view._entryView.close();
                        view.fireEvent('added');
                    },
                    cancel: function () {
                        view._entryView.close();
                        view.fireEvent('discard');
                    }
                }
            });
        }

        view._entryView.setTitle('New court');
        view._entryView.fireEvent('opened', { lat: lat, lng: lng });
        view._entryView.show();
    }
});
