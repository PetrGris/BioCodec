declare const _default: {
    routes: {
        homepage: import("@strapi/types/dist/core").Router;
    };
    controllers: Record<string, import("@strapi/types/dist/core").Controller>;
    services: {
        homepage: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            getRecentlyPublishedDocuments(): Promise<import("../../../shared/contracts/homepage").RecentDocument[]>;
            getRecentlyUpdatedDocuments(): Promise<import("../../../shared/contracts/homepage").RecentDocument[]>;
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map