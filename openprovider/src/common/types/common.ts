export enum SortingType {
    Ascending = "asc",
    Descending = "desc",
}

export type Warnings = {
    code: number;
    data: string;
    desc: string;
};

type BaseResponse = {
    code: number;
    desc: string;
    maintenance: boolean;
    warnings: Warnings;
};

export type SingleResponse<Data> = BaseResponse & { data: Data };
export type ListResponse<Data> = BaseResponse & { data: Data[]; total: number };
export type BooleanResponse = BaseResponse & { data: { success: boolean } };