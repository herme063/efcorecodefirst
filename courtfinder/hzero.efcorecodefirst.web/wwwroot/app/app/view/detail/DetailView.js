
Ext.define('CourtFinderApp.view.detail.DetailView', {
    xtype: 'detail-detailview',
    extend: 'Ext.panel.Panel',

    requires: [
        'CourtFinderApp.view.detail.DetailViewController',
        'CourtFinderApp.view.detail.DetailViewModel'
    ],

    controller: 'detail-detailview',
    viewModel: {
        type: 'detail-detailview'
    },

    bind: {
        title: '{name}'
    },
    padding: 0,
    layout: 'vbox',
    defaults: {
        padding: 5
    },
    items: [{
        padding: 0,
        bind: {
            html: '<img src="{thumbUrl}" />'
        }
    },{
        bind: {
            html: [
                '<div class="detail-header">',
                    '<div>',
                        '<span class="x-fa fa-star rating {hasRating1}"></span>',
                        '<span class="x-fa fa-star rating {hasRating2}"></span>',
                        '<span class="x-fa fa-star rating {hasRating3}"></span>',
                        '<span class="x-fa fa-star rating {hasRating4}"></span>',
                        '<span class="x-fa fa-star rating {hasRating5}"></span>',
                    '</div>',
                    '<h4>{rating} out of 5 ({ratingCount})</h4>',
                    '<h4>{formatLiteral}</h4>',
                    '<h4>{locationLiteral}</h4>',
                '</div>'
            ].join('')
        }
    }, {
        flex: 1,
        xtype: 'dataview',
        scrollable: 'y',
        bind: {
            store: '{reviews}'
        },
        itemTpl: [
            '<div class="review-row">',
                '<h3>{reviewer}</h3>',
                '<div>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(1, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(2, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(3, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(4, values) ]}"></span>',
                    '<span class="x-fa fa-star rating {[ this.isChecked(5, values) ]}"></span>',
                '</div>',
                '<p>{review}</p>',
            '</div>',
            {
                isChecked: function (start, values) {
                    return start <= values.rating ? 'checked' : '';
                }
            }
        ],
    }],

    listeners: {
        opened: 'onOpened'
    }
});
