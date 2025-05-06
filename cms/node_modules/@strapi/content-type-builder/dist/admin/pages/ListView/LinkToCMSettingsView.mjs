import { jsx } from 'react/jsx-runtime';
import { memo } from 'react';
import { useRBAC } from '@strapi/admin/strapi-admin';
import { Button } from '@strapi/design-system';
import { ListPlus } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

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
const LinkToCMSettingsView = /*#__PURE__*/ memo(({ disabled, isInContentTypeView = true, contentTypeKind = 'collectionType', targetUid = '' })=>{
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
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
    const { isLoading, allowedActions } = useRBAC({
        viewConfig: permissionsToApply
    });
    if (isLoading) {
        return null;
    }
    if (!allowedActions.canConfigureView && !allowedActions.canConfigureLayout) {
        return null;
    }
    return /*#__PURE__*/ jsx(Button, {
        startIcon: /*#__PURE__*/ jsx(ListPlus, {}),
        variant: "tertiary",
        onClick: handleClick,
        disabled: disabled,
        children: label
    });
});

export { LinkToCMSettingsView };
//# sourceMappingURL=LinkToCMSettingsView.mjs.map
