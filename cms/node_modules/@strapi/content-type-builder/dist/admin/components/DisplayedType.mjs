import { jsx, jsxs } from 'react/jsx-runtime';
import { Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTrad } from '../utils/getTrad.mjs';

const DisplayedType = ({ type, customField = null, repeatable = false })=>{
    const { formatMessage } = useIntl();
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
        return /*#__PURE__*/ jsx(Typography, {
            children: formatMessage({
                id: getTrad('attribute.customField'),
                defaultMessage: 'Custom field'
            })
        });
    }
    return /*#__PURE__*/ jsxs(Typography, {
        textColor: "neutral800",
        children: [
            formatMessage({
                id: getTrad(`attribute.${readableType}`),
                defaultMessage: type
            }),
            " ",
            repeatable && formatMessage({
                id: getTrad('component.repeatable'),
                defaultMessage: '(repeatable)'
            })
        ]
    });
};

export { DisplayedType };
//# sourceMappingURL=DisplayedType.mjs.map
