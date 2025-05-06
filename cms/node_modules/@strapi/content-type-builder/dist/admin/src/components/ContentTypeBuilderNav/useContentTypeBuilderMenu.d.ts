/// <reference types="react" />
export declare const useContentTypeBuilderMenu: () => {
    menu: {
        links: any[];
        linksCount: number;
        name: string;
        title: {
            id: string;
            defaultMessage: string;
        };
        customLink: false | {
            id: string;
            defaultMessage: string;
            onClick: () => void;
        } | undefined;
    }[];
    search: {
        value: string;
        onChange: import("react").Dispatch<import("react").SetStateAction<string>>;
        clear: () => void;
    };
};
