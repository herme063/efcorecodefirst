Ext.define('CourtFinderApp.utils.EnumerableService', {
    alternateClassName: ['CourtFinderApp.EnumerableService'],
    singleton: true,

    fullOuterJoin: function (left, right, leftKeySelectorFn, rightKeySelectorFn, resultSelectorFn, includeNull) {
        var joinIndex = {},
            keyMaker = JSON.stringify;
        (left || []).forEach(function (i) {
            var key = keyMaker(leftKeySelectorFn(i));
            joinIndex[key] = { left: i, right: null };
        });
        (right || []).forEach(function (i) {
            var key = keyMaker(rightKeySelectorFn(i));
            joinIndex[key] = joinIndex[key] || { left: null };
            joinIndex[key].right = i;
        });
        
        var result = Object.keys(joinIndex).map(function (idx) {
            return resultSelectorFn(joinIndex[idx].left, joinIndex[idx].right);
        }).filter(function (v) {
            return v || includeNull;
        });

        return result;
    }
});