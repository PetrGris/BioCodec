import { jsxs, jsx } from 'react/jsx-runtime';
import { Fragment } from 'react';
import { useTracking } from '@strapi/admin/strapi-admin';
import { Table, Thead, Tr, Th, Typography, Tbody, Td, EmptyStateLayout, Button, Box, TFooter } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import { useIntl } from 'react-intl';
import { useDataManager } from '../hooks/useDataManager.mjs';
import { useFormModalNavigation } from '../hooks/useFormModalNavigation.mjs';
import { getTrad } from '../utils/getTrad.mjs';
import { BoxWrapper } from './BoxWrapper.mjs';
import { ComponentList } from './ComponentList.mjs';
import { DynamicZoneList } from './DynamicZoneList.mjs';
import { NestedTFooter } from './NestedFooter.mjs';

const List = ({ addComponentToDZ, customRowComponent, editTarget, firstLoopComponentUid, isFromDynamicZone = false, isMain = false, isNestedInDZComponent = false, isSub = false, items = [], secondLoopComponentUid, targetUid })=>{
    const { formatMessage } = useIntl();
    const { trackUsage } = useTracking();
    const { isInDevelopmentMode, modifiedData, isInContentTypeView } = useDataManager();
    const { onOpenModalAddField } = useFormModalNavigation();
    const onClickAddField = ()=>{
        trackUsage('hasClickedCTBAddFieldBanner');
        onOpenModalAddField({
            forTarget: editTarget,
            targetUid
        });
    };
    if (!targetUid) {
        return /*#__PURE__*/ jsxs(Table, {
            colCount: 2,
            rowCount: 2,
            children: [
                /*#__PURE__*/ jsx(Thead, {
                    children: /*#__PURE__*/ jsxs(Tr, {
                        children: [
                            /*#__PURE__*/ jsx(Th, {
                                children: /*#__PURE__*/ jsx(Typography, {
                                    variant: "sigma",
                                    textColor: "neutral600",
                                    children: formatMessage({
                                        id: 'global.name',
                                        defaultMessage: 'Name'
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx(Th, {
                                children: /*#__PURE__*/ jsx(Typography, {
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
                /*#__PURE__*/ jsx(Tbody, {
                    children: /*#__PURE__*/ jsx(Tr, {
                        children: /*#__PURE__*/ jsx(Td, {
                            colSpan: 2,
                            children: /*#__PURE__*/ jsx(EmptyStateLayout, {
                                content: formatMessage({
                                    id: getTrad('table.content.create-first-content-type'),
                                    defaultMessage: 'Create your first Collection-Type'
                                }),
                                hasRadius: true,
                                icon: /*#__PURE__*/ jsx(EmptyDocuments, {
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
        return /*#__PURE__*/ jsxs(Table, {
            colCount: 2,
            rowCount: 2,
            children: [
                /*#__PURE__*/ jsx(Thead, {
                    children: /*#__PURE__*/ jsxs(Tr, {
                        children: [
                            /*#__PURE__*/ jsx(Th, {
                                children: /*#__PURE__*/ jsx(Typography, {
                                    variant: "sigma",
                                    textColor: "neutral600",
                                    children: formatMessage({
                                        id: 'global.name',
                                        defaultMessage: 'Name'
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx(Th, {
                                children: /*#__PURE__*/ jsx(Typography, {
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
                /*#__PURE__*/ jsx(Tbody, {
                    children: /*#__PURE__*/ jsx(Tr, {
                        children: /*#__PURE__*/ jsx(Td, {
                            colSpan: 2,
                            children: /*#__PURE__*/ jsx(EmptyStateLayout, {
                                action: /*#__PURE__*/ jsx(Button, {
                                    onClick: onClickAddField,
                                    size: "L",
                                    startIcon: /*#__PURE__*/ jsx(Plus, {}),
                                    variant: "secondary",
                                    children: formatMessage({
                                        id: getTrad('table.button.no-fields'),
                                        defaultMessage: 'Add new field'
                                    })
                                }),
                                content: formatMessage(isInContentTypeView ? {
                                    id: getTrad('table.content.no-fields.collection-type'),
                                    defaultMessage: 'Add your first field to this Collection-Type'
                                } : {
                                    id: getTrad('table.content.no-fields.component'),
                                    defaultMessage: 'Add your first field to this component'
                                }),
                                hasRadius: true,
                                icon: /*#__PURE__*/ jsx(EmptyDocuments, {
                                    width: "16rem"
                                })
                            })
                        })
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ jsxs(BoxWrapper, {
        children: [
            /*#__PURE__*/ jsx(Box, {
                paddingLeft: 6,
                paddingRight: isMain ? 6 : 0,
                ...isMain && {
                    style: {
                        overflowX: 'auto'
                    }
                },
                children: /*#__PURE__*/ jsxs("table", {
                    children: [
                        isMain && /*#__PURE__*/ jsx("thead", {
                            children: /*#__PURE__*/ jsxs("tr", {
                                children: [
                                    /*#__PURE__*/ jsx("th", {
                                        children: /*#__PURE__*/ jsx(Typography, {
                                            variant: "sigma",
                                            textColor: "neutral800",
                                            children: formatMessage({
                                                id: 'global.name',
                                                defaultMessage: 'Name'
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx("th", {
                                        colSpan: 2,
                                        children: /*#__PURE__*/ jsx(Typography, {
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
                        /*#__PURE__*/ jsx("tbody", {
                            children: items.map((item)=>{
                                const { type } = item;
                                const CustomRow = customRowComponent;
                                return /*#__PURE__*/ jsxs(Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx(CustomRow, {
                                            ...item,
                                            isNestedInDZComponent: isNestedInDZComponent,
                                            targetUid: targetUid,
                                            editTarget: editTarget,
                                            firstLoopComponentUid: firstLoopComponentUid,
                                            isFromDynamicZone: isFromDynamicZone,
                                            secondLoopComponentUid: secondLoopComponentUid
                                        }),
                                        type === 'component' && /*#__PURE__*/ jsx(ComponentList, {
                                            ...item,
                                            customRowComponent: customRowComponent,
                                            targetUid: targetUid,
                                            isNestedInDZComponent: isFromDynamicZone,
                                            editTarget: editTarget,
                                            firstLoopComponentUid: firstLoopComponentUid
                                        }),
                                        type === 'dynamiczone' && /*#__PURE__*/ jsx(DynamicZoneList, {
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
            isMain && isInDevelopmentMode && /*#__PURE__*/ jsx(TFooter, {
                cursor: "pointer",
                icon: /*#__PURE__*/ jsx(Plus, {}),
                onClick: onClickAddField,
                children: formatMessage({
                    id: getTrad(`form.button.add.field.to.${modifiedData.contentType ? modifiedData.contentType.schema.kind : editTarget || 'collectionType'}`),
                    defaultMessage: 'Add another field'
                })
            }),
            isSub && isInDevelopmentMode && !isFromDynamicZone && /*#__PURE__*/ jsx(NestedTFooter, {
                icon: /*#__PURE__*/ jsx(Plus, {}),
                onClick: onClickAddField,
                color: isFromDynamicZone ? 'primary' : 'neutral',
                children: formatMessage({
                    id: getTrad(`form.button.add.field.to.component`),
                    defaultMessage: 'Add another field'
                })
            })
        ]
    });
};

export { List };
//# sourceMappingURL=List.mjs.map
