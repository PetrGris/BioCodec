export declare const services: {
    homepage: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getRecentlyPublishedDocuments(): Promise<import("../../../../shared/contracts/homepage").RecentDocument[]>;
        getRecentlyUpdatedDocuments(): Promise<import("../../../../shared/contracts/homepage").RecentDocument[]>;
    };
};
//# sourceMappingURL=index.d.ts.map