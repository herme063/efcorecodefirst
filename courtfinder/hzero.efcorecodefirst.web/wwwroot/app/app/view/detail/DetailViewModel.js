Ext.define('CourtFinderApp.view.detail.DetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.detail-detailview',
    requires: [
        'CourtFinderApp.model.detail.CourtReviewModel'
    ],

    data: {
        name: 'CourtFinderApp',
        uid: null,
        name: null,
        rating: null,
        ratingCount: null,
        format: null,
        location: null,
        lat: null,
        lng: null,
        reviewSortBy: 1
    },
    formulas: {
        thumbUrl: function (get) {
            return get('uid') 
                ? '../api/CourtFinder/GetCourtThumb?uid=' + get('uid') + '&idx=0' 
                : 'http://via.placeholder.com/400x200'; 
        },
        hasRating1: function (get) {
            return get('rating') >= 1 ? 'checked' : '';
        },
        hasRating2: function (get) {
            return get('rating') >= 2 ? 'checked' : '';
        },
        hasRating3: function (get) {
            return get('rating') >= 3 ? 'checked' : '';
        },
        hasRating4: function (get) {
            return get('rating') >= 4 ? 'checked' : '';
        },
        hasRating5: function (get) {
            return get('rating') >= 5 ? 'checked' : '';
        },
        formatLiteral: function (get) {
            return get('format') == 1 ? 'full-court' 
                : get('format') == 2 ? 'half-court' 
                : 'full court(reduced)';
        },
        locationLiteral: function (get) {
            return get('location') == 1 ? 'Indoor' : 'Outdoor';
        }
    },
    stores: {
        reviews: {
            type: 'array',
            model: 'CourtFinderApp.model.detail.CourtReviewModel',
            sorters: [{
                property: 'rating',
                direction: 'DESC'
            }]
        }
    }
});