'use strict';

var jsxRuntime = require('react/jsx-runtime');
var designSystem = require('@strapi/design-system');
var icons = require('@strapi/icons');
var reactIntl = require('react-intl');
var reactRouterDom = require('react-router-dom');
var styledComponents = require('styled-components');
var Tracking = require('../../../features/Tracking.js');

const CustomIcon = styledComponents.styled(icons.Lightning)`
  right: 15px;
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);

  path {
    fill: ${({ theme })=>theme.colors.warning500};
  }
`;
const Link = styledComponents.styled(designSystem.SubNavLink)`
  &.active ${CustomIcon} {
    right: 13px;
  }
`;
const SettingsNav = ({ menu })=>{
    const { formatMessage } = reactIntl.useIntl();
    const { trackUsage } = Tracking.useTracking();
    const { pathname } = reactRouterDom.useLocation();
    const filteredMenu = menu.filter((section)=>!section.links.every((link)=>link.isDisplayed === false));
    const sections = filteredMenu.map((section)=>{
        return {
            ...section,
            title: section.intlLabel,
            links: section.links.map((link)=>{
                return {
                    ...link,
                    title: link.intlLabel,
                    name: link.id
                };
            })
        };
    });
    const label = formatMessage({
        id: 'global.settings',
        defaultMessage: 'Settings'
    });
    const handleClickOnLink = (destination)=>()=>{
            trackUsage('willNavigate', {
                from: pathname,
                to: destination
            });
        };
    return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.SubNav, {
        "aria-label": label,
        children: [
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.SubNavHeader, {
                label: label
            }),
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.SubNavSections, {
                children: sections.map((section)=>/*#__PURE__*/ jsxRuntime.jsx(designSystem.SubNavSection, {
                        label: formatMessage(section.intlLabel),
                        children: section.links.map((link)=>{
                            return /*#__PURE__*/ jsxRuntime.jsxs(Link, {
                                tag: reactRouterDom.NavLink,
                                withBullet: link.hasNotification,
                                to: link.to,
                                onClick: handleClickOnLink(link.to),
                                position: "relative",
                                children: [
                                    formatMessage(link.intlLabel),
                                    link?.licenseOnly && /*#__PURE__*/ jsxRuntime.jsx(CustomIcon, {
                                        width: "1.5rem",
                                        height: "1.5rem"
                                    })
                                ]
                            }, link.id);
                        })
                    }, section.id))
            })
        ]
    });
};

exports.SettingsNav = SettingsNav;
//# sourceMappingURL=SettingsNav.js.map
