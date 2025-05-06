'use strict';

var jsxRuntime = require('react/jsx-runtime');
var designSystem = require('@strapi/design-system');
var reactIntl = require('react-intl');
var styledComponents = require('styled-components');
var InputRenderer = require('./InputRenderer.js');

const RESPONSIVE_CONTAINER_BREAKPOINTS = {
    sm: '27.5rem'
};
const ResponsiveGridRoot = styledComponents.styled(designSystem.Grid.Root)`
  container-type: inline-size;
`;
const ResponsiveGridItem = /**
   * TODO:
   * JSDOM cannot handle container queries.
   * This is a temporary workaround so that tests do not fail in the CI when jestdom throws an error
   * for failing to parse the stylesheet.
   */ process.env.NODE_ENV !== 'test' ? styledComponents.styled(designSystem.Grid.Item)`
        grid-column: span 12;
        @container (min-width: ${RESPONSIVE_CONTAINER_BREAKPOINTS.sm}) {
          ${({ col })=>col && `grid-column: span ${col};`}
        }
      ` : styledComponents.styled(designSystem.Grid.Item)`
        grid-column: span 12;
      `;
const FormLayout = ({ layout, document, hasBackground = true })=>{
    const { formatMessage } = reactIntl.useIntl();
    const model = document.schema?.modelName;
    return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
        direction: "column",
        alignItems: "stretch",
        gap: 6,
        children: layout.map((panel, index)=>{
            if (panel.some((row)=>row.some((field)=>field.type === 'dynamiczone'))) {
                const [row] = panel;
                const [field] = row;
                const fieldWithTranslatedLabel = {
                    ...field,
                    label: formatMessage({
                        id: `content-manager.content-types.${model}.${field.name}`,
                        defaultMessage: field.label
                    })
                };
                return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Grid.Root, {
                    gap: 4,
                    children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Grid.Item, {
                        col: 12,
                        s: 12,
                        xs: 12,
                        direction: "column",
                        alignItems: "stretch",
                        children: /*#__PURE__*/ jsxRuntime.jsx(InputRenderer.InputRenderer, {
                            ...fieldWithTranslatedLabel,
                            document: document
                        })
                    })
                }, field.name);
            }
            return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                ...hasBackground && {
                    padding: 6,
                    borderColor: 'neutral150',
                    background: 'neutral0',
                    hasRadius: true,
                    shadow: 'tableShadow'
                },
                children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
                    direction: "column",
                    alignItems: "stretch",
                    gap: 6,
                    children: panel.map((row, gridRowIndex)=>/*#__PURE__*/ jsxRuntime.jsx(ResponsiveGridRoot, {
                            gap: 4,
                            children: row.map(({ size, ...field })=>{
                                const fieldWithTranslatedLabel = {
                                    ...field,
                                    label: formatMessage({
                                        id: `content-manager.content-types.${model}.${field.name}`,
                                        defaultMessage: field.label
                                    })
                                };
                                return /*#__PURE__*/ jsxRuntime.jsx(ResponsiveGridItem, {
                                    col: size,
                                    s: 12,
                                    xs: 12,
                                    direction: "column",
                                    alignItems: "stretch",
                                    children: /*#__PURE__*/ jsxRuntime.jsx(InputRenderer.InputRenderer, {
                                        ...fieldWithTranslatedLabel,
                                        document: document
                                    })
                                }, field.name);
                            })
                        }, gridRowIndex))
                })
            }, index);
        })
    });
};

exports.FormLayout = FormLayout;
exports.RESPONSIVE_CONTAINER_BREAKPOINTS = RESPONSIVE_CONTAINER_BREAKPOINTS;
exports.ResponsiveGridItem = ResponsiveGridItem;
exports.ResponsiveGridRoot = ResponsiveGridRoot;
//# sourceMappingURL=FormLayout.js.map
