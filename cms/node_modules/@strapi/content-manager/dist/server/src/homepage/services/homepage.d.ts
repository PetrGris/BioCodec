/// <reference types="node" />
import type { Core } from '@strapi/types';
import type { GetRecentDocuments } from '../../../../shared/contracts/homepage';
declare const createHomepageService: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getRecentlyPublishedDocuments(): Promise<GetRecentDocuments.Response['data']>;
    getRecentlyUpdatedDocuments(): Promise<GetRecentDocuments.Response['data']>;
};
export { createHomepageService };
//# sourceMappingURL=homepage.d.ts.map