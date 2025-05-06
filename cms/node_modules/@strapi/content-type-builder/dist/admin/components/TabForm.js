'use strict';

var jsxRuntime = require('react/jsx-runtime');
var designSystem = require('@strapi/design-system');
var get = require('lodash/get');
var reactIntl = require('react-intl');
var GenericInputs = require('./GenericInputs.js');

/* eslint-disable react/no-array-index-key */ const TabForm = ({ form, formErrors, genericInputProps, modifiedData, onChange })=>{
    const { formatMessage } = reactIntl.useIntl();
    return /*#__PURE__*/ jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: form.map((section, sectionIndex)=>{
            // Don't display an empty section
            if (section.items.length === 0) {
                return null;
            }
            return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Box, {
                children: [
                    section.sectionTitle && /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                        paddingBottom: 4,
                        children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                            variant: "delta",
                            tag: "h3",
                            children: formatMessage(section.sectionTitle)
                        })
                    }),
                    /*#__PURE__*/ jsxRuntime.jsx(designSystem.Grid.Root, {
                        gap: 4,
                        children: section.items.map((input, i)=>{
                            const key = `${sectionIndex}.${i}`;
                            /**
                 * Use undefined as the default value because not every input wants a string e.g. Date pickers
                 */ const value = get(modifiedData, input.name, undefined);
                            // When extending the yup schema of an existing field (like in https://github.com/strapi/strapi/blob/293ff3b8f9559236609d123a2774e3be05ce8274/packages/strapi-plugin-i18n/admin/src/index.js#L52)
                            // and triggering a yup validation error in the UI (missing a required field for example)
                            // We got an object that looks like: formErrors = { "pluginOptions.i18n.localized": {...} }
                            // In order to deal with this error, we can't rely on lodash.get to resolve this key
                            // - lodash will try to access {pluginOptions: {i18n: {localized: true}}})
                            // - and we just want to access { "pluginOptions.i18n.localized": {...} }
                            // NOTE: this is a hack
                            const pluginOptionError = Object.keys(formErrors).find((key)=>key === input.name);
                            // Retrieve the error for a specific input
                            const errorId = pluginOptionError ? formErrors[pluginOptionError].id : get(formErrors, [
                                ...input.name.split('.')// The filter here is used when creating a component
                                // in the component step 1 modal
                                // Since the component info is stored in the
                                // componentToCreate object we can access the error
                                // By removing the key
                                .filter((key)=>key !== 'componentToCreate'),
                                'id'
                            ], null);
                            if (input.type === 'pushRight') {
                                return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Grid.Item, {
                                    col: input.size || 6,
                                    direction: "column",
                                    alignItems: "stretch",
                                    children: /*#__PURE__*/ jsxRuntime.jsx("div", {})
                                }, input.name || key);
                            }
                            return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Grid.Item, {
                                col: input.size || 6,
                                direction: "column",
                                alignItems: "stretch",
                                children: /*#__PURE__*/ jsxRuntime.jsx(GenericInputs.GenericInput, {
                                    ...input,
                                    ...genericInputProps,
                                    error: errorId,
                                    onChange: onChange,
                                    value: value
                                })
                            }, input.name || key);
                        })
                    })
                ]
            }, sectionIndex);
        })
    });
};

exports.TabForm = TabForm;
//# sourceMappingURL=TabForm.js.map
