
Ext.define('CourtFinderApp.view.inspect.InspectView', {
    xtype: 'inspect-inspectview',
    extend: 'Ext.panel.Panel',

    requires: [
        'CourtFinderApp.view.inspect.InspectViewController',
        'CourtFinderApp.view.inspect.InspectViewModel',

        'CourtFinderApp.view.entry.EntryView'
    ],

    controller: 'inspect-inspectview',
    viewModel: {
        type: 'inspect-inspectview'
    },

    bind: {
        title: '{latFriendly}, {lngFriendly}'
    },
    padding: 0,
    scrollable: 'y',
    layout: 'vbox',
    cls: 'inspect-view',

    tools: [{
        type: 'close',
        handler: 'onCloseClick'
    }],

    items: [{
        height: 200,
        width: 400,
        html: '<img src="../api/CourtFinder/GetCourtThumb?uid=00000000-0000-0000-0000-000000000000&idx=0" />'
    }, {
        xtype: 'container',
        layout: 'hbox',
        padding: 5,
        defaults: {
            xtype: 'button',
            margin: '0 5 0 0'
        },
        items: [{
            ui: 'action',
            text: 'Add Court',
            handler: 'onAddClick'
        }]
    }],

    listeners: {
        opened: 'onOpened',
        destroy: 'onDestroy'
    }
});
