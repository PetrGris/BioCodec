'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var strapiAdmin = require('@strapi/admin/strapi-admin');
var designSystem = require('@strapi/design-system');
var Icons = require('@strapi/icons');
var Symbols = require('@strapi/icons/symbols');
var reactIntl = require('react-intl');
var useDataManager = require('../hooks/useDataManager.js');
var useFormModalNavigation = require('../hooks/useFormModalNavigation.js');
var getTrad = require('../utils/getTrad.js');
var BoxWrapper = require('./BoxWrapper.js');
var ComponentList = require('./ComponentList.js');
var DynamicZoneList = require('./DynamicZoneList.js');
var NestedFooter = require('./NestedFooter.js');

const List = ({ addComponentToDZ, customRowComponent, editTarget, firstLoopComponentUid, isFromDynamicZone = false, isMain = false, isNestedInDZComponent = false, isSub = false, items = [], secondLoopComponentUid, targetUid })=>{
    const { formatMessage } = reactIntl.useIntl();
    const { trackUsage } = strapiAdmin.useTracking();
    const { isInDevelopmentMode, modifiedData, isInContentTypeView } = useDataManager.useDataManager();
    const { onOpenModalAddField } = useFormModalNavigation.useFormModalNavigation();
    const onClickAddField = ()=>{
        trackUsage('hasClickedCTBAddFieldBanner');
        onOpenModalAddField({
            forTarget: editTarget,
            targetUid
        });
    };
    if (!targetUid) {
        return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Table, {
            colCount: 2,
            rowCount: 2,
            children: [
                /*#__PURE__*/ jsxRuntime.jsx(designSystem.Thead, {
                    children: /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Tr, {
                        children: [
                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Th, {
                                children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                    variant: "sigma",
                                    textColor: "neutral600",
                                    children: formatMessage({
                                        id: 'global.name',
                                        defaultMessage: 'Name'
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Th, {
                                children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                    variant: "sigma",
                                    textColor: "neutral600",
                                    children: formatMessage({
                                        id: 'global.type',
                                        defaultMessage: 'Type'
                                    })
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsxRuntime.jsx(designSystem.Tbody, {
                    children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Tr, {
                        children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Td, {
                            colSpan: 2,
                            children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.EmptyStateLayout, {
                                content: formatMessage({
                                    id: getTrad.getTrad('table.content.create-first-content-type'),
                                    defaultMessage: 'Create your first Collection-Type'
                                }),
                                hasRadius: true,
                                icon: /*#__PURE__*/ jsxRuntime.jsx(Symbols.EmptyDocuments, {
                                    width: "16rem"
                                })
                            })
                        })
                    })
                })
            ]
        });
    }
    if (items.length === 0 && isMain) {
        return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Table, {
            colCount: 2,
            rowCount: 2,
            children: [
                /*#__PURE__*/ jsxRuntime.jsx(designSystem.Thead, {
                    children: /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Tr, {
                        children: [
                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Th, {
                                children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                    variant: "sigma",
                                    textColor: "neutral600",
                                    children: formatMessage({
                                        id: 'global.name',
                                        defaultMessage: 'Name'
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Th, {
                                children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                    variant: "sigma",
                                    textColor: "neutral600",
                                    children: formatMessage({
                                        id: 'global.type',
                                        defaultMessage: 'Type'
                                    })
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsxRuntime.jsx(designSystem.Tbody, {
                    children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Tr, {
                        children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Td, {
                            colSpan: 2,
                            children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.EmptyStateLayout, {
                                action: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Button, {
                                    onClick: onClickAddField,
                                    size: "L",
                                    startIcon: /*#__PURE__*/ jsxRuntime.jsx(Icons.Plus, {}),
                                    variant: "secondary",
                                    children: formatMessage({
                                        id: getTrad.getTrad('table.button.no-fields'),
                                        defaultMessage: 'Add new field'
                                    })
                                }),
                                content: formatMessage(isInContentTypeView ? {
                                    id: getTrad.getTrad('table.content.no-fields.collection-type'),
                                    defaultMessage: 'Add your first field to this Collection-Type'
                                } : {
                                    id: getTrad.getTrad('table.content.no-fields.component'),
                                    defaultMessage: 'Add your first field to this component'
                                }),
                                hasRadius: true,
                                icon: /*#__PURE__*/ jsxRuntime.jsx(Symbols.EmptyDocuments, {
                                    width: "16rem"
                                })
                            })
                        })
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ jsxRuntime.jsxs(BoxWrapper.BoxWrapper, {
        children: [
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                paddingLeft: 6,
                paddingRight: isMain ? 6 : 0,
                ...isMain && {
                    style: {
                        overflowX: 'auto'
                    }
                },
                children: /*#__PURE__*/ jsxRuntime.jsxs("table", {
                    children: [
                        isMain && /*#__PURE__*/ jsxRuntime.jsx("thead", {
                            children: /*#__PURE__*/ jsxRuntime.jsxs("tr", {
                                children: [
                                    /*#__PURE__*/ jsxRuntime.jsx("th", {
                                        children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                            variant: "sigma",
                                            textColor: "neutral800",
                                            children: formatMessage({
                                                id: 'global.name',
                                                defaultMessage: 'Name'
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsxRuntime.jsx("th", {
                                        colSpan: 2,
                                        children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                            variant: "sigma",
                                            textColor: "neutral800",
                                            children: formatMessage({
                                                id: 'global.type',
                                                defaultMessage: 'Type'
                                            })
                                        })
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsxRuntime.jsx("tbody", {
                            children: items.map((item)=>{
                                const { type } = item;
                                const CustomRow = customRowComponent;
                                return /*#__PURE__*/ jsxRuntime.jsxs(React.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsxRuntime.jsx(CustomRow, {
                                            ...item,
                                            isNestedInDZComponent: isNestedInDZComponent,
                                            targetUid: targetUid,
                                            editTarget: editTarget,
                                            firstLoopComponentUid: firstLoopComponentUid,
                                            isFromDynamicZone: isFromDynamicZone,
                                            secondLoopComponentUid: secondLoopComponentUid
                                        }),
                                        type === 'component' && /*#__PURE__*/ jsxRuntime.jsx(ComponentList.ComponentList, {
                                            ...item,
                                            customRowComponent: customRowComponent,
                                            targetUid: targetUid,
                                            isNestedInDZComponent: isFromDynamicZone,
                                            editTarget: editTarget,
                                            firstLoopComponentUid: firstLoopComponentUid
                                        }),
                                        type === 'dynamiczone' && /*#__PURE__*/ jsxRuntime.jsx(DynamicZoneList.DynamicZoneList, {
                                            ...item,
                                            customRowComponent: customRowComponent,
                                            addComponent: addComponentToDZ,
                                            targetUid: targetUid
                                        })
                                    ]
                                }, item.name);
                            })
                        })
                    ]
                })
            }),
            isMain && isInDevelopmentMode && /*#__PURE__*/ jsxRuntime.jsx(designSystem.TFooter, {
                cursor: "pointer",
                icon: /*#__PURE__*/ jsxRuntime.jsx(Icons.Plus, {}),
                onClick: onClickAddField,
                children: formatMessage({
                    id: getTrad.getTrad(`form.button.add.field.to.${modifiedData.contentType ? modifiedData.contentType.schema.kind : editTarget || 'collectionType'}`),
                    defaultMessage: 'Add another field'
                })
            }),
            isSub && isInDevelopmentMode && !isFromDynamicZone && /*#__PURE__*/ jsxRuntime.jsx(NestedFooter.NestedTFooter, {
                icon: /*#__PURE__*/ jsxRuntime.jsx(Icons.Plus, {}),
                onClick: onClickAddField,
                color: isFromDynamicZone ? 'primary' : 'neutral',
                children: formatMessage({
                    id: getTrad.getTrad(`form.button.add.field.to.component`),
                    defaultMessage: 'Add another field'
                })
            })
        ]
    });
};

exports.List = List;
//# sourceMappingURL=List.js.map
