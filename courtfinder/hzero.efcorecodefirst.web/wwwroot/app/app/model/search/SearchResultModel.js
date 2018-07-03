Ext.define('CourtFinderApp.model.search.SearchResultModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'uid', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'rating', type: 'number' },
        { name: 'ratingCount', type: 'int' },
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
        { name: 'distance', type: 'number' }
    ]
});
