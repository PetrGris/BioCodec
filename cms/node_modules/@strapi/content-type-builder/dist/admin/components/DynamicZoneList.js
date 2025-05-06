'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var designSystem = require('@strapi/design-system');
var Icons = require('@strapi/icons');
var reactIntl = require('react-intl');
var styledComponents = require('styled-components');
var useDataManager = require('../hooks/useDataManager.js');
var getTrad = require('../utils/getTrad.js');
var ComponentCard = require('./ComponentCard/ComponentCard.js');
var ComponentList = require('./ComponentList.js');
var Tr = require('./Tr.js');

const StyledAddIcon = styledComponents.styled(Icons.Plus)`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.9rem;
  border-radius: 6.4rem;
  background: ${({ theme })=>theme.colors.primary100};
  path {
    fill: ${({ theme })=>theme.colors.primary600};
  }
`;
const FixedBox = styledComponents.styled(designSystem.Box)`
  height: 9rem;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;
const ScrollableStack = styledComponents.styled(designSystem.Flex)`
  width: 100%;
  overflow-x: auto;
`;
const ComponentContentBox = styledComponents.styled(designSystem.Box)`
  padding-top: 9rem;
`;
const ComponentStack = styledComponents.styled(designSystem.Flex)`
  flex-shrink: 0;
  width: 14rem;
  height: 8rem;
  justify-content: center;
  align-items: center;
`;
const DynamicZoneList = ({ customRowComponent, components = [], addComponent, name, targetUid })=>{
    const { isInDevelopmentMode } = useDataManager.useDataManager();
    const [activeTab, setActiveTab] = React.useState(0);
    const { formatMessage } = reactIntl.useIntl();
    const toggle = (tab)=>{
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const handleClickAdd = ()=>{
        addComponent(name);
    };
    return /*#__PURE__*/ jsxRuntime.jsx(Tr.Tr, {
        className: "dynamiczone-row",
        $isFromDynamicZone: true,
        children: /*#__PURE__*/ jsxRuntime.jsxs("td", {
            colSpan: 12,
            children: [
                /*#__PURE__*/ jsxRuntime.jsx(FixedBox, {
                    paddingLeft: 8,
                    children: /*#__PURE__*/ jsxRuntime.jsxs(ScrollableStack, {
                        gap: 2,
                        children: [
                            isInDevelopmentMode && /*#__PURE__*/ jsxRuntime.jsx("button", {
                                type: "button",
                                onClick: handleClickAdd,
                                children: /*#__PURE__*/ jsxRuntime.jsxs(ComponentStack, {
                                    direction: "column",
                                    alignItems: "stretch",
                                    gap: 1,
                                    children: [
                                        /*#__PURE__*/ jsxRuntime.jsx(StyledAddIcon, {}),
                                        /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                            variant: "pi",
                                            fontWeight: "bold",
                                            textColor: "primary600",
                                            children: formatMessage({
                                                id: getTrad.getTrad('button.component.add'),
                                                defaultMessage: 'Add a component'
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
                                role: "tablist",
                                gap: 2,
                                children: components.map((component, index)=>{
                                    return /*#__PURE__*/ jsxRuntime.jsx(ComponentCard.ComponentCard, {
                                        dzName: name || '',
                                        index: index,
                                        component: component,
                                        isActive: activeTab === index,
                                        isInDevelopmentMode: isInDevelopmentMode,
                                        onClick: ()=>toggle(index)
                                    }, component);
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsxRuntime.jsx(ComponentContentBox, {
                    children: components.map((component, index)=>{
                        const props = {
                            customRowComponent,
                            component
                        };
                        return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                            id: `dz-${name}-panel-${index}`,
                            role: "tabpanel",
                            "aria-labelledby": `dz-${name}-tab-${index}`,
                            style: {
                                display: activeTab === index ? 'block' : 'none'
                            },
                            children: /*#__PURE__*/ jsxRuntime.jsx("table", {
                                children: /*#__PURE__*/ jsxRuntime.jsx("tbody", {
                                    children: /*#__PURE__*/ React.createElement(ComponentList.ComponentList, {
                                        ...props,
                                        isFromDynamicZone: true,
                                        component: targetUid,
                                        key: component
                                    })
                                })
                            })
                        }, component);
                    })
                })
            ]
        })
    });
};

exports.DynamicZoneList = DynamicZoneList;
//# sourceMappingURL=DynamicZoneList.js.map
