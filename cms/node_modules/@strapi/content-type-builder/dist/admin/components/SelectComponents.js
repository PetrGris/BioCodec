'use strict';

var jsxRuntime = require('react/jsx-runtime');
var designSystem = require('@strapi/design-system');
var reactIntl = require('react-intl');
var useDataManager = require('../hooks/useDataManager.js');
var getTrad = require('../utils/getTrad.js');
var findAttribute = require('../utils/findAttribute.js');

const SelectComponents = ({ dynamicZoneTarget, intlLabel, name, onChange, value })=>{
    const { formatMessage } = reactIntl.useIntl();
    const { componentsGroupedByCategory, modifiedData } = useDataManager.useDataManager();
    const dzSchema = findAttribute.findAttribute(modifiedData.contentType.schema.attributes, dynamicZoneTarget);
    const alreadyUsedComponents = dzSchema?.components || [];
    const filteredComponentsGroupedByCategory = Object.keys(componentsGroupedByCategory).reduce((acc, current)=>{
        const filteredComponents = componentsGroupedByCategory[current].filter(({ uid })=>{
            return !alreadyUsedComponents.includes(uid);
        });
        if (filteredComponents.length > 0) {
            acc[current] = filteredComponents;
        }
        return acc;
    }, {});
    const options = Object.entries(filteredComponentsGroupedByCategory).reduce((acc, current)=>{
        const [categoryName, components] = current;
        const section = {
            label: categoryName,
            children: components.map(({ uid, schema: { displayName } })=>{
                return {
                    label: displayName,
                    value: uid
                };
            })
        };
        acc.push(section);
        return acc;
    }, []);
    const displayedValue = formatMessage({
        id: getTrad.getTrad('components.SelectComponents.displayed-value'),
        defaultMessage: '{number, plural, =0 {# components} one {# component} other {# components}} selected'
    }, {
        number: value?.length ?? 0
    });
    return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Field.Root, {
        name: name,
        children: [
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Field.Label, {
                children: formatMessage(intlLabel)
            }),
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.MultiSelectNested, {
                id: "select1",
                customizeContent: ()=>displayedValue,
                onChange: (values)=>{
                    onChange({
                        target: {
                            name,
                            value: values,
                            type: 'select-components'
                        }
                    });
                },
                options: options,
                value: value || []
            })
        ]
    });
};

exports.SelectComponents = SelectComponents;
//# sourceMappingURL=SelectComponents.js.map
