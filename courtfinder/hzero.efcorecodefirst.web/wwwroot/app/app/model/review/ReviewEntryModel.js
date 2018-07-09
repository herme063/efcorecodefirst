Ext.define('CourtFinderApp.model.review.ReviewEntryModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'uid', type: 'string' },
        { name: 'rating', type: 'int' },
        { name: 'review', type: 'string' }
    ],

    validators: {
        rating: { type: 'range', min: 1, max: 5, message: 'is required' },
        review: { type: 'presence', message: 'is required' }
    }
});
