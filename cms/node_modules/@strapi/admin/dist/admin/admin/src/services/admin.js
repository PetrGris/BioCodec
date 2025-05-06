'use strict';

var urls = require('../utils/urls.js');
var api = require('./api.js');

const admin = api.adminApi.enhanceEndpoints({
    addTagTypes: [
        'ProjectSettings',
        'LicenseLimits'
    ]
}).injectEndpoints({
    endpoints: (builder)=>({
            init: builder.query({
                query: ()=>({
                        url: '/admin/init',
                        method: 'GET'
                    }),
                transformResponse (res) {
                    return res.data;
                }
            }),
            information: builder.query({
                query: ()=>({
                        url: '/admin/information',
                        method: 'GET'
                    }),
                transformResponse (res) {
                    return res.data;
                }
            }),
            telemetryProperties: builder.query({
                query: ()=>({
                        url: '/admin/telemetry-properties',
                        method: 'GET',
                        config: {
                            validateStatus: (status)=>status < 500
                        }
                    }),
                transformResponse (res) {
                    return res.data;
                }
            }),
            projectSettings: builder.query({
                query: ()=>({
                        url: '/admin/project-settings',
                        method: 'GET'
                    }),
                providesTags: [
                    'ProjectSettings'
                ],
                transformResponse (data) {
                    return {
                        authLogo: data.authLogo ? {
                            name: data.authLogo.name,
                            url: urls.prefixFileUrlWithBackendUrl(data.authLogo.url)
                        } : undefined,
                        menuLogo: data.menuLogo ? {
                            name: data.menuLogo.name,
                            url: urls.prefixFileUrlWithBackendUrl(data.menuLogo.url)
                        } : undefined
                    };
                }
            }),
            updateProjectSettings: builder.mutation({
                query: (data)=>({
                        url: '/admin/project-settings',
                        method: 'POST',
                        data,
                        config: {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    }),
                invalidatesTags: [
                    'ProjectSettings'
                ]
            }),
            getPlugins: builder.query({
                query: ()=>({
                        url: '/admin/plugins',
                        method: 'GET'
                    })
            }),
            getLicenseLimits: builder.query({
                query: ()=>({
                        url: '/admin/license-limit-information',
                        method: 'GET'
                    }),
                providesTags: [
                    'LicenseLimits'
                ]
            })
        }),
    overrideExisting: false
});
const { useInitQuery, useTelemetryPropertiesQuery, useInformationQuery, useProjectSettingsQuery, useUpdateProjectSettingsMutation, useGetPluginsQuery, useGetLicenseLimitsQuery } = admin;

exports.useGetLicenseLimitsQuery = useGetLicenseLimitsQuery;
exports.useGetPluginsQuery = useGetPluginsQuery;
exports.useInformationQuery = useInformationQuery;
exports.useInitQuery = useInitQuery;
exports.useProjectSettingsQuery = useProjectSettingsQuery;
exports.useTelemetryPropertiesQuery = useTelemetryPropertiesQuery;
exports.useUpdateProjectSettingsMutation = useUpdateProjectSettingsMutation;
//# sourceMappingURL=admin.js.map
