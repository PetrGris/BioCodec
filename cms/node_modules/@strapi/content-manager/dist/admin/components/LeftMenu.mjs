import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { useQueryParams } from '@strapi/admin/strapi-admin';
import { SubNavLink, useFilter, useCollator, SubNav, SubNavHeader, SubNavSections, SubNavSection } from '@strapi/design-system';
import { stringify, parse } from 'qs';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { useContentTypeSchema } from '../hooks/useContentTypeSchema.mjs';
import { useTypedSelector } from '../modules/hooks.mjs';
import { getTranslation } from '../utils/translations.mjs';

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
const LeftMenu = ()=>{
    const [search, setSearch] = React.useState('');
    const [{ query }] = useQueryParams();
    const { formatMessage, locale } = useIntl();
    const collectionTypeLinks = useTypedSelector((state)=>state['content-manager'].app.collectionTypeLinks);
    const singleTypeLinks = useTypedSelector((state)=>state['content-manager'].app.singleTypeLinks);
    const { schemas } = useContentTypeSchema();
    const { startsWith } = useFilter(locale, {
        sensitivity: 'base'
    });
    const formatter = useCollator(locale, {
        sensitivity: 'base'
    });
    const menu = React.useMemo(()=>[
            {
                id: 'collectionTypes',
                title: formatMessage({
                    id: getTranslation('components.LeftMenu.collection-types'),
                    defaultMessage: 'Collection Types'
                }),
                searchable: true,
                links: collectionTypeLinks
            },
            {
                id: 'singleTypes',
                title: formatMessage({
                    id: getTranslation('components.LeftMenu.single-types'),
                    defaultMessage: 'Single Types'
                }),
                searchable: true,
                links: singleTypeLinks
            }
        ].map((section)=>({
                ...section,
                links: section.links/**
           * Filter by the search value
           */ .filter((link)=>startsWith(link.title, search))/**
           * Sort correctly using the language
           */ .sort((a, b)=>formatter.compare(a.title, b.title))/**
           * Apply the formated strings to the links from react-intl
           */ .map((link)=>{
                    return {
                        ...link,
                        title: formatMessage({
                            id: link.title,
                            defaultMessage: link.title
                        })
                    };
                })
            })), [
        collectionTypeLinks,
        search,
        singleTypeLinks,
        startsWith,
        formatMessage,
        formatter
    ]);
    const handleClear = ()=>{
        setSearch('');
    };
    const handleChangeSearch = ({ target: { value } })=>{
        setSearch(value);
    };
    const label = formatMessage({
        id: getTranslation('header.name'),
        defaultMessage: 'Content Manager'
    });
    const getPluginsParamsForLink = (link)=>{
        const schema = schemas.find((schema)=>schema.uid === link.uid);
        const isI18nEnabled = Boolean(schema?.pluginOptions?.i18n?.localized);
        // The search params have the i18n plugin
        if (query.plugins && 'i18n' in query.plugins) {
            // Prepare removal of i18n from the plugins search params
            const { i18n, ...restPlugins } = query.plugins;
            // i18n is not enabled, remove it from the plugins search params
            if (!isI18nEnabled) {
                return restPlugins;
            }
            // i18n is enabled, put the plugins search params back together
            return {
                i18n,
                ...restPlugins
            };
        }
        return query.plugins;
    };
    return /*#__PURE__*/ jsxs(SubNav, {
        "aria-label": label,
        children: [
            /*#__PURE__*/ jsx(SubNavHeader, {
                label: label,
                searchable: true,
                value: search,
                onChange: handleChangeSearch,
                onClear: handleClear,
                searchLabel: formatMessage({
                    id: 'content-manager.components.LeftMenu.Search.label',
                    defaultMessage: 'Search for a content type'
                })
            }),
            /*#__PURE__*/ jsx(SubNavSections, {
                children: menu.map((section)=>{
                    return /*#__PURE__*/ jsx(SubNavSection, {
                        label: section.title,
                        badgeLabel: section.links.length.toString(),
                        children: section.links.map((link)=>{
                            return /*#__PURE__*/ jsx(SubNavLinkCustom, {
                                tag: NavLink,
                                to: {
                                    pathname: link.to,
                                    search: stringify({
                                        ...parse(link.search ?? ''),
                                        plugins: getPluginsParamsForLink(link)
                                    })
                                },
                                width: "100%",
                                children: link.title
                            }, link.uid);
                        })
                    }, section.id);
                })
            })
        ]
    });
};

export { LeftMenu };
//# sourceMappingURL=LeftMenu.mjs.map
