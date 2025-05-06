import { jsxs, jsx } from 'react/jsx-runtime';
import { memo } from 'react';
import { Box, Flex, Typography, IconButton } from '@strapi/design-system';
import { Pencil, Trash, Lock } from '@strapi/icons';
import get from 'lodash/get';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import { useDataManager } from '../hooks/useDataManager.mjs';
import { Curve } from '../icons/Curve.mjs';
import { getTrad } from '../utils/getTrad.mjs';
import { AttributeIcon } from './AttributeIcon.mjs';
import { DisplayedType } from './DisplayedType.mjs';
import { UpperFirst } from './UpperFirst.mjs';

const BoxWrapper = styled(Box)`
  position: relative;
`;
const ListRow = /*#__PURE__*/ memo(({ configurable = true, customField = null, editTarget, firstLoopComponentUid = null, isFromDynamicZone = false, name, onClick, relation = '', repeatable = false, secondLoopComponentUid = null, target = null, targetUid = null, type })=>{
    const { contentTypes, isInDevelopmentMode, removeAttribute } = useDataManager();
    const { formatMessage } = useIntl();
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
    return /*#__PURE__*/ jsxs(BoxWrapper, {
        tag: "tr",
        onClick: isInDevelopmentMode && configurable && !isMorph ? handleClick : undefined,
        children: [
            /*#__PURE__*/ jsxs("td", {
                style: {
                    position: 'relative'
                },
                children: [
                    loopNumber !== 0 && /*#__PURE__*/ jsx(Curve, {
                        color: isFromDynamicZone ? 'primary200' : 'neutral150'
                    }),
                    /*#__PURE__*/ jsxs(Flex, {
                        paddingLeft: 2,
                        gap: 4,
                        children: [
                            /*#__PURE__*/ jsx(AttributeIcon, {
                                type: src,
                                customField: customField
                            }),
                            /*#__PURE__*/ jsx(Typography, {
                                textColor: "neutral800",
                                fontWeight: "bold",
                                children: name
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx("td", {
                children: target ? /*#__PURE__*/ jsxs(Typography, {
                    textColor: "neutral800",
                    children: [
                        formatMessage({
                            id: getTrad(`modelPage.attribute.${isMorph ? 'relation-polymorphic' : 'relationWith'}`),
                            defaultMessage: 'Relation with'
                        }),
                        " ",
                        /*#__PURE__*/ jsxs("span", {
                            style: {
                                fontStyle: 'italic'
                            },
                            children: [
                                /*#__PURE__*/ jsx(UpperFirst, {
                                    content: contentTypeFriendlyName
                                }),
                                " ",
                                isPluginContentType && `(${formatMessage({
                                    id: getTrad(`from`),
                                    defaultMessage: 'from'
                                })}: ${isPluginContentType})`
                            ]
                        })
                    ]
                }) : /*#__PURE__*/ jsx(DisplayedType, {
                    type: type,
                    customField: customField,
                    repeatable: repeatable
                })
            }),
            /*#__PURE__*/ jsx("td", {
                children: isInDevelopmentMode ? /*#__PURE__*/ jsx(Flex, {
                    justifyContent: "flex-end",
                    onClick: (e)=>e.stopPropagation(),
                    children: configurable ? /*#__PURE__*/ jsxs(Flex, {
                        gap: 1,
                        children: [
                            !isMorph && /*#__PURE__*/ jsx(IconButton, {
                                onClick: handleClick,
                                label: `${formatMessage({
                                    id: 'app.utils.edit',
                                    defaultMessage: 'Edit'
                                })} ${name}`,
                                variant: "ghost",
                                children: /*#__PURE__*/ jsx(Pencil, {})
                            }),
                            /*#__PURE__*/ jsx(IconButton, {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    removeAttribute(editTarget, name, secondLoopComponentUid || firstLoopComponentUid || '');
                                },
                                label: `${formatMessage({
                                    id: 'global.delete',
                                    defaultMessage: 'Delete'
                                })} ${name}`,
                                variant: "ghost",
                                children: /*#__PURE__*/ jsx(Trash, {})
                            })
                        ]
                    }) : /*#__PURE__*/ jsx(Lock, {})
                }) : /*
            In production mode the edit icons aren't visible, therefore
            we need to reserve the same space, otherwise the height of the
            row might collapse, leading to bad positioned curve icons
          */ /*#__PURE__*/ jsx(Box, {
                    height: "3.2rem"
                })
            })
        ]
    });
});

export { BoxWrapper, ListRow };
//# sourceMappingURL=ListRow.mjs.map
