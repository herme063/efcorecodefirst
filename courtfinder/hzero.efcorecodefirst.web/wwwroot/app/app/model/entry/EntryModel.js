Ext.define('CourtFinderApp.model.entry.EntryModel', {
    extend: 'Ext.data.Model',
    alias: 'model.entry-entrymodel',

    fields: [
        { name: 'uid', type: 'string', defaultValue: '00000000-0000-0000-0000-000000000000' },
        { name: 'name', type: 'string' },
        { name: 'format', type: 'int' },
        { name: 'location', type: 'int' },
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' }
    ],
    validators: {
        name: [
            { type: 'presence', message: 'is required' }
        ],
        format: [
            { type: 'exclusion', list: [0], message: 'is required' }
        ],
        location: [
            { type: 'exclusion', list: [0], message: 'is required' }
        ],
    }
});
