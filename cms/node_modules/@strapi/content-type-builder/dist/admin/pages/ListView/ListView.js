'use strict';

var jsxRuntime = require('react/jsx-runtime');
var strapiAdmin = require('@strapi/admin/strapi-admin');
var designSystem = require('@strapi/design-system');
var Icons = require('@strapi/icons');
var get = require('lodash/get');
var has = require('lodash/has');
var isEqual = require('lodash/isEqual');
var upperFirst = require('lodash/upperFirst');
var reactIntl = require('react-intl');
var reactRouterDom = require('react-router-dom');
var styledComponents = require('styled-components');
var List = require('../../components/List.js');
var ListRow = require('../../components/ListRow.js');
var useDataManager = require('../../hooks/useDataManager.js');
var useFormModalNavigation = require('../../hooks/useFormModalNavigation.js');
var getAttributeDisplayedType = require('../../utils/getAttributeDisplayedType.js');
var getTrad = require('../../utils/getTrad.js');
var LinkToCMSettingsView = require('./LinkToCMSettingsView.js');

const LayoutsHeaderCustom = styledComponents.styled(strapiAdmin.Layouts.Header)`
  overflow-wrap: anywhere;
`;
const ListView = ()=>{
    const { initialData, modifiedData, isInDevelopmentMode, isInContentTypeView, submitData } = useDataManager.useDataManager();
    const { formatMessage } = reactIntl.useIntl();
    const { trackUsage } = strapiAdmin.useTracking();
    const match = reactRouterDom.useMatch('/plugins/content-type-builder/:kind/:currentUID');
    const { onOpenModalAddComponentsToDZ, onOpenModalAddField, onOpenModalEditField, onOpenModalEditSchema, onOpenModalEditCustomField } = useFormModalNavigation.useFormModalNavigation();
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
        const attributeType = getAttributeDisplayedType.getAttributeDisplayedType(type);
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
            id: getTrad.getTrad('button.model.create'),
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
    reactRouterDom.unstable_usePrompt({
        when: hasModelBeenModified,
        message: formatMessage({
            id: getTrad.getTrad('prompt.unsaved'),
            defaultMessage: 'Are you sure?'
        })
    });
    const primaryAction = isInDevelopmentMode && /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
        gap: 2,
        marginLeft: 2,
        children: [
            !isCreatingFirstContentType && /*#__PURE__*/ jsxRuntime.jsx(designSystem.Button, {
                startIcon: /*#__PURE__*/ jsxRuntime.jsx(Icons.Plus, {}),
                variant: "secondary",
                minWidth: "max-content",
                onClick: ()=>{
                    onOpenModalAddField({
                        forTarget,
                        targetUid
                    });
                },
                children: formatMessage({
                    id: getTrad.getTrad('button.attributes.add.another'),
                    defaultMessage: 'Add another field'
                })
            }),
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Button, {
                startIcon: /*#__PURE__*/ jsxRuntime.jsx(Icons.Check, {}),
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
    const secondaryAction = isInDevelopmentMode && !isFromPlugin && !isCreatingFirstContentType && /*#__PURE__*/ jsxRuntime.jsx(designSystem.Button, {
        startIcon: /*#__PURE__*/ jsxRuntime.jsx(Icons.Pencil, {}),
        variant: "tertiary",
        onClick: onEdit,
        children: formatMessage({
            id: 'app.utils.edit',
            defaultMessage: 'Edit'
        })
    });
    return /*#__PURE__*/ jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
            /*#__PURE__*/ jsxRuntime.jsx(LayoutsHeaderCustom, {
                id: "title",
                primaryAction: primaryAction,
                secondaryAction: secondaryAction,
                title: upperFirst(label),
                subtitle: formatMessage({
                    id: getTrad.getTrad('listView.headerLayout.description'),
                    defaultMessage: 'Build the data architecture of your content'
                }),
                navigationAction: /*#__PURE__*/ jsxRuntime.jsx(strapiAdmin.BackButton, {})
            }),
            /*#__PURE__*/ jsxRuntime.jsx(strapiAdmin.Layouts.Content, {
                children: /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                    direction: "column",
                    alignItems: "stretch",
                    gap: 4,
                    children: [
                        /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
                            justifyContent: "flex-end",
                            children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
                                gap: 2,
                                children: /*#__PURE__*/ jsxRuntime.jsx(LinkToCMSettingsView.LinkToCMSettingsView, {
                                    targetUid: targetUid,
                                    isInContentTypeView: isInContentTypeView,
                                    contentTypeKind: contentTypeKind,
                                    disabled: isCreatingFirstContentType || isTemporary
                                }, "link-to-cm-settings-view")
                            })
                        }),
                        /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                            background: "neutral0",
                            shadow: "filterShadow",
                            hasRadius: true,
                            children: /*#__PURE__*/ jsxRuntime.jsx(List.List, {
                                items: attributes,
                                customRowComponent: (props)=>/*#__PURE__*/ jsxRuntime.jsx(ListRow.ListRow, {
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

module.exports = ListView;
//# sourceMappingURL=ListView.js.map
