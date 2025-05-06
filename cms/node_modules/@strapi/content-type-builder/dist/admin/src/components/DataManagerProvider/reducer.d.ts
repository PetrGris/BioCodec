import { PayloadAction } from '@reduxjs/toolkit';
import type { DataManagerStateType, ContentType, Component } from '../../types';
import type { Internal } from '@strapi/types';
type Target = 'component' | 'components' | 'contentType' | 'contentTypes';
export type Action<T = any> = {
    type: T;
    uid?: string;
    mainDataKey: Target;
    schemaType: 'component' | 'contentType';
    attributeToRemoveName?: string;
    [key: string]: any;
};
declare const initialState: DataManagerStateType;
type InitPayload = {
    components: Record<string, Component>;
    contentTypes: Record<string, ContentType>;
    reservedNames: Record<string, string>;
};
type AddAttributePayload = {
    attributeToSet: Record<string, any>;
    forTarget: Target;
    targetUid: string;
    shouldAddComponentToData: boolean;
};
type AddCreateComponentToDynamicZonePayload = {
    dynamicZoneTarget: string;
    componentsToAdd: Internal.UID.Component[];
};
type AddCustomFieldAttributePayload = {
    attributeToSet: Record<string, any>;
    forTarget: Target;
    targetUid: string;
};
type ChangeDynamicZoneComponentsPayload = {
    dynamicZoneTarget: string;
    newComponents: Internal.UID.Component[];
};
type CreateComponentSchemaPayload = {
    uid: string;
    data: any;
    componentCategory: string;
    shouldAddComponentToData: boolean;
};
type CreateSchemaPayload = {
    uid: string;
    data: any;
};
type EditAttributePayload = {
    attributeToSet: Record<string, any>;
    forTarget: Target;
    targetUid: string;
    initialAttribute: Record<string, any>;
};
type EditCustomFieldAttributePayload = {
    attributeToSet: Record<string, any>;
    forTarget: Target;
    targetUid: string;
    initialAttribute: Record<string, any>;
};
type RemoveComponentFromDynamicZonePayload = {
    dzName: string;
    componentToRemoveIndex: number;
};
type RemoveFieldPayload = {
    mainDataKey: Target;
    attributeToRemoveName: string;
};
type RemoveFieldFromDisplayedComponentPayload = {
    attributeToRemoveName: string;
    componentUid: string;
};
type SetModifiedDataPayload = {
    schemaToSet: Partial<DataManagerStateType['modifiedData']>;
    hasJustCreatedSchema: boolean;
};
type UpdateSchemaPayload = {
    data: Record<string, any>;
    schemaType: 'component';
    uid: string;
} | {
    data: Record<string, any>;
    schemaType: 'contentType';
};
export declare const reducer: import("redux").Reducer<DataManagerStateType>, actions: import("@reduxjs/toolkit").CaseReducerActions<{
    init: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<InitPayload>) => void;
    addAttribute: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<AddAttributePayload>) => void;
    addCreatedComponentToDynamicZone: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<AddCreateComponentToDynamicZonePayload>) => void;
    addCustomFieldAttribute: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<AddCustomFieldAttributePayload>) => void;
    changeDynamicZoneComponents: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<ChangeDynamicZoneComponentsPayload>) => void;
    createComponentSchema: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<CreateComponentSchemaPayload>) => void;
    createSchema: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<CreateSchemaPayload>) => void;
    editAttribute: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<EditAttributePayload>) => void;
    editCustomFieldAttribute: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<EditCustomFieldAttributePayload>) => void;
    updateInitialState: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>) => void;
    deleteNotSavedType: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>) => void;
    reloadPlugin: () => DataManagerStateType;
    removeComponentFromDynamicZone: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<RemoveComponentFromDynamicZonePayload>) => void;
    removeField: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<RemoveFieldPayload>) => void;
    removeFieldFromDisplayedComponent: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<RemoveFieldFromDisplayedComponentPayload>) => void;
    setModifiedData: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<SetModifiedDataPayload>) => void;
    updateSchema: (state: import("immer/dist/internal.js").WritableDraft<DataManagerStateType>, action: PayloadAction<UpdateSchemaPayload>) => void;
}, "data-manager">;
export { initialState };
