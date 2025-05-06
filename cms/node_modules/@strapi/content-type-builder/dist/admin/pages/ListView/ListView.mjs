import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { Layouts, useTracking, BackButton } from '@strapi/admin/strapi-admin';
import { Flex, Button, Box } from '@strapi/design-system';
import { Plus, Check, Pencil } from '@strapi/icons';
import get from 'lodash/get';
import has from 'lodash/has';
import isEqual from 'lodash/isEqual';
import upperFirst from 'lodash/upperFirst';
import { useIntl } from 'react-intl';
import { useMatch, unstable_usePrompt } from 'react-router-dom';
import { styled } from 'styled-components';
import { List } from '../../components/List.mjs';
import { ListRow } from '../../components/ListRow.mjs';
import { useDataManager } from '../../hooks/useDataManager.mjs';
import { useFormModalNavigation } from '../../hooks/useFormModalNavigation.mjs';
import { getAttributeDisplayedType } from '../../utils/getAttributeDisplayedType.mjs';
import { getTrad } from '../../utils/getTrad.mjs';
import { LinkToCMSettingsView } from './LinkToCMSettingsView.mjs';

const LayoutsHeaderCustom = styled(Layouts.Header)`
  overflow-wrap: anywhere;
`;
const ListView = ()=>{
    const { initialData, modifiedData, isInDevelopmentMode, isInContentTypeView, submitData } = useDataManager();
    const { formatMessage } = useIntl();
    const { trackUsage } = useTracking();
    const match = useMatch('/plugins/content-type-builder/:kind/:currentUID');
    const { onOpenModalAddComponentsToDZ, onOpenModalAddField, onOpenModalEditField, onOpenModalEditSchema, onOpenModalEditCustomField } = useFormModalNavigation();
    const firstMainDataPath = isInContentTypeView ? 'contentType' : 'component';
    const mainDataTypeAttributesPath = [
        firstMainDataPath,
        'schema',
        'attributes'
    ];
    const targetUid = get(modifiedData, [
        firstMainDataPath,
        'uid'
    ]);
    const isTemporary = get(modifiedData, [
        firstMainDataPath,
        'isTemporary'
    ], false);
    const contentTypeKind = get(modifiedData, [
        firstMainDataPath,
        'schema',
        'kind'
    ], null);
    const attributes = get(modifiedData, mainDataTypeAttributesPath, []);
    const isFromPlugin = has(initialData, [
        firstMainDataPath,
        'plugin'
    ]);
    const hasModelBeenModified = !isEqual(modifiedData, initialData);
    const forTarget = isInContentTypeView ? 'contentType' : 'component';
    const handleClickAddComponentToDZ = (dynamicZoneTarget)=>{
        onOpenModalAddComponentsToDZ({
            dynamicZoneTarget,
            targetUid
        });
    };
    const handleClickEditField = async (forTarget, targetUid, attributeName, type, customField)=>{
        const attributeType = getAttributeDisplayedType(type);
        const step = type === 'component' ? '2' : null;
        if (customField) {
            onOpenModalEditCustomField({
                forTarget,
                targetUid,
                attributeName,
                attributeType,
                customFieldUid: customField
            });
        } else {
            onOpenModalEditField({
                forTarget,
                targetUid,
                attributeName,
                attributeType,
                step
            });
        }
    };
    let label = get(modifiedData, [
        firstMainDataPath,
        'schema',
        'displayName'
    ], '');
    const kind = get(modifiedData, [
        firstMainDataPath,
        'schema',
        'kind'
    ], '');
    const isCreatingFirstContentType = match?.params.currentUID === 'create-content-type';
    if (!label && isCreatingFirstContentType) {
        label = formatMessage({
            id: getTrad('button.model.create'),
            defaultMessage: 'Create new collection type'
        });
    }
    const onEdit = ()=>{
        const contentType = kind || firstMainDataPath;
        if (contentType === 'collectionType') {
            trackUsage('willEditNameOfContentType');
        }
        if (contentType === 'singleType') {
            trackUsage('willEditNameOfSingleType');
        }
        onOpenModalEditSchema({
            modalType: firstMainDataPath,
            forTarget: firstMainDataPath,
            targetUid,
            kind: contentType
        });
    };
    unstable_usePrompt({
        when: hasModelBeenModified,
        message: formatMessage({
            id: getTrad('prompt.unsaved'),
            defaultMessage: 'Are you sure?'
        })
    });
    const primaryAction = isInDevelopmentMode && /*#__PURE__*/ jsxs(Flex, {
        gap: 2,
        marginLeft: 2,
        children: [
            !isCreatingFirstContentType && /*#__PURE__*/ jsx(Button, {
                startIcon: /*#__PURE__*/ jsx(Plus, {}),
                variant: "secondary",
                minWidth: "max-content",
                onClick: ()=>{
                    onOpenModalAddField({
                        forTarget,
                        targetUid
                    });
                },
                children: formatMessage({
                    id: getTrad('button.attributes.add.another'),
                    defaultMessage: 'Add another field'
                })
            }),
            /*#__PURE__*/ jsx(Button, {
                startIcon: /*#__PURE__*/ jsx(Check, {}),
                onClick: async ()=>await submitData(),
                type: "submit",
                disabled: isEqual(modifiedData, initialData),
                children: formatMessage({
                    id: 'global.save',
                    defaultMessage: 'Save'
                })
            })
        ]
    });
    const secondaryAction = isInDevelopmentMode && !isFromPlugin && !isCreatingFirstContentType && /*#__PURE__*/ jsx(Button, {
        startIcon: /*#__PURE__*/ jsx(Pencil, {}),
        variant: "tertiary",
        onClick: onEdit,
        children: formatMessage({
            id: 'app.utils.edit',
            defaultMessage: 'Edit'
        })
    });
    return /*#__PURE__*/ jsxs(Fragment, {
        children: [
            /*#__PURE__*/ jsx(LayoutsHeaderCustom, {
                id: "title",
                primaryAction: primaryAction,
                secondaryAction: secondaryAction,
                title: upperFirst(label),
                subtitle: formatMessage({
                    id: getTrad('listView.headerLayout.description'),
                    defaultMessage: 'Build the data architecture of your content'
                }),
                navigationAction: /*#__PURE__*/ jsx(BackButton, {})
            }),
            /*#__PURE__*/ jsx(Layouts.Content, {
                children: /*#__PURE__*/ jsxs(Flex, {
                    direction: "column",
                    alignItems: "stretch",
                    gap: 4,
                    children: [
                        /*#__PURE__*/ jsx(Flex, {
                            justifyContent: "flex-end",
                            children: /*#__PURE__*/ jsx(Flex, {
                                gap: 2,
                                children: /*#__PURE__*/ jsx(LinkToCMSettingsView, {
                                    targetUid: targetUid,
                                    isInContentTypeView: isInContentTypeView,
                                    contentTypeKind: contentTypeKind,
                                    disabled: isCreatingFirstContentType || isTemporary
                                }, "link-to-cm-settings-view")
                            })
                        }),
                        /*#__PURE__*/ jsx(Box, {
                            background: "neutral0",
                            shadow: "filterShadow",
                            hasRadius: true,
                            children: /*#__PURE__*/ jsx(List, {
                                items: attributes,
                                customRowComponent: (props)=>/*#__PURE__*/ jsx(ListRow, {
                                        ...props,
                                        onClick: handleClickEditField
                                    }),
                                addComponentToDZ: handleClickAddComponentToDZ,
                                targetUid: targetUid,
                                editTarget: forTarget,
                                isMain: true
                            })
                        })
                    ]
                })
            })
        ]
    });
};

export { ListView as default };
//# sourceMappingURL=ListView.mjs.map
