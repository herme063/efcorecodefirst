
Ext.define('CourtFinderApp.view.court.CourtEntryView',{
    extend: 'Ext.form.Panel',
    xtype: 'court-courtentryview',

    requires: [
        'CourtFinderApp.view.court.CourtEntryViewController',
        'CourtFinderApp.view.court.CourtEntryViewModel'
    ],

    controller: 'court-courtentryview',
    viewModel: {
        type: 'court-courtentryview'
    },

    defaults: {
        labelAlign: 'placeholder',
    },
    items: [{
        xtype: 'textfield',
        name: 'location',
        label: 'location'
    }, {
        xtype: 'selectfield',
        name: 'format',
        label: 'format',
        options: [
            { text: 'Indoor', value: 1 },
            { text: 'Outdoor', value: 2 }
        ]
    }, {
        xtype: 'selectfield',
        name: 'size',
        label: 'size',
        options: [
            { text: 'Full Court', value: 1 },
            { text: 'Half Court', value: 2 }
        ]
    }]
});
