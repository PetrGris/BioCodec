'use strict';

var toolkit = require('@reduxjs/toolkit');
var immer = require('immer');
var get = require('lodash/get');
var set = require('lodash/set');
var getRelationType = require('../../utils/getRelationType.js');
var makeUnique = require('../../utils/makeUnique.js');
var retrieveComponentsFromSchema = require('./utils/retrieveComponentsFromSchema.js');

const DEFAULT_MODIFIED_DATA = {
    components: {},
    contentTypes: {}
};
const initialState = {
    components: {},
    contentTypes: {},
    initialComponents: {},
    initialContentTypes: {},
    initialData: {},
    modifiedData: {
        ...DEFAULT_MODIFIED_DATA
    },
    reservedNames: {},
    isLoading: true
};
const ONE_SIDE_RELATIONS = [
    'oneWay',
    'manyWay'
];
const getOppositeRelation = (originalRelation)=>{
    if (originalRelation === 'manyToOne') {
        return 'oneToMany';
    }
    if (originalRelation === 'oneToMany') {
        return 'manyToOne';
    }
    return originalRelation;
};
const findAttributeIndex = (schema, attributeToFind)=>{
    return schema.schema.attributes.findIndex(({ name })=>name === attributeToFind);
};
const slice = toolkit.createSlice({
    name: 'data-manager',
    initialState,
    reducers: {
        init: (state, action)=>{
            const { components, contentTypes, reservedNames } = action.payload;
            state.components = components;
            state.initialComponents = components;
            state.initialContentTypes = contentTypes;
            state.contentTypes = contentTypes;
            state.reservedNames = reservedNames;
            state.isLoading = false;
            state.modifiedData = {
                ...DEFAULT_MODIFIED_DATA,
                component: state.modifiedData.component ? components[state.modifiedData.component.uid] : undefined,
                contentType: state.modifiedData.contentType ? contentTypes[state.modifiedData.contentType.uid] : undefined,
                components: state.modifiedData.components ? Object.keys(state.modifiedData.components).reduce((acc, key)=>{
                    acc[key] = components[key];
                    return acc;
                }, {}) : {},
                contentTypes: state.modifiedData.contentTypes ? Object.keys(state.modifiedData.contentTypes).reduce((acc, key)=>{
                    acc[key] = contentTypes[key];
                    return acc;
                }, {}) : {}
            };
            state.initialData = state.modifiedData;
        },
        addAttribute: (state, action)=>{
            const { attributeToSet, forTarget, targetUid, shouldAddComponentToData } = action.payload;
            const { name, ...rest } = attributeToSet;
            delete rest.createComponent;
            const pathToDataToEdit = [
                'component',
                'contentType'
            ].includes(forTarget) ? [
                forTarget
            ] : [
                forTarget,
                targetUid
            ];
            const currentAttributes = get(state, [
                'modifiedData',
                ...pathToDataToEdit,
                'schema',
                'attributes'
            ], []).slice();
            // Add the createdAttribute
            const updatedAttributes = [
                ...currentAttributes,
                {
                    ...rest,
                    name
                }
            ];
            set(state, [
                'modifiedData',
                ...pathToDataToEdit,
                'schema',
                'attributes'
            ], updatedAttributes);
            if (shouldAddComponentToData) {
                const componentToAddUID = rest.component;
                const componentToAdd = state.components[componentToAddUID];
                const isTemporaryComponent = componentToAdd?.isTemporary;
                const hasComponentAlreadyBeenAdded = state.modifiedData.components?.[componentToAddUID] !== undefined;
                if (isTemporaryComponent || hasComponentAlreadyBeenAdded) {
                    return;
                }
                // Initialize modifiedData.components if it is undefined
                if (!state.modifiedData.components) {
                    state.modifiedData.components = {};
                }
                // Add the added component to the modifiedData.components
                state.modifiedData.components[componentToAddUID] = componentToAdd;
                const nestedComponents = retrieveComponentsFromSchema.retrieveComponentsFromSchema(componentToAdd.schema.attributes, state.components);
                // We dont' need to set the already added components otherwise all modifications will be lost so we need to only add the not modified ones
                const nestedComponentsToAddInModifiedData = nestedComponents.filter((compoUID)=>{
                    return get(state, [
                        'modifiedData',
                        'components',
                        compoUID
                    ]) === undefined;
                });
                nestedComponentsToAddInModifiedData.forEach((compoUID)=>{
                    const compoSchema = get(state, [
                        'components',
                        compoUID
                    ], {});
                    const isTemporary = compoSchema.isTemporary || false;
                    // If the nested component has not been saved we don't need to add them as they are already in the state
                    if (!isTemporary) {
                        if (!state.modifiedData.components) {
                            state.modifiedData.components = {};
                        }
                        state.modifiedData.components[compoUID] = compoSchema;
                    }
                });
                return;
            }
            const isCreatingRelationAttribute = rest.type === 'relation';
            if (isCreatingRelationAttribute) {
                const target = rest.target;
                const targetAttribute = rest.targetAttribute || null;
                const relation = rest.relation;
                const relationType = getRelationType.getRelationType(relation, targetAttribute);
                const currentUid = get(state, [
                    'modifiedData',
                    ...pathToDataToEdit,
                    'uid'
                ]);
                // When the user in creating a relation with the same content type we need to create another attribute
                // that is the opposite of the created one
                if (rest.type === 'relation' && relationType !== 'oneWay' && relationType !== 'manyWay' && target === currentUid) {
                    const oppositeAttribute = {
                        name: targetAttribute,
                        relation: getOppositeRelation(relationType),
                        target,
                        targetAttribute: name,
                        type: 'relation'
                    };
                    if (rest.private) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        oppositeAttribute.private = rest.private;
                    }
                    const attributesToSet = [
                        ...updatedAttributes,
                        oppositeAttribute
                    ];
                    set(state, [
                        'modifiedData',
                        ...pathToDataToEdit,
                        'schema',
                        'attributes'
                    ], attributesToSet);
                }
            }
        },
        addCreatedComponentToDynamicZone: (state, action)=>{
            const { dynamicZoneTarget, componentsToAdd } = action.payload;
            const dzAttributeIndex = findAttributeIndex(state.modifiedData.contentType, dynamicZoneTarget);
            componentsToAdd.forEach((componentUid)=>{
                if (!state.modifiedData.contentType) {
                    return;
                }
                if (!state.modifiedData.contentType.schema.attributes[dzAttributeIndex].components) {
                    state.modifiedData.contentType.schema.attributes[dzAttributeIndex].components = [];
                }
                state.modifiedData.contentType.schema.attributes[dzAttributeIndex].components.push(componentUid);
            });
        },
        addCustomFieldAttribute: (state, action)=>{
            const { attributeToSet, forTarget, targetUid } = action.payload;
            const { name, ...rest } = attributeToSet;
            const pathToDataToEdit = [
                'component',
                'contentType'
            ].includes(forTarget) ? [
                forTarget
            ] : [
                forTarget,
                targetUid
            ];
            const currentAttributes = get(state, [
                'modifiedData',
                ...pathToDataToEdit,
                'schema',
                'attributes'
            ], []).slice();
            // Add the createdAttribute
            const updatedAttributes = [
                ...currentAttributes,
                {
                    ...rest,
                    name
                }
            ];
            set(state, [
                'modifiedData',
                ...pathToDataToEdit,
                'schema',
                'attributes'
            ], updatedAttributes);
        },
        changeDynamicZoneComponents: (state, action)=>{
            const { dynamicZoneTarget, newComponents } = action.payload;
            const dzAttributeIndex = findAttributeIndex(state.modifiedData.contentType, dynamicZoneTarget);
            const currentDZComponents = (state.modifiedData.contentType?.schema.attributes[dzAttributeIndex]).components;
            const updatedComponents = makeUnique.makeUnique([
                ...currentDZComponents,
                ...newComponents
            ]);
            (state.modifiedData.contentType?.schema.attributes[dzAttributeIndex]).components = updatedComponents;
            // Retrieve all the components that needs to be added to the modifiedData.components
            const nestedComponents = retrieveComponentsFromSchema.retrieveComponentsFromSchema(immer.current(state.modifiedData.contentType?.schema.attributes), state.components);
            // We dont' need to set the already added components otherwise all modifications will be lost so we need to only add the not modified ones
            const nestedComponentsToAddInModifiedData = nestedComponents.filter((compoUID)=>{
                return get(state, [
                    'modifiedData',
                    'components',
                    compoUID
                ]) === undefined;
            });
            nestedComponentsToAddInModifiedData.forEach((compoUID)=>{
                const compoSchema = get(state, [
                    'components',
                    compoUID
                ], {});
                const isTemporary = compoSchema.isTemporary || false;
                // If the nested component has not been saved we don't need to add them as they are already in the state
                if (!isTemporary) {
                    if (!state.modifiedData.components) {
                        state.modifiedData.components = {};
                    }
                    state.modifiedData.components[compoUID] = compoSchema;
                }
            });
        },
        createComponentSchema: (state, action)=>{
            const { uid, data, componentCategory, shouldAddComponentToData } = action.payload;
            const newSchema = {
                uid: uid,
                isTemporary: true,
                category: componentCategory,
                schema: {
                    ...data,
                    attributes: []
                }
            };
            state.components[uid] = newSchema;
            if (shouldAddComponentToData) {
                state.modifiedData.components[uid] = newSchema;
            }
        },
        createSchema: (state, action)=>{
            const { uid, data } = action.payload;
            const newSchema = {
                uid: uid,
                isTemporary: true,
                schema: {
                    ...data,
                    attributes: []
                }
            };
            state.contentTypes[uid] = newSchema;
        },
        editAttribute: (state, action)=>{
            const { attributeToSet, forTarget, targetUid, initialAttribute } = action.payload;
            const { name, ...rest } = attributeToSet;
            const initialAttributeName = initialAttribute.name;
            const pathToDataToEdit = [
                'component',
                'contentType'
            ].includes(forTarget) ? [
                forTarget
            ] : [
                forTarget,
                targetUid
            ];
            const initialAttributeIndex = findAttributeIndex(get(state, [
                'modifiedData',
                ...pathToDataToEdit
            ]), initialAttributeName);
            const isEditingRelation = rest.type === 'relation';
            if (!isEditingRelation) {
                set(state, [
                    'modifiedData',
                    ...pathToDataToEdit,
                    'schema',
                    'attributes',
                    initialAttributeIndex
                ], attributeToSet);
                return;
            }
            const updatedAttributes = get(state, [
                'modifiedData',
                ...pathToDataToEdit,
                'schema',
                'attributes'
            ]).slice();
            // First create the current relation attribute updated
            const toSet = {
                name,
                relation: rest.relation,
                target: rest.target,
                targetAttribute: rest.targetAttribute,
                type: 'relation'
            };
            if (rest.private) {
                toSet.private = rest.private;
            }
            if (rest.pluginOptions) {
                toSet.pluginOptions = rest.pluginOptions;
            }
            const currentAttributeIndex = updatedAttributes.findIndex((value)=>{
                return value.name !== undefined && value.name === initialAttribute.name;
            });
            // First set it in the updatedAttributes
            if (currentAttributeIndex !== -1) {
                updatedAttributes.splice(currentAttributeIndex, 1, toSet);
            }
            let oppositeAttributeNameToRemove = null;
            let oppositeAttributeNameToUpdate = null;
            let oppositeAttributeToCreate = null;
            let initialOppositeAttribute = null;
            const currentUid = get(state, [
                'modifiedData',
                ...pathToDataToEdit,
                'uid'
            ]);
            const didChangeTargetRelation = initialAttribute.target !== rest.target;
            const didCreateInternalRelation = rest.target === currentUid;
            const relationType = getRelationType.getRelationType(rest.relation, rest.targetAttribute);
            const initialRelationType = getRelationType.getRelationType(initialAttribute.relation, initialAttribute.targetAttribute);
            const hadInternalRelation = initialAttribute.target === currentUid;
            const didChangeRelationType = initialRelationType !== relationType;
            const shouldRemoveOppositeAttributeBecauseOfTargetChange = didChangeTargetRelation && !didCreateInternalRelation && hadInternalRelation && isEditingRelation;
            const shouldRemoveOppositeAttributeBecauseOfRelationTypeChange = didChangeRelationType && hadInternalRelation && [
                'oneWay',
                'manyWay'
            ].includes(relationType) && isEditingRelation;
            const shouldUpdateOppositeAttributeBecauseOfRelationTypeChange = !ONE_SIDE_RELATIONS.includes(initialRelationType) && !ONE_SIDE_RELATIONS.includes(relationType) && hadInternalRelation && didCreateInternalRelation && isEditingRelation;
            const shouldCreateOppositeAttributeBecauseOfRelationTypeChange = ONE_SIDE_RELATIONS.includes(initialRelationType) && !ONE_SIDE_RELATIONS.includes(relationType) && hadInternalRelation && didCreateInternalRelation && isEditingRelation;
            const shouldCreateOppositeAttributeBecauseOfTargetChange = didChangeTargetRelation && didCreateInternalRelation && !ONE_SIDE_RELATIONS.includes(relationType);
            // Store opposite attribute name to remove at the end of the loop
            if (shouldRemoveOppositeAttributeBecauseOfTargetChange || shouldRemoveOppositeAttributeBecauseOfRelationTypeChange) {
                oppositeAttributeNameToRemove = initialAttribute.targetAttribute;
            }
            // In case of oneWay or manyWay relation there isn't an opposite attribute
            if (oppositeAttributeNameToRemove) {
                const indexToRemove = updatedAttributes.findIndex((value)=>value.name === oppositeAttributeNameToRemove);
                updatedAttributes.splice(indexToRemove, 1);
            }
            // In order to preserve plugin options need to get the initial opposite attribute settings
            if (!shouldRemoveOppositeAttributeBecauseOfTargetChange) {
                const initialTargetContentType = get(state, [
                    'initialContentTypes',
                    initialAttribute.target
                ]);
                if (initialTargetContentType) {
                    const oppositeAttributeIndex = findAttributeIndex(initialTargetContentType, initialAttribute.targetAttribute);
                    initialOppositeAttribute = get(state, [
                        'initialContentTypes',
                        initialAttribute.target,
                        'schema',
                        'attributes',
                        oppositeAttributeIndex
                    ]);
                }
            }
            // Create the opposite attribute
            if (shouldCreateOppositeAttributeBecauseOfRelationTypeChange || shouldCreateOppositeAttributeBecauseOfTargetChange) {
                oppositeAttributeToCreate = {
                    name: rest.targetAttribute,
                    relation: getOppositeRelation(relationType),
                    target: rest.target,
                    targetAttribute: name,
                    type: 'relation'
                };
                if (rest.private) {
                    oppositeAttributeToCreate.private = rest.private;
                }
                if (initialOppositeAttribute && initialOppositeAttribute.pluginOptions) {
                    oppositeAttributeToCreate.pluginOptions = initialOppositeAttribute.pluginOptions;
                }
                const indexOfInitialAttribute = updatedAttributes.findIndex(({ name })=>name === initialAttribute.name);
                const indexOfUpdatedAttribute = updatedAttributes.findIndex(({ name: attrName })=>name === attrName);
                const indexToInsert = (indexOfInitialAttribute === -1 ? indexOfUpdatedAttribute : indexOfInitialAttribute) + 1;
                updatedAttributes.splice(indexToInsert, 0, oppositeAttributeToCreate);
            }
            if (shouldUpdateOppositeAttributeBecauseOfRelationTypeChange) {
                oppositeAttributeNameToUpdate = initialAttribute.targetAttribute;
                oppositeAttributeToCreate = {
                    name: rest.targetAttribute,
                    relation: getOppositeRelation(relationType),
                    target: rest.target,
                    targetAttribute: name,
                    type: 'relation'
                };
                if (rest.private) {
                    oppositeAttributeToCreate.private = rest.private;
                }
                if (initialOppositeAttribute && initialOppositeAttribute.pluginOptions) {
                    oppositeAttributeToCreate.pluginOptions = initialOppositeAttribute.pluginOptions;
                }
                if (oppositeAttributeNameToUpdate) {
                    const indexToUpdate = updatedAttributes.findIndex(({ name })=>name === oppositeAttributeNameToUpdate);
                    updatedAttributes.splice(indexToUpdate, 1, oppositeAttributeToCreate);
                }
            }
            set(state, [
                'modifiedData',
                ...pathToDataToEdit,
                'schema',
                'attributes'
            ], updatedAttributes);
        },
        editCustomFieldAttribute: (state, action)=>{
            const { forTarget, targetUid, initialAttribute, attributeToSet } = action.payload;
            const initialAttributeName = initialAttribute.name;
            const pathToDataToEdit = [
                'component',
                'contentType'
            ].includes(forTarget) ? [
                forTarget
            ] : [
                forTarget,
                targetUid
            ];
            const initialAttributeIndex = findAttributeIndex(get(state, [
                'modifiedData',
                ...pathToDataToEdit
            ]), initialAttributeName);
            set(state, [
                'modifiedData',
                ...pathToDataToEdit,
                'schema',
                'attributes',
                initialAttributeIndex
            ], attributeToSet);
        },
        updateInitialState: (state)=>{
            state.initialData = state.modifiedData;
        },
        deleteNotSavedType: (state)=>{
            // Doing so will also reset the modified and the initial data
            state.contentTypes = state.initialContentTypes;
            state.components = state.initialComponents;
        },
        reloadPlugin: ()=>{
            return initialState;
        },
        removeComponentFromDynamicZone: (state, action)=>{
            const { dzName, componentToRemoveIndex } = action.payload;
            const dzAttributeIndex = findAttributeIndex(state.modifiedData.contentType, dzName);
            if (state.modifiedData.contentType) {
                state.modifiedData.contentType.schema.attributes[dzAttributeIndex].components.splice(componentToRemoveIndex, 1);
            }
        },
        removeField: (state, action)=>{
            const { mainDataKey, attributeToRemoveName } = action.payload;
            const pathToAttributes = [
                'modifiedData',
                mainDataKey,
                'schema',
                'attributes'
            ];
            const attributeToRemoveIndex = findAttributeIndex(state.modifiedData[mainDataKey], attributeToRemoveName);
            const pathToAttributeToRemove = [
                ...pathToAttributes,
                attributeToRemoveIndex
            ];
            const attributeToRemoveData = get(state, pathToAttributeToRemove);
            const isRemovingRelationAttribute = attributeToRemoveData.type === 'relation';
            // Only content types can have relations with themselves since
            // components can only have oneWay or manyWay relations
            const canTheAttributeToRemoveHaveARelationWithItself = mainDataKey === 'contentType';
            if (isRemovingRelationAttribute && canTheAttributeToRemoveHaveARelationWithItself) {
                const { target, relation, targetAttribute } = attributeToRemoveData;
                const relationType = getRelationType.getRelationType(relation, targetAttribute);
                const uid = state.modifiedData.contentType?.uid;
                const shouldRemoveOppositeAttribute = target === uid && !ONE_SIDE_RELATIONS.includes(relationType);
                if (shouldRemoveOppositeAttribute) {
                    const attributes = state.modifiedData[mainDataKey]?.schema.attributes.slice();
                    const nextAttributes = attributes.filter((attribute)=>{
                        if (attribute.name === attributeToRemoveName) {
                            return false;
                        }
                        if (attribute.target === uid && attribute.targetAttribute === attributeToRemoveName) {
                            return false;
                        }
                        return true;
                    });
                    const schema = state.modifiedData[mainDataKey];
                    if (schema) {
                        schema.schema.attributes = nextAttributes;
                    }
                    return;
                }
            }
            // Find all uid fields that have the targetField set to the field we are removing
            const uidFieldsToUpdate = state.modifiedData[mainDataKey].schema.attributes.slice().reduce((acc, current)=>{
                if (current.type !== 'uid') {
                    return acc;
                }
                if (current.targetField !== attributeToRemoveName) {
                    return acc;
                }
                acc.push(current.name);
                return acc;
            }, []);
            uidFieldsToUpdate.forEach((fieldName)=>{
                const fieldIndex = findAttributeIndex(state.modifiedData[mainDataKey], fieldName);
                delete state.modifiedData[mainDataKey]?.schema.attributes[fieldIndex].targetField;
            });
            state.modifiedData[mainDataKey]?.schema.attributes.splice(attributeToRemoveIndex, 1);
        },
        removeFieldFromDisplayedComponent: (state, action)=>{
            const { attributeToRemoveName, componentUid } = action.payload;
            const attributeToRemoveIndex = findAttributeIndex(state.modifiedData.components?.[componentUid], attributeToRemoveName);
            state.modifiedData.components?.[componentUid]?.schema?.attributes?.splice(attributeToRemoveIndex, 1);
        },
        setModifiedData: (state, action)=>{
            const { schemaToSet, hasJustCreatedSchema } = action.payload;
            const schema = {
                ...DEFAULT_MODIFIED_DATA,
                ...schemaToSet
            };
            state.initialData = schema;
            state.modifiedData = schema;
            // Reset the state with the initial data
            // All created components and content types will be lost
            if (!hasJustCreatedSchema) {
                state.components = state.initialComponents;
                state.contentTypes = state.initialContentTypes;
            }
        },
        updateSchema: (state, action)=>{
            const { data, schemaType } = action.payload;
            const schema = state.modifiedData[schemaType];
            if (!schema) {
                return;
            }
            schema.schema.displayName = data.displayName;
            if (schemaType === 'component') {
                const { uid } = action.payload;
                schema.category = data.category;
                schema.schema.icon = data.icon;
                const addedComponent = immer.current(schema);
                state.components[uid] = addedComponent;
            } else {
                schema.schema.kind = data.kind;
            }
        }
    }
});
const { reducer, actions } = slice;

exports.actions = actions;
exports.initialState = initialState;
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map
