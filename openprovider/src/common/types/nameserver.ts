import { SortingType } from ".";

export type NameserverListParameters = {
    name?: string,
    ip?: string,
    ip6?: string,
    pattern?: string,
    limit?: number,
    offset?: string,
    order?: SortingType,
    order_by?: NameserverListParameterOrderBy
}

export type NameserverRecord = {
    ip: string;
    ip6: string;
    name: string;
}

export enum NameserverListParameterOrderBy {
    Id = "id",
    Name = "name",
}
