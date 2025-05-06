'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var strapiAdmin = require('@strapi/admin/strapi-admin');
var reactIntl = require('react-intl');
var reactRouterDom = require('react-router-dom');
var AutoReloadOverlayBlocker = require('../../components/AutoReloadOverlayBlocker.js');
var ContentTypeBuilderNav = require('../../components/ContentTypeBuilderNav/ContentTypeBuilderNav.js');
var DataManagerProvider = require('../../components/DataManagerProvider/DataManagerProvider.js');
var FormModalNavigationProvider = require('../../components/FormModalNavigationProvider/FormModalNavigationProvider.js');
var constants = require('../../constants.js');
var pluginId = require('../../pluginId.js');

function _interopNamespaceDefaultOnly (e) { return Object.freeze({ __proto__: null, default: e }); }

const ListView = /*#__PURE__*/ React.lazy(()=>Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('../ListView/ListView.js')); }));
const App = ()=>{
    const { formatMessage } = reactIntl.useIntl();
    const title = formatMessage({
        id: `${pluginId.pluginId}.plugin.name`,
        defaultMessage: 'Content Types Builder'
    });
    const startSection = strapiAdmin.useGuidedTour('App', (state)=>state.startSection);
    const startSectionRef = React.useRef(startSection);
    React.useEffect(()=>{
        if (startSectionRef.current) {
            startSectionRef.current('contentTypeBuilder');
        }
    }, []);
    return /*#__PURE__*/ jsxRuntime.jsxs(strapiAdmin.Page.Protect, {
        permissions: constants.PERMISSIONS.main,
        children: [
            /*#__PURE__*/ jsxRuntime.jsx(strapiAdmin.Page.Title, {
                children: title
            }),
            /*#__PURE__*/ jsxRuntime.jsx(AutoReloadOverlayBlocker.AutoReloadOverlayBlockerProvider, {
                children: /*#__PURE__*/ jsxRuntime.jsx(FormModalNavigationProvider.FormModalNavigationProvider, {
                    children: /*#__PURE__*/ jsxRuntime.jsx(DataManagerProvider, {
                        children: /*#__PURE__*/ jsxRuntime.jsx(strapiAdmin.Layouts.Root, {
                            sideNav: /*#__PURE__*/ jsxRuntime.jsx(ContentTypeBuilderNav.ContentTypeBuilderNav, {}),
                            children: /*#__PURE__*/ jsxRuntime.jsx(React.Suspense, {
                                fallback: /*#__PURE__*/ jsxRuntime.jsx(strapiAdmin.Page.Loading, {}),
                                children: /*#__PURE__*/ jsxRuntime.jsxs(reactRouterDom.Routes, {
                                    children: [
                                        /*#__PURE__*/ jsxRuntime.jsx(reactRouterDom.Route, {
                                            path: "content-types/:uid",
                                            element: /*#__PURE__*/ jsxRuntime.jsx(ListView, {})
                                        }),
                                        /*#__PURE__*/ jsxRuntime.jsx(reactRouterDom.Route, {
                                            path: `component-categories/:categoryUid/:componentUid`,
                                            element: /*#__PURE__*/ jsxRuntime.jsx(ListView, {})
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

module.exports = App;
//# sourceMappingURL=index.js.map
