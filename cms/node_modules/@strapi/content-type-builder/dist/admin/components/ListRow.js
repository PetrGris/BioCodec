'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var designSystem = require('@strapi/design-system');
var Icons = require('@strapi/icons');
var get = require('lodash/get');
var reactIntl = require('react-intl');
var styledComponents = require('styled-components');
var useDataManager = require('../hooks/useDataManager.js');
var Curve = require('../icons/Curve.js');
var getTrad = require('../utils/getTrad.js');
var AttributeIcon = require('./AttributeIcon.js');
var DisplayedType = require('./DisplayedType.js');
var UpperFirst = require('./UpperFirst.js');

const BoxWrapper = styledComponents.styled(designSystem.Box)`
  position: relative;
`;
const ListRow = /*#__PURE__*/ React.memo(({ configurable = true, customField = null, editTarget, firstLoopComponentUid = null, isFromDynamicZone = false, name, onClick, relation = '', repeatable = false, secondLoopComponentUid = null, target = null, targetUid = null, type })=>{
    const { contentTypes, isInDevelopmentMode, removeAttribute } = useDataManager.useDataManager();
    const { formatMessage } = reactIntl.useIntl();
    const isMorph = type === 'relation' && relation.includes('morph');
    const ico = [
        'integer',
        'biginteger',
        'float',
        'decimal'
    ].includes(type) ? 'number' : type;
    const contentType = get(contentTypes, [
        target
    ], {});
    const contentTypeFriendlyName = get(contentType, [
        'schema',
        'displayName'
    ], '');
    const isPluginContentType = get(contentType, 'plugin');
    const src = target ? 'relation' : ico;
    const handleClick = ()=>{
        if (isMorph) {
            return;
        }
        if (configurable !== false) {
            const attrType = type;
            onClick(// Tells where the attribute is located in the main modifiedData object : contentType, component or components
            editTarget, // main data type uid
            secondLoopComponentUid || firstLoopComponentUid || targetUid, // Name of the attribute
            name, // Type of the attribute
            attrType, customField);
        }
    };
    let loopNumber;
    if (secondLoopComponentUid && firstLoopComponentUid) {
        loopNumber = 2;
    } else if (firstLoopComponentUid) {
        loopNumber = 1;
    } else {
        loopNumber = 0;
    }
    return /*#__PURE__*/ jsxRuntime.jsxs(BoxWrapper, {
        tag: "tr",
        onClick: isInDevelopmentMode && configurable && !isMorph ? handleClick : undefined,
        children: [
            /*#__PURE__*/ jsxRuntime.jsxs("td", {
                style: {
                    position: 'relative'
                },
                children: [
                    loopNumber !== 0 && /*#__PURE__*/ jsxRuntime.jsx(Curve.Curve, {
                        color: isFromDynamicZone ? 'primary200' : 'neutral150'
                    }),
                    /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                        paddingLeft: 2,
                        gap: 4,
                        children: [
                            /*#__PURE__*/ jsxRuntime.jsx(AttributeIcon.AttributeIcon, {
                                type: src,
                                customField: customField
                            }),
                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                textColor: "neutral800",
                                fontWeight: "bold",
                                children: name
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsxRuntime.jsx("td", {
                children: target ? /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Typography, {
                    textColor: "neutral800",
                    children: [
                        formatMessage({
                            id: getTrad.getTrad(`modelPage.attribute.${isMorph ? 'relation-polymorphic' : 'relationWith'}`),
                            defaultMessage: 'Relation with'
                        }),
                        " ",
                        /*#__PURE__*/ jsxRuntime.jsxs("span", {
                            style: {
                                fontStyle: 'italic'
                            },
                            children: [
                                /*#__PURE__*/ jsxRuntime.jsx(UpperFirst.UpperFirst, {
                                    content: contentTypeFriendlyName
                                }),
                                " ",
                                isPluginContentType && `(${formatMessage({
                                    id: getTrad.getTrad(`from`),
                                    defaultMessage: 'from'
                                })}: ${isPluginContentType})`
                            ]
                        })
                    ]
                }) : /*#__PURE__*/ jsxRuntime.jsx(DisplayedType.DisplayedType, {
                    type: type,
                    customField: customField,
                    repeatable: repeatable
                })
            }),
            /*#__PURE__*/ jsxRuntime.jsx("td", {
                children: isInDevelopmentMode ? /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
                    justifyContent: "flex-end",
                    onClick: (e)=>e.stopPropagation(),
                    children: configurable ? /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                        gap: 1,
                        children: [
                            !isMorph && /*#__PURE__*/ jsxRuntime.jsx(designSystem.IconButton, {
                                onClick: handleClick,
                                label: `${formatMessage({
                                    id: 'app.utils.edit',
                                    defaultMessage: 'Edit'
                                })} ${name}`,
                                variant: "ghost",
                                children: /*#__PURE__*/ jsxRuntime.jsx(Icons.Pencil, {})
                            }),
                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.IconButton, {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    removeAttribute(editTarget, name, secondLoopComponentUid || firstLoopComponentUid || '');
                                },
                                label: `${formatMessage({
                                    id: 'global.delete',
                                    defaultMessage: 'Delete'
                                })} ${name}`,
                                variant: "ghost",
                                children: /*#__PURE__*/ jsxRuntime.jsx(Icons.Trash, {})
                            })
                        ]
                    }) : /*#__PURE__*/ jsxRuntime.jsx(Icons.Lock, {})
                }) : /*
            In production mode the edit icons aren't visible, therefore
            we need to reserve the same space, otherwise the height of the
            row might collapse, leading to bad positioned curve icons
          */ /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                    height: "3.2rem"
                })
            })
        ]
    });
});

exports.BoxWrapper = BoxWrapper;
exports.ListRow = ListRow;
//# sourceMappingURL=ListRow.js.map
