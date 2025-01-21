declare const cmbutil: {
    sanitize: (obj: any) => any;
    escapeSoslStr: (str: string) => string;
    isNullOrEmpty: (tmp: any) => boolean;
    isUndefined: (tmp: any) => boolean;
    isNumeric: (n: any) => boolean;
    mergeArrays: (a: any[], b: any[], prop: string) => any[];
    getQueryParam: (name: string, url: string | URL) => string | null;
    getMonthName: (month: number) => string;
    getAllMonthNames: () => string[];
    getDateString: (v: any) => string;
    getDate: (v: any) => Date;
    getYears: () => number[];
    properCase: (d: string) => string;
    getSf2JsDate: (v: string) => string | null;
    stripNonAlpha: (str: string) => string;
};
export default cmbutil;
