
Ext.define('CourtFinderApp.view.entry.EntryView', {
    xtype: 'entry-entryview',
    extend: 'Ext.form.Panel',

    requires: [
        'CourtFinderApp.view.entry.EntryViewController',
        'CourtFinderApp.view.entry.EntryViewModel'
    ],

    controller: 'entry-entryview',
    viewModel: {
        type: 'entry-entryview'
    },

    items: [{
        xtype: 'textfield',
        name: 'name',
        label: 'Name'
    }, {
        xtype: 'selectfield',
        name: 'format',
        placeholder: 'Format',
        options: [
            { text: 'Full Court', value: 1 },
            { text: 'Half Court', value: 2 },
            { text: 'Full Court (Reduced)', value: 3 }
        ]
    }, {
        xtype: 'selectfield',
        name: 'location',
        placeholder: 'Location',
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
            handler: 'onSaveClick'
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
