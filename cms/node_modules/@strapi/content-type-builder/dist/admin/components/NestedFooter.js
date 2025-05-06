'use strict';

var jsxRuntime = require('react/jsx-runtime');
var designSystem = require('@strapi/design-system');
var styledComponents = require('styled-components');

const IconBox = styledComponents.styled(designSystem.Box)`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 1rem;
    width: 1rem;
  }

  svg path {
    fill: ${({ theme, color })=>theme.colors[`${color}600`]};
  }
`;
const ButtonBox = styledComponents.styled(designSystem.Box)`
  border-radius: 0 0 ${({ theme })=>theme.borderRadius} ${({ theme })=>theme.borderRadius};
  display: block;
  width: 100%;
  border: none;
  position: relative;
  left: -0.4rem;
`;
const NestedTFooter = ({ children, icon, color, ...props })=>{
    return /*#__PURE__*/ jsxRuntime.jsx(ButtonBox, {
        paddingBottom: 4,
        paddingTop: 4,
        tag: "button",
        type: "button",
        ...props,
        children: /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
            children: [
                /*#__PURE__*/ jsxRuntime.jsx(IconBox, {
                    color: color,
                    "aria-hidden": true,
                    background: `${color}200`,
                    children: icon
                }),
                /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                    paddingLeft: 3,
                    children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                        variant: "pi",
                        fontWeight: "bold",
                        textColor: `${color}600`,
                        children: children
                    })
                })
            ]
        })
    });
};

exports.NestedTFooter = NestedTFooter;
//# sourceMappingURL=NestedFooter.js.map
