'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var strapiAdmin = require('@strapi/admin/strapi-admin');
var designSystem = require('@strapi/design-system');
var Icons = require('@strapi/icons');
var reactIntl = require('react-intl');
var reactRouterDom = require('react-router-dom');

const cmPermissions = {
    collectionTypesConfigurations: [
        {
            action: 'plugin::content-manager.collection-types.configure-view',
            subject: null
        }
    ],
    componentsConfigurations: [
        {
            action: 'plugin::content-manager.components.configure-layout',
            subject: null
        }
    ],
    singleTypesConfigurations: [
        {
            action: 'plugin::content-manager.single-types.configure-view',
            subject: null
        }
    ]
};
const getPermission = ({ isInContentTypeView, contentTypeKind })=>{
    if (isInContentTypeView) {
        if (contentTypeKind === 'singleType') {
            return cmPermissions.singleTypesConfigurations;
        }
        return cmPermissions.collectionTypesConfigurations;
    }
    return cmPermissions.componentsConfigurations;
};
const LinkToCMSettingsView = /*#__PURE__*/ React.memo(({ disabled, isInContentTypeView = true, contentTypeKind = 'collectionType', targetUid = '' })=>{
    const { formatMessage } = reactIntl.useIntl();
    const navigate = reactRouterDom.useNavigate();
    const permissionsToApply = getPermission({
        isInContentTypeView,
        contentTypeKind
    });
    const label = formatMessage({
        id: 'content-type-builder.form.button.configure-view',
        defaultMessage: 'Configure the view'
    });
    const handleClick = ()=>{
        if (disabled) {
            return false;
        }
        if (isInContentTypeView) {
            navigate(`/content-manager/collection-types/${targetUid}/configurations/edit`);
        } else {
            navigate(`/content-manager/components/${targetUid}/configurations/edit`);
        }
        return false;
    };
    const { isLoading, allowedActions } = strapiAdmin.useRBAC({
        viewConfig: permissionsToApply
    });
    if (isLoading) {
        return null;
    }
    if (!allowedActions.canConfigureView && !allowedActions.canConfigureLayout) {
        return null;
    }
    return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Button, {
        startIcon: /*#__PURE__*/ jsxRuntime.jsx(Icons.ListPlus, {}),
        variant: "tertiary",
        onClick: handleClick,
        disabled: disabled,
        children: label
    });
});

exports.LinkToCMSettingsView = LinkToCMSettingsView;
//# sourceMappingURL=LinkToCMSettingsView.js.map
