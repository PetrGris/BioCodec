'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var strapiAdmin = require('@strapi/admin/strapi-admin');
var get = require('lodash/get');
var groupBy = require('lodash/groupBy');
var set = require('lodash/set');
var size = require('lodash/size');
var reactIntl = require('react-intl');
var reactRedux = require('react-redux');
var reactRouterDom = require('react-router-dom');
var DataManagerContext = require('../../contexts/DataManagerContext.js');
var useFormModalNavigation = require('../../hooks/useFormModalNavigation.js');
var pluginId = require('../../pluginId.js');
var getTrad = require('../../utils/getTrad.js');
var AutoReloadOverlayBlocker = require('../AutoReloadOverlayBlocker.js');
var FormModal = require('../FormModal/FormModal.js');
var reducer = require('./reducer.js');
var selectors = require('./selectors.js');
var cleanData = require('./utils/cleanData.js');
var createDataObject = require('./utils/createDataObject.js');
var createModifiedDataSchema = require('./utils/createModifiedDataSchema.js');
var formatSchemas = require('./utils/formatSchemas.js');
var retrieveComponentsFromSchema = require('./utils/retrieveComponentsFromSchema.js');
var retrieveComponentsThatHaveComponents = require('./utils/retrieveComponentsThatHaveComponents.js');
var retrieveNestedComponents = require('./utils/retrieveNestedComponents.js');
var retrieveSpecificInfoFromComponents = require('./utils/retrieveSpecificInfoFromComponents.js');
var serverRestartWatcher = require('./utils/serverRestartWatcher.js');
var validateSchema = require('./utils/validateSchema.js');

