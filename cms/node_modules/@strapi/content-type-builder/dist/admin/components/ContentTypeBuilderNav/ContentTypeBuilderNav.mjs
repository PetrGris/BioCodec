import { jsxs, jsx } from 'react/jsx-runtime';
import { Fragment } from 'react';
import { SubNavLink, SubNav, SubNavHeader, SubNavSections, SubNavSection, SubNavLinkSection, Box, TextButton } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import upperFirst from 'lodash/upperFirst';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { getTrad } from '../../utils/getTrad.mjs';
import { useContentTypeBuilderMenu } from './useContentTypeBuilderMenu.mjs';

const SubNavLinkCustom = styled(SubNavLink)`
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
    const { menu, search } = useContentTypeBuilderMenu();
    const { formatMessage } = useIntl();
    const pluginName = formatMessage({
        id: getTrad('plugin.name'),
        defaultMessage: 'Content-Type Builder'
    });
    return /*#__PURE__*/ jsxs(SubNav, {
        "aria-label": pluginName,
        children: [
            /*#__PURE__*/ jsx(SubNavHeader, {
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
            /*#__PURE__*/ jsx(SubNavSections, {
                children: menu.map((section)=>/*#__PURE__*/ jsxs(Fragment, {
                        children: [
                            /*#__PURE__*/ jsx(SubNavSection, {
                                label: formatMessage({
                                    id: section.title.id,
                                    defaultMessage: section.title.defaultMessage
                                }),
                                collapsable: true,
                                badgeLabel: section.linksCount.toString(),
                                children: section.links.map((link)=>{
                                    if (link.links) {
                                        return /*#__PURE__*/ jsx(SubNavLinkSection, {
                                            label: upperFirst(link.title),
                                            children: link.links.map((subLink)=>/*#__PURE__*/ jsx(SubNavLink, {
                                                    tag: NavLink,
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
                                    return /*#__PURE__*/ jsx(SubNavLinkCustom, {
                                        tag: NavLink,
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
                            section.customLink && /*#__PURE__*/ jsx(Box, {
                                paddingLeft: 7,
                                children: /*#__PURE__*/ jsx(TextButton, {
                                    onClick: section.customLink.onClick,
                                    startIcon: /*#__PURE__*/ jsx(Plus, {
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

export { ContentTypeBuilderNav };
//# sourceMappingURL=ContentTypeBuilderNav.mjs.map
