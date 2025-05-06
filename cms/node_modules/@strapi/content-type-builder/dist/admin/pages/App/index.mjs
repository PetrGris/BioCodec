import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useEffect, Suspense, lazy } from 'react';
import { useGuidedTour, Page, Layouts } from '@strapi/admin/strapi-admin';
import { useIntl } from 'react-intl';
import { Routes, Route } from 'react-router-dom';
import { AutoReloadOverlayBlockerProvider } from '../../components/AutoReloadOverlayBlocker.mjs';
import { ContentTypeBuilderNav } from '../../components/ContentTypeBuilderNav/ContentTypeBuilderNav.mjs';
import DataManagerProvider from '../../components/DataManagerProvider/DataManagerProvider.mjs';
import { FormModalNavigationProvider } from '../../components/FormModalNavigationProvider/FormModalNavigationProvider.mjs';
import { PERMISSIONS } from '../../constants.mjs';
import { pluginId } from '../../pluginId.mjs';

const ListView = /*#__PURE__*/ lazy(()=>import('../ListView/ListView.mjs'));
const App = ()=>{
    const { formatMessage } = useIntl();
    const title = formatMessage({
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'Content Types Builder'
    });
    const startSection = useGuidedTour('App', (state)=>state.startSection);
    const startSectionRef = useRef(startSection);
    useEffect(()=>{
        if (startSectionRef.current) {
            startSectionRef.current('contentTypeBuilder');
        }
    }, []);
    return /*#__PURE__*/ jsxs(Page.Protect, {
        permissions: PERMISSIONS.main,
        children: [
            /*#__PURE__*/ jsx(Page.Title, {
                children: title
            }),
            /*#__PURE__*/ jsx(AutoReloadOverlayBlockerProvider, {
                children: /*#__PURE__*/ jsx(FormModalNavigationProvider, {
                    children: /*#__PURE__*/ jsx(DataManagerProvider, {
                        children: /*#__PURE__*/ jsx(Layouts.Root, {
                            sideNav: /*#__PURE__*/ jsx(ContentTypeBuilderNav, {}),
                            children: /*#__PURE__*/ jsx(Suspense, {
                                fallback: /*#__PURE__*/ jsx(Page.Loading, {}),
                                children: /*#__PURE__*/ jsxs(Routes, {
                                    children: [
                                        /*#__PURE__*/ jsx(Route, {
                                            path: "content-types/:uid",
                                            element: /*#__PURE__*/ jsx(ListView, {})
                                        }),
                                        /*#__PURE__*/ jsx(Route, {
                                            path: `component-categories/:categoryUid/:componentUid`,
                                            element: /*#__PURE__*/ jsx(ListView, {})
                                        })
                                    ]
                                })
                            })
                        })
                    })
                })
            })
        ]
    });
};

export { App as default };
//# sourceMappingURL=index.mjs.map
