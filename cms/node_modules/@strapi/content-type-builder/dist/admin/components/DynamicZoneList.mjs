import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, createElement } from 'react';
import { Box, Flex, Typography } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import { useDataManager } from '../hooks/useDataManager.mjs';
import { getTrad } from '../utils/getTrad.mjs';
import { ComponentCard } from './ComponentCard/ComponentCard.mjs';
import { ComponentList } from './ComponentList.mjs';
import { Tr } from './Tr.mjs';

const StyledAddIcon = styled(Plus)`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.9rem;
  border-radius: 6.4rem;
  background: ${({ theme })=>theme.colors.primary100};
  path {
    fill: ${({ theme })=>theme.colors.primary600};
  }
`;
const FixedBox = styled(Box)`
  height: 9rem;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;
const ScrollableStack = styled(Flex)`
  width: 100%;
  overflow-x: auto;
`;
const ComponentContentBox = styled(Box)`
  padding-top: 9rem;
`;
const ComponentStack = styled(Flex)`
  flex-shrink: 0;
  width: 14rem;
  height: 8rem;
  justify-content: center;
  align-items: center;
`;
const DynamicZoneList = ({ customRowComponent, components = [], addComponent, name, targetUid })=>{
    const { isInDevelopmentMode } = useDataManager();
    const [activeTab, setActiveTab] = useState(0);
    const { formatMessage } = useIntl();
    const toggle = (tab)=>{
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const handleClickAdd = ()=>{
        addComponent(name);
    };
    return /*#__PURE__*/ jsx(Tr, {
        className: "dynamiczone-row",
        $isFromDynamicZone: true,
        children: /*#__PURE__*/ jsxs("td", {
            colSpan: 12,
            children: [
                /*#__PURE__*/ jsx(FixedBox, {
                    paddingLeft: 8,
                    children: /*#__PURE__*/ jsxs(ScrollableStack, {
                        gap: 2,
                        children: [
                            isInDevelopmentMode && /*#__PURE__*/ jsx("button", {
                                type: "button",
                                onClick: handleClickAdd,
                                children: /*#__PURE__*/ jsxs(ComponentStack, {
                                    direction: "column",
                                    alignItems: "stretch",
                                    gap: 1,
                                    children: [
                                        /*#__PURE__*/ jsx(StyledAddIcon, {}),
                                        /*#__PURE__*/ jsx(Typography, {
                                            variant: "pi",
                                            fontWeight: "bold",
                                            textColor: "primary600",
                                            children: formatMessage({
                                                id: getTrad('button.component.add'),
                                                defaultMessage: 'Add a component'
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx(Flex, {
                                role: "tablist",
                                gap: 2,
                                children: components.map((component, index)=>{
                                    return /*#__PURE__*/ jsx(ComponentCard, {
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
                /*#__PURE__*/ jsx(ComponentContentBox, {
                    children: components.map((component, index)=>{
                        const props = {
                            customRowComponent,
                            component
                        };
                        return /*#__PURE__*/ jsx(Box, {
                            id: `dz-${name}-panel-${index}`,
                            role: "tabpanel",
                            "aria-labelledby": `dz-${name}-tab-${index}`,
                            style: {
                                display: activeTab === index ? 'block' : 'none'
                            },
                            children: /*#__PURE__*/ jsx("table", {
                                children: /*#__PURE__*/ jsx("tbody", {
                                    children: /*#__PURE__*/ createElement(ComponentList, {
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

export { DynamicZoneList };
//# sourceMappingURL=DynamicZoneList.mjs.map
