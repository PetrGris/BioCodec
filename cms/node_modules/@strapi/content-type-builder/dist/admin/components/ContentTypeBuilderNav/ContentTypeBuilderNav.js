'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var designSystem = require('@strapi/design-system');
var Icons = require('@strapi/icons');
var upperFirst = require('lodash/upperFirst');
var reactIntl = require('react-intl');
var reactRouterDom = require('react-router-dom');
var styledComponents = require('styled-components');
var getTrad = require('../../utils/getTrad.js');
var useContentTypeBuilderMenu = require('./useContentTypeBuilderMenu.js');

const SubNavLinkCustom = styledComponents.styled(designSystem.SubNavLink)`
  div {
    width: inherit;
    span:nth-child(2) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: inherit;
    }
  }
`;
const ContentTypeBuilderNav = ()=>{
    const { menu, search } = useContentTypeBuilderMenu.useContentTypeBuilderMenu();
    const { formatMessage } = reactIntl.useIntl();
    const pluginName = formatMessage({
        id: getTrad.getTrad('plugin.name'),
        defaultMessage: 'Content-Type Builder'
    });
    return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.SubNav, {
        "aria-label": pluginName,
        children: [
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.SubNavHeader, {
                searchable: true,
                value: search.value,
                onClear: ()=>search.clear(),
                onChange: (e)=>search.onChange(e.target.value),
                label: pluginName,
                searchLabel: formatMessage({
                    id: 'global.search',
                    defaultMessage: 'Search'
                })
            }),
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.SubNavSections, {
                children: menu.map((section)=>/*#__PURE__*/ jsxRuntime.jsxs(React.Fragment, {
                        children: [
                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.SubNavSection, {
                                label: formatMessage({
                                    id: section.title.id,
                                    defaultMessage: section.title.defaultMessage
                                }),
                                collapsable: true,
                                badgeLabel: section.linksCount.toString(),
                                children: section.links.map((link)=>{
                                    if (link.links) {
                                        return /*#__PURE__*/ jsxRuntime.jsx(designSystem.SubNavLinkSection, {
                                            label: upperFirst(link.title),
                                            children: link.links.map((subLink)=>/*#__PURE__*/ jsxRuntime.jsx(designSystem.SubNavLink, {
                                                    tag: reactRouterDom.NavLink,
                                                    to: subLink.to,
                                                    active: subLink.active,
                                                    isSubSectionChild: true,
                                                    children: upperFirst(formatMessage({
                                                        id: subLink.name,
                                                        defaultMessage: subLink.title
                                                    }))
                                                }, subLink.name))
                                        }, link.name);
                                    }
                                    return /*#__PURE__*/ jsxRuntime.jsx(SubNavLinkCustom, {
                                        tag: reactRouterDom.NavLink,
                                        to: link.to,
                                        active: link.active,
                                        width: "100%",
                                        children: upperFirst(formatMessage({
                                            id: link.name,
                                            defaultMessage: link.title
                                        }))
                                    }, link.name);
                                })
                            }),
                            section.customLink && /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                                paddingLeft: 7,
                                children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.TextButton, {
                                    onClick: section.customLink.onClick,
                                    startIcon: /*#__PURE__*/ jsxRuntime.jsx(Icons.Plus, {
                                        width: "0.8rem",
                                        height: "0.8rem"
                                    }),
                                    marginTop: 2,
                                    cursor: "pointer",
                                    children: formatMessage({
                                        id: section.customLink.id,
                                        defaultMessage: section.customLink.defaultMessage
                                    })
                                })
                            })
                        ]
                    }, section.name))
            })
        ]
    });
};

exports.ContentTypeBuilderNav = ContentTypeBuilderNav;
//# sourceMappingURL=ContentTypeBuilderNav.js.map
