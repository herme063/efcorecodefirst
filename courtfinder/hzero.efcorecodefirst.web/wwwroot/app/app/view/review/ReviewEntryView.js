
Ext.define('CourtFinderApp.view.review.ReviewEntryView', {
    xtype: 'review-reviewentryview',
    extend: 'Ext.form.Panel',

    requires: [
        'CourtFinderApp.view.review.ReviewEntryViewController',
        'CourtFinderApp.view.review.ReviewEntryViewModel'
    ],

    controller: 'review-reviewentryview',
    viewModel: {
        type: 'review-reviewentryview'
    },

    items: [{
        xtype: 'spinnerfield',
        name: 'rating',
        label: 'Rating',
        minValue: 1,
        maxValue: 5,
        stepValue: 1,
        value: 1
    }, {
        xtype: 'textareafield',
        name: 'review',
        label: 'Review',
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
