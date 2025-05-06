import { reviewWorkflowsApi } from './api.mjs';

const SINGLE_TYPES = 'single-types';
const contentManagerApi = reviewWorkflowsApi.injectEndpoints({
    endpoints: (builder)=>({
            getStages: builder.query({
                query: ({ model, slug, id, params })=>({
                        url: `/review-workflows/content-manager/${slug}/${model}/${id}/stages`,
                        method: 'GET',
                        config: {
                            params
                        }
                    }),
                transformResponse: (res)=>{
                    return {
                        meta: res.meta ?? {
                            workflowCount: 0
                        },
                        stages: res.data ?? []
                    };
                },
                providesTags: [
                    'ReviewWorkflowStages'
                ]
            }),
            updateStage: builder.mutation({
                query: ({ model, slug, id, params, ...data })=>({
                        url: `/review-workflows/content-manager/${slug}/${model}/${id}/stage`,
                        method: 'PUT',
                        data,
                        config: {
                            params
                        }
                    }),
                transformResponse: (res)=>res.data,
                invalidatesTags: (_result, _error, { slug, id, model })=>{
                    return [
                        {
                            type: 'Document',
                            id: slug !== SINGLE_TYPES ? `${model}_${id}` : model
                        },
                        {
                            type: 'Document',
                            id: `${model}_LIST`
                        },
                        'ReviewWorkflowStages'
                    ];
                }
            }),
            updateAssignee: builder.mutation({
                query: ({ model, slug, id, params, ...data })=>({
                        url: `/review-workflows/content-manager/${slug}/${model}/${id}/assignee`,
                        method: 'PUT',
                        data,
                        config: {
                            params
                        }
                    }),
                transformResponse: (res)=>res.data,
                invalidatesTags: (_result, _error, { slug, id, model })=>{
                    return [
                        {
                            type: 'Document',
                            id: slug !== SINGLE_TYPES ? `${model}_${id}` : model
                        },
                        {
                            type: 'Document',
                            id: `${model}_LIST`
                        }
                    ];
                }
            }),
            getContentTypes: builder.query({
                query: ()=>({
                        url: `/content-manager/content-types`,
                        method: 'GET'
                    }),
                transformResponse: (res)=>{
                    return res.data.reduce((acc, curr)=>{
                        if (curr.isDisplayed) {
                            acc[curr.kind].push(curr);
                        }
                        return acc;
                    }, {
                        collectionType: [],
                        singleType: []
                    });
                }
            })
        }),
    overrideExisting: true
});
const { useGetStagesQuery, useUpdateStageMutation, useUpdateAssigneeMutation, useGetContentTypesQuery } = contentManagerApi;

export { useGetContentTypesQuery, useGetStagesQuery, useUpdateAssigneeMutation, useUpdateStageMutation };
//# sourceMappingURL=content-manager.mjs.map
