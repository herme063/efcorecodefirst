Ext.define('CourtFinderApp.model.detail.CourtReviewModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'courtUid', type: 'string' },
        { name: 'rating', type: 'int' },
        { name: 'reviewer', type: 'string' },
        { name: 'review', type: 'string' }
    ]
});
