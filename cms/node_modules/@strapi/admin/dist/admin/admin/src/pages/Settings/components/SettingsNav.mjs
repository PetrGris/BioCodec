import { jsxs, jsx } from 'react/jsx-runtime';
import { SubNavLink, SubNav, SubNavHeader, SubNavSections, SubNavSection } from '@strapi/design-system';
import { Lightning } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { useLocation, NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { useTracking } from '../../../features/Tracking.mjs';

const CustomIcon = styled(Lightning)`
  right: 15px;
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);

  path {
    fill: ${({ theme })=>theme.colors.warning500};
  }
`;
const Link = styled(SubNavLink)`
  &.active ${CustomIcon} {
    right: 13px;
  }
`;
const SettingsNav = ({ menu })=>{
    const { formatMessage } = useIntl();
    const { trackUsage } = useTracking();
    const { pathname } = useLocation();
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
    return /*#__PURE__*/ jsxs(SubNav, {
        "aria-label": label,
        children: [
            /*#__PURE__*/ jsx(SubNavHeader, {
                label: label
            }),
            /*#__PURE__*/ jsx(SubNavSections, {
                children: sections.map((section)=>/*#__PURE__*/ jsx(SubNavSection, {
                        label: formatMessage(section.intlLabel),
                        children: section.links.map((link)=>{
                            return /*#__PURE__*/ jsxs(Link, {
                                tag: NavLink,
                                withBullet: link.hasNotification,
                                to: link.to,
                                onClick: handleClickOnLink(link.to),
                                position: "relative",
                                children: [
                                    formatMessage(link.intlLabel),
                                    link?.licenseOnly && /*#__PURE__*/ jsx(CustomIcon, {
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

export { SettingsNav };
//# sourceMappingURL=SettingsNav.mjs.map
