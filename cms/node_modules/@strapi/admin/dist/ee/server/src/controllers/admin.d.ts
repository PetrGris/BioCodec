declare const _default: {
    getProjectType(): Promise<{
        data: {
            isEE: boolean | undefined;
            features: {
                [key: string]: any;
                name: string;
            }[];
            flags: {};
            type: string | null | undefined;
        };
    } | {
        data: {
            isEE: boolean;
            features: never[];
            flags: {};
            type?: undefined;
        };
    }>;
    licenseLimitInformation(): Promise<{
        data: {
            enforcementUserCount: any;
            currentActiveUserCount: any;
            permittedSeats: number | null | undefined;
            shouldNotify: boolean;
            shouldStopCreate: boolean;
            licenseLimitStatus: string | null;
            isHostedOnStrapiCloud: boolean;
            type: string | null | undefined;
            features: {
                [key: string]: any;
                name: string;
            }[];
        };
    }>;
};
export default _default;
//# sourceMappingURL=admin.d.ts.map