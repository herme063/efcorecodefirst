
Ext.define('CourtFinderApp.view.entry.EntryView', {
    xtype: 'entry-entryview',
    extend: 'Ext.form.Panel',

    requires: [
        'CourtFinderApp.view.entry.EntryViewController',
        'CourtFinderApp.view.entry.EntryViewModel',

        'CourtFinderApp.model.entry.EntryModel'
    ],

    controller: 'entry-entryview',
    viewModel: {
        type: 'entry-entryview'
    },

    defaults: {
        required: true
    },
    items: [{
        xtype: 'textfield',
        name: 'name',
        label: 'Name'
    }, {
        xtype: 'numberfield',
        name: 'lat',
        label: 'Latitude',
        readOnly: true
    }, {
        xtype: 'numberfield',
        name: 'lng',
        label: 'Longitude',
        readOnly: true
    }, {
        xtype: 'selectfield',
        name: 'format',
        label: 'Format',
        options: [
            { text: 'Full Court', value: 1 },
            { text: 'Half Court', value: 2 },
            { text: 'Full Court (Reduced)', value: 3 }
        ]
    }, {
        xtype: 'selectfield',
        name: 'location',
        label: 'Location',
        options: [
            { text: 'Indoor', value: 1 },
            { text: 'Outdoor', value: 2 }
        ]
    }, {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            xtype: 'button',
            margin: '0 5 0 0'
        },
        items: [{
            text: 'Save',
            ui: 'action',
            handler: 'onSaveClick',
            formBind: true
        }, {
            text: 'Cancel',
            ui: 'decline',
            handler: 'onCancelClick'
        }]
    }],

    listeners: {
        opened: 'onOpened'
    }
});
