import { jsx } from 'react/jsx-runtime';
import { Grid, Flex, Box } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import { InputRenderer as MemoizedInputRenderer } from './InputRenderer.mjs';

const RESPONSIVE_CONTAINER_BREAKPOINTS = {
    sm: '27.5rem'
};
const ResponsiveGridRoot = styled(Grid.Root)`
  container-type: inline-size;
`;
const ResponsiveGridItem = /**
   * TODO:
   * JSDOM cannot handle container queries.
   * This is a temporary workaround so that tests do not fail in the CI when jestdom throws an error
   * for failing to parse the stylesheet.
   */ process.env.NODE_ENV !== 'test' ? styled(Grid.Item)`
        grid-column: span 12;
        @container (min-width: ${RESPONSIVE_CONTAINER_BREAKPOINTS.sm}) {
          ${({ col })=>col && `grid-column: span ${col};`}
        }
      ` : styled(Grid.Item)`
        grid-column: span 12;
      `;
const FormLayout = ({ layout, document, hasBackground = true })=>{
    const { formatMessage } = useIntl();
    const model = document.schema?.modelName;
    return /*#__PURE__*/ jsx(Flex, {
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
                return /*#__PURE__*/ jsx(Grid.Root, {
                    gap: 4,
                    children: /*#__PURE__*/ jsx(Grid.Item, {
                        col: 12,
                        s: 12,
                        xs: 12,
                        direction: "column",
                        alignItems: "stretch",
                        children: /*#__PURE__*/ jsx(MemoizedInputRenderer, {
                            ...fieldWithTranslatedLabel,
                            document: document
                        })
                    })
                }, field.name);
            }
            return /*#__PURE__*/ jsx(Box, {
                ...hasBackground && {
                    padding: 6,
                    borderColor: 'neutral150',
                    background: 'neutral0',
                    hasRadius: true,
                    shadow: 'tableShadow'
                },
                children: /*#__PURE__*/ jsx(Flex, {
                    direction: "column",
                    alignItems: "stretch",
                    gap: 6,
                    children: panel.map((row, gridRowIndex)=>/*#__PURE__*/ jsx(ResponsiveGridRoot, {
                            gap: 4,
                            children: row.map(({ size, ...field })=>{
                                const fieldWithTranslatedLabel = {
                                    ...field,
                                    label: formatMessage({
                                        id: `content-manager.content-types.${model}.${field.name}`,
                                        defaultMessage: field.label
                                    })
                                };
                                return /*#__PURE__*/ jsx(ResponsiveGridItem, {
                                    col: size,
                                    s: 12,
                                    xs: 12,
                                    direction: "column",
                                    alignItems: "stretch",
                                    children: /*#__PURE__*/ jsx(MemoizedInputRenderer, {
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

export { FormLayout, RESPONSIVE_CONTAINER_BREAKPOINTS, ResponsiveGridItem, ResponsiveGridRoot };
//# sourceMappingURL=FormLayout.mjs.map
