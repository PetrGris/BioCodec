'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var strapiAdmin = require('@strapi/admin/strapi-admin');
var FormModalNavigationContext = require('../../contexts/FormModalNavigationContext.js');
var constants = require('./constants.js');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const FormModalNavigationProvider = ({ children })=>{
    const [state, setFormModalNavigationState] = React__namespace.useState(constants.INITIAL_STATE_DATA);
    const { trackUsage } = strapiAdmin.useTracking();
    const onClickSelectCustomField = ({ attributeType, customFieldUid })=>{
        // TODO: Add tracking for custom fields
        setFormModalNavigationState((prevState)=>{
            return {
                ...prevState,
                actionType: 'create',
                modalType: 'customField',
                attributeType,
                customFieldUid,
                activeTab: 'basic'
            };
        });
    };
    const onClickSelectField = ({ attributeType, step })=>{
        if (state.forTarget === 'contentType') {
            trackUsage('didSelectContentTypeFieldType', {
                type: attributeType
            });
        }
        setFormModalNavigationState((prevState)=>{
            return {
                ...prevState,
                actionType: 'create',
                modalType: 'attribute',
                step,
                attributeType,
                showBackLink: true,
                activeTab: 'basic'
            };
        });
    };
    const onOpenModalAddComponentsToDZ = ({ dynamicZoneTarget, targetUid })=>{
        setFormModalNavigationState((prevState)=>{
            return {
                ...prevState,
                dynamicZoneTarget,
                targetUid,
                modalType: 'addComponentToDynamicZone',
                forTarget: 'contentType',
                step: '1',
                actionType: 'edit',
                isOpen: true
            };
        });
    };
    const onOpenModalAddField = ({ forTarget, targetUid })=>{
        setFormModalNavigationState((prevState)=>{
            return {
                ...prevState,
                actionType: 'create',
                forTarget,
                targetUid,
                modalType: 'chooseAttribute',
                isOpen: true,
                showBackLink: false,
                activeTab: 'basic'
            };
        });
    };
    const onOpenModalCreateSchema = (nextState)=>{
        setFormModalNavigationState((prevState)=>{
            return {
                ...prevState,
                ...nextState,
                isOpen: true,
                activeTab: 'basic'
            };
        });
    };
    const onOpenModalEditCategory = (categoryName)=>{
        setFormModalNavigationState((prevState)=>{
            return {
                ...prevState,
                categoryName,
                actionType: 'edit',
                modalType: 'editCategory',
                isOpen: true,
                activeTab: 'basic'
            };
        });
    };
    const onOpenModalEditCustomField = ({ forTarget, targetUid, attributeName, attributeType, customFieldUid })=>{
        setFormModalNavigationState((prevState)=>{
            return {
                ...prevState,
                modalType: 'customField',
                customFieldUid,
                actionType: 'edit',
                forTarget,
                targetUid,
                attributeName,
                attributeType,
                isOpen: true,
                activeTab: 'basic'
            };
        });
    };
    const onOpenModalEditField = ({ forTarget, targetUid, attributeName, attributeType, step })=>{
        setFormModalNavigationState((prevState)=>{
            return {
                ...prevState,
                modalType: 'attribute',
                actionType: 'edit',
                forTarget,
                targetUid,
                attributeName,
                attributeType,
                step,
                isOpen: true
            };
        });
    };
    const onOpenModalEditSchema = ({ modalType, forTarget, targetUid, kind })=>{
        setFormModalNavigationState((prevState)=>{
            return {
                ...prevState,
                modalType,
                actionType: 'edit',
                forTarget,
                targetUid,
                kind,
                isOpen: true,
                activeTab: 'basic'
            };
        });
    };
    const onCloseModal = ()=>{
        setFormModalNavigationState(constants.INITIAL_STATE_DATA);
    };
    const onNavigateToChooseAttributeModal = ({ forTarget, targetUid })=>{
        setFormModalNavigationState((prev)=>{
            return {
                ...prev,
                forTarget,
                targetUid,
                modalType: 'chooseAttribute',
                activeTab: 'basic'
            };
        });
    };
    const onNavigateToCreateComponentStep2 = ()=>{
        setFormModalNavigationState((prev)=>{
            return {
                ...prev,
                attributeType: 'component',
                modalType: 'attribute',
                step: '2',
                activeTab: 'basic'
            };
        });
    };
    const onNavigateToAddCompoToDZModal = ({ dynamicZoneTarget })=>{
        setFormModalNavigationState((prev)=>{
            return {
                ...prev,
                dynamicZoneTarget,
                modalType: 'addComponentToDynamicZone',
                actionType: 'create',
                step: '1',
                attributeType: null,
                attributeName: null,
                activeTab: 'basic'
            };
        });
    };
    const setActiveTab = (value)=>{
        setFormModalNavigationState((prev)=>{
            return {
                ...prev,
                activeTab: value
            };
        });
    };
    return /*#__PURE__*/ jsxRuntime.jsx(FormModalNavigationContext.FormModalNavigationContext.Provider, {
        value: {
            ...state,
            onClickSelectField,
            onClickSelectCustomField,
            onCloseModal,
            onNavigateToChooseAttributeModal,
            onNavigateToAddCompoToDZModal,
            onOpenModalAddComponentsToDZ,
            onNavigateToCreateComponentStep2,
            onOpenModalAddField,
            onOpenModalCreateSchema,
            onOpenModalEditCategory,
            onOpenModalEditField,
            onOpenModalEditCustomField,
            onOpenModalEditSchema,
            setFormModalNavigationState,
            setActiveTab
        },
        children: children
    });
};

exports.FormModalNavigationProvider = FormModalNavigationProvider;
//# sourceMappingURL=FormModalNavigationProvider.js.map
