'use strict';

var jsxRuntime = require('react/jsx-runtime');
var designSystem = require('@strapi/design-system');
var reactIntl = require('react-intl');
var getTrad = require('../utils/getTrad.js');

const DisplayedType = ({ type, customField = null, repeatable = false })=>{
    const { formatMessage } = reactIntl.useIntl();
    let readableType = type;
    if ([
        'integer',
        'biginteger',
        'float',
        'decimal'
    ].includes(type)) {
        readableType = 'number';
    } else if ([
        'string'
    ].includes(type)) {
        readableType = 'text';
    }
    if (customField) {
        return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
            children: formatMessage({
                id: getTrad.getTrad('attribute.customField'),
                defaultMessage: 'Custom field'
            })
        });
    }
    return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Typography, {
        textColor: "neutral800",
        children: [
            formatMessage({
                id: getTrad.getTrad(`attribute.${readableType}`),
                defaultMessage: type
            }),
            " ",
            repeatable && formatMessage({
                id: getTrad.getTrad('component.repeatable'),
                defaultMessage: '(repeatable)'
            })
        ]
    });
};

exports.DisplayedType = DisplayedType;
//# sourceMappingURL=DisplayedType.js.map
