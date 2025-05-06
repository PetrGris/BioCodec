'use strict';

var get = require('lodash/get');
var getRelationType = require('../../../utils/getRelationType.js');

const canEditContentType = (data, modifiedData)=>{
    const kind = get(data, [
        'contentType',
        'schema',
        'kind'
    ], '');
    // if kind isn't modified or content type is a single type, there is no need to check attributes.
    if (kind === 'singleType' || kind === modifiedData.kind) {
        return true;
    }
    const contentTypeAttributes = get(data, [
        'contentType',
        'schema',
        'attributes'
    ], []);
    const relationAttributes = contentTypeAttributes.filter(({ relation, type, targetAttribute })=>{
        const relationType = getRelationType.getRelationType(relation, targetAttribute);
        return type === 'relation' && ![
            'oneWay',
            'manyWay'
        ].includes(relationType || '');
    });
    return relationAttributes.length === 0;
};

exports.canEditContentType = canEditContentType;
//# sourceMappingURL=canEditContentType.js.map