const DataManagerProvider = ({ children })=>{
    const dispatch = reactRedux.useDispatch();
    // refactor
    const { components, contentTypes, isLoading, initialData, modifiedData, reservedNames } = reactRedux.useSelector(selectors.makeSelectDataManagerProvider());
    const { toggleNotification } = strapiAdmin.useNotification();
    const { lockAppWithAutoreload, unlockAppWithAutoreload } = AutoReloadOverlayBlocker.useAutoReloadOverlayBlocker();
    const { setCurrentStep, setStepState } = strapiAdmin.useGuidedTour('DataManagerProvider', (state)=>state);
    const getPlugin = strapiAdmin.useStrapiApp('DataManagerProvider', (state)=>state.getPlugin);
    const plugin = getPlugin(pluginId.pluginId);
    const autoReload = strapiAdmin.useAppInfo('DataManagerProvider', (state)=>state.autoReload);
    const { formatMessage } = reactIntl.useIntl();
    const { trackUsage } = strapiAdmin.useTracking();
    const refetchPermissions = strapiAdmin.useAuth('DataManagerProvider', (state)=>state.refetchPermissions);
    const { pathname } = reactRouterDom.useLocation();
    const { onCloseModal } = useFormModalNavigation.useFormModalNavigation();
    const contentTypeMatch = reactRouterDom.useMatch(`/plugins/${pluginId.pluginId}/content-types/:uid`);
    const componentMatch = reactRouterDom.useMatch(`/plugins/${pluginId.pluginId}/component-categories/:categoryUid/:componentUid`);
    const fetchClient = strapiAdmin.useFetchClient();
    const { put, post, del } = fetchClient;
    const isInDevelopmentMode = autoReload;
    const isInContentTypeView = contentTypeMatch !== null;
    const firstKeyToMainSchema = isInContentTypeView ? 'contentType' : 'component';
    const currentUid = isInContentTypeView ? get(contentTypeMatch, 'params.uid', null) : get(componentMatch, 'params.componentUid', null);
    const getDataRef = React.useRef();
    const endPoint = isInContentTypeView ? 'content-types' : 'components';
    getDataRef.current = async ()=>{
        try {
            const [componentsResponse, contentTypesResponse, reservedNamesResponse] = await Promise.all([
                fetchClient.get(`/content-type-builder/components`),
                fetchClient.get(`/content-type-builder/content-types`),
                fetchClient.get(`/content-type-builder/reserved-names`)
            ]);
            const components = createDataObject.createDataObject(componentsResponse.data.data);
            const formattedComponents = formatSchemas.formatSchemas(components);
            const contentTypes = createDataObject.createDataObject(contentTypesResponse.data.data);
            const formattedContentTypes = formatSchemas.formatSchemas(contentTypes);
            dispatch(reducer.actions.init({
                components: formattedComponents,
                contentTypes: formattedContentTypes,
                reservedNames: reservedNamesResponse.data
            }));
        } catch (err) {
            console.error({
                err
            });
            toggleNotification({
                type: 'danger',
                message: formatMessage({
                    id: 'notification.error',
                    defaultMessage: 'An error occurred'
                })
            });
        }
    };
    React.useEffect(()=>{
        getDataRef.current();
        return ()=>{
            // Reload the plugin so the cycle is new again
            dispatch(reducer.actions.reloadPlugin());
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(()=>{
        // We need to set the modifiedData after the data has been retrieved
        // and also on pathname change
        if (!isLoading && currentUid) {
            setModifiedData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isLoading,
        pathname,
        currentUid
    ]);
    React.useEffect(()=>{
        if (!autoReload) {
            toggleNotification({
                type: 'info',
                message: formatMessage({
                    id: getTrad.getTrad('notification.info.autoreaload-disable')
                })
            });
        }
    }, [
        autoReload,
        toggleNotification,
        formatMessage
    ]);
    const addAttribute = (attributeToSet, forTarget, targetUid, isEditing = false, initialAttribute, shouldAddComponentToData = false)=>{
        if (isEditing) {
            const payload = {
                attributeToSet,
                forTarget,
                targetUid,
                // NOTE: using ! here to avoid changing the code logic before bigger refactorings
                initialAttribute: initialAttribute,
                shouldAddComponentToData
            };
            dispatch(reducer.actions.editAttribute(payload));
        } else {
            const payload = {
                attributeToSet,
                forTarget,
                targetUid,
                shouldAddComponentToData
            };
            dispatch(reducer.actions.addAttribute(payload));
        }
    };
    const addCustomFieldAttribute = ({ attributeToSet, forTarget, targetUid })=>{
        dispatch(reducer.actions.addCustomFieldAttribute({
            attributeToSet,
            forTarget,
            targetUid
        }));
    };
    const editCustomFieldAttribute = ({ attributeToSet, forTarget, targetUid, initialAttribute })=>{
        dispatch(reducer.actions.editCustomFieldAttribute({
            attributeToSet,
            forTarget,
            targetUid,
            initialAttribute
        }));
    };
    const addCreatedComponentToDynamicZone = (dynamicZoneTarget, componentsToAdd)=>{
        dispatch(reducer.actions.addCreatedComponentToDynamicZone({
            dynamicZoneTarget,
            componentsToAdd
        }));
    };
    const createSchema = (data, schemaType, uid, componentCategory, shouldAddComponentToData = false)=>{
        if (schemaType === 'contentType') {
            const payload = {
                data,
                uid
            };
            dispatch(reducer.actions.createSchema(payload));
        } else {
            const payload = {
                data,
                uid,
                componentCategory: componentCategory,
                shouldAddComponentToData
            };
            dispatch(reducer.actions.createComponentSchema(payload));
        }
    };
    const changeDynamicZoneComponents = (dynamicZoneTarget, newComponents)=>{
        dispatch(reducer.actions.changeDynamicZoneComponents({
            dynamicZoneTarget,
            newComponents
        }));
    };
    const removeAttribute = (mainDataKey, attributeToRemoveName, componentUid = '')=>{
        if (mainDataKey === 'components') {
            dispatch(reducer.actions.removeFieldFromDisplayedComponent({
                attributeToRemoveName,
                componentUid
            }));
        } else {
            if (mainDataKey === 'contentType') {
                trackUsage('willDeleteFieldOfContentType');
            }
            dispatch(reducer.actions.removeField({
                mainDataKey,
                attributeToRemoveName
            }));
        }
    };
    const deleteCategory = async (categoryUid)=>{
        try {
            const requestURL = `/${pluginId.pluginId}/component-categories/${categoryUid}`;
            // eslint-disable-next-line no-alert
            const userConfirm = window.confirm(formatMessage({
                id: getTrad.getTrad('popUpWarning.bodyMessage.category.delete')
            }));
            // Close the modal
            onCloseModal();
            if (userConfirm) {
                lockAppWithAutoreload?.();
                await del(requestURL);
                // Make sure the server has restarted
                await serverRestartWatcher.serverRestartWatcher(true);
                // Unlock the app
                unlockAppWithAutoreload?.();
                await updatePermissions();
            }
        } catch (err) {
            console.error({
                err
            });
            toggleNotification({
                type: 'danger',
                message: formatMessage({
                    id: 'notification.error',
                    defaultMessage: 'An error occurred'
                })
            });
        } finally{
            unlockAppWithAutoreload?.();
        }
    };
    const deleteData = async ()=>{
        try {
            const requestURL = `/${pluginId.pluginId}/${endPoint}/${currentUid}`;
            const isTemporary = get(modifiedData, [
                firstKeyToMainSchema,
                'isTemporary'
            ], false);
            // eslint-disable-next-line no-alert
            const userConfirm = window.confirm(formatMessage({
                id: getTrad.getTrad(`popUpWarning.bodyMessage.${isInContentTypeView ? 'contentType' : 'component'}.delete`)
            }));
            // Close the modal
            onCloseModal();
            if (userConfirm) {
                if (isTemporary) {
                    // Delete the not saved type
                    // Here we just need to reset the components to the initial ones and also the content types
                    // Doing so will trigging a url change since the type doesn't exist in either the contentTypes or the components
                    // so the modified and the initial data will also be reset in the useEffect...
                    dispatch(reducer.actions.deleteNotSavedType());
                    return;
                }
                lockAppWithAutoreload?.();
                await del(requestURL);
                // Make sure the server has restarted
                await serverRestartWatcher.serverRestartWatcher(true);
                // Unlock the app
                await unlockAppWithAutoreload?.();
                await getDataRef.current();
                // Refetch the permissions
                await updatePermissions();
            }
        } catch (err) {
            console.error({
                err
            });
            toggleNotification({
                type: 'danger',
                message: formatMessage({
                    id: 'notification.error',
                    defaultMessage: 'An error occurred'
                })
            });
        } finally{
            unlockAppWithAutoreload?.();
        }
    };
    const editCategory = async (categoryUid, body)=>{
        try {
            const requestURL = `/${pluginId.pluginId}/component-categories/${categoryUid}`;
            // Close the modal
            onCloseModal();
            // Lock the app
            lockAppWithAutoreload?.();
            // Update the category
            await put(requestURL, body);
            // Make sure the server has restarted
            await serverRestartWatcher.serverRestartWatcher(true);
            // Unlock the app
            await unlockAppWithAutoreload?.();
            await updatePermissions();
        } catch (err) {
            console.error({
                err
            });
            toggleNotification({
                type: 'danger',
                message: formatMessage({
                    id: 'notification.error',
                    defaultMessage: 'An error occurred'
                })
            });
        } finally{
            unlockAppWithAutoreload?.();
        }
    };
    const getAllComponentsThatHaveAComponentInTheirAttributes = ()=>{
        // We need to create an object with all the non modified compos
        // plus the ones that are created on the fly
        const allCompos = Object.assign({}, components, modifiedData.components);
        // Since we apply the modification of a specific component only in the modified data
        // we need to update all compos with the modifications
        if (!isInContentTypeView) {
            const currentEditedCompo = get(modifiedData, 'component', {});
            set(allCompos, get(currentEditedCompo, [
                'uid'
            ], ''), currentEditedCompo);
        }
        const composWithCompos = retrieveComponentsThatHaveComponents.retrieveComponentsThatHaveComponents(allCompos);
        return composWithCompos;
    };
    const getAllNestedComponents = ()=>{
        const appNestedCompo = retrieveNestedComponents.retrieveNestedComponents(components);
        return appNestedCompo;
    };
    const removeComponentFromDynamicZone = (dzName, componentToRemoveIndex)=>{
        dispatch(reducer.actions.removeComponentFromDynamicZone({
            dzName,
            componentToRemoveIndex
        }));
    };
    const setModifiedData = ()=>{
        const currentSchemas = isInContentTypeView ? contentTypes : components;
        const schemaToSet = get(currentSchemas, currentUid ?? '', {
            schema: {
                attributes: []
            }
        });
        const retrievedComponents = retrieveComponentsFromSchema.retrieveComponentsFromSchema(schemaToSet.schema.attributes, components);
        const newSchemaToSet = createModifiedDataSchema.createModifiedDataSchema(schemaToSet, retrievedComponents, components, isInContentTypeView);
        const hasJustCreatedSchema = get(schemaToSet, 'isTemporary', false) && size(get(schemaToSet, 'schema.attributes', [])) === 0;
        dispatch(reducer.actions.setModifiedData({
            schemaToSet: newSchemaToSet,
            hasJustCreatedSchema
        }));
    };
    const shouldRedirect = React.useMemo(()=>{
        const dataSet = isInContentTypeView ? contentTypes : components;
        if (currentUid === 'create-content-type') {
            return false;
        }
        return !Object.keys(dataSet).includes(currentUid || '') && !isLoading;
    }, [
        components,
        contentTypes,
        currentUid,
        isInContentTypeView,
        isLoading
    ]);
    const redirectEndpoint = React.useMemo(()=>{
        const allowedEndpoints = Object.keys(contentTypes).filter((uid)=>get(contentTypes, [
                uid,
                'schema',
                'visible'
            ], true)).sort();
        return get(allowedEndpoints, '0', 'create-content-type');
    }, [
        contentTypes
    ]);
    if (shouldRedirect) {
        return /*#__PURE__*/ jsxRuntime.jsx(reactRouterDom.Navigate, {
            to: `/plugins/${pluginId.pluginId}/content-types/${redirectEndpoint}`
        });
    }
    const submitData = async (additionalContentTypeData)=>{
        try {
            const isCreating = get(modifiedData, [
                firstKeyToMainSchema,
                'isTemporary'
            ], false);
            const body = {
                components: cleanData.getComponentsToPost(modifiedData.components, components, currentUid)
            };
            if (isInContentTypeView) {
                const PluginForms = plugin?.apis?.forms;
                const contentType = PluginForms.mutateContentTypeSchema({
                    ...cleanData.formatMainDataType(modifiedData.contentType),
                    ...additionalContentTypeData
                }, initialData.contentType);
                const isValidSchema = validateSchema.validateSchema(contentType);
                if (!isValidSchema) {
                    toggleNotification({
                        type: 'danger',
                        message: formatMessage({
                            id: getTrad.getTrad('notification.error.dynamiczone-min.validation'),
                            defaultMessage: 'At least one component is required in a dynamic zone to be able to save a content type'
                        })
                    });
                    return;
                }
                body.contentType = contentType;
                trackUsage('willSaveContentType');
            } else {
                body.component = cleanData.formatMainDataType(modifiedData.component, true);
                trackUsage('willSaveComponent');
            }
            // Lock the app
            lockAppWithAutoreload?.();
            const baseURL = `/${pluginId.pluginId}/${endPoint}`;
            const requestURL = isCreating ? baseURL : `${baseURL}/${currentUid}`;
            if (isCreating) {
                await post(requestURL, body);
            } else {
                await put(requestURL, body);
            }
            if (isCreating && (initialData.contentType?.schema.kind === 'collectionType' || initialData.contentType?.schema.kind === 'singleType')) {
                setStepState('contentTypeBuilder.success', true);
                trackUsage('didCreateGuidedTourCollectionType');
                setCurrentStep(null);
            }
            // Submit ct tracking success
            if (isInContentTypeView) {
                trackUsage('didSaveContentType');
                const oldName = get(body, [
                    'contentType',
                    'schema',
                    'name'
                ], '');
                const newName = get(initialData, [
                    'contentType',
                    'schema',
                    'name'
                ], '');
                if (!isCreating && oldName !== newName) {
                    trackUsage('didEditNameOfContentType');
                }
            } else {
                trackUsage('didSaveComponent');
            }
            // Make sure the server has restarted
            await serverRestartWatcher.serverRestartWatcher(true);
            // Unlock the app
            unlockAppWithAutoreload?.();
            // refetch and update initial state after the data has been saved
            await getDataRef.current();
            // Update the app's permissions
            await updatePermissions();
        } catch (err) {
            if (!isInContentTypeView) {
                trackUsage('didNotSaveComponent');
            }
            console.error({
                err: err.response
            });
            toggleNotification({
                type: 'danger',
                message: formatMessage({
                    id: 'notification.error',
                    defaultMessage: 'An error occurred'
                })
            });
        } finally{
            unlockAppWithAutoreload?.();
        }
    };
    const updatePermissions = async ()=>{
        await refetchPermissions();
    };
    const updateSchema = (data, schemaType, componentUID)=>{
        dispatch(reducer.actions.updateSchema({
            data,
            schemaType,
            uid: componentUID
        }));
    };
    return /*#__PURE__*/ jsxRuntime.jsxs(DataManagerContext.DataManagerContext.Provider, {
        value: {
            addAttribute,
            addCustomFieldAttribute,
            addCreatedComponentToDynamicZone,
            allComponentsCategories: retrieveSpecificInfoFromComponents.retrieveSpecificInfoFromComponents(components, [
                'category'
            ]),
            changeDynamicZoneComponents,
            components,
            componentsGroupedByCategory: groupBy(components, 'category'),
            componentsThatHaveOtherComponentInTheirAttributes: getAllComponentsThatHaveAComponentInTheirAttributes(),
            contentTypes,
            createSchema,
            deleteCategory,
            deleteData,
            editCategory,
            editCustomFieldAttribute,
            isInDevelopmentMode,
            initialData,
            isInContentTypeView,
            modifiedData,
            nestedComponents: getAllNestedComponents(),
            removeAttribute,
            removeComponentFromDynamicZone,
            reservedNames,
            setModifiedData,
            sortedContentTypesList: cleanData.sortContentType(contentTypes),
            submitData,
            updateSchema
        },
        children: [
            children,
            isInDevelopmentMode && /*#__PURE__*/ jsxRuntime.jsx(FormModal.FormModal, {})
        ]
    });
};
// eslint-disable-next-line import/no-default-export
var DataManagerProvider$1 = /*#__PURE__*/ React.memo(DataManagerProvider);

module.exports = DataManagerProvider$1;
//# sourceMappingURL=DataManagerProvider.js.map
