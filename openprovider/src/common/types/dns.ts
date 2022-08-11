import { SortingType } from "./common";
import { DnsZoneType } from "./zone";

export type DnsRecordListParameters = {
    zone_id?: number;
    limit?: number;
    offset?: number;
    order_by?: {
        type?: SortingType;
        name?: SortingType;
        value?: SortingType;
        ttl?: SortingType;
        prio?: SortingType;
    };
    record_name_pattern?: string;
    value_pattern?: string;
    type?: DnsZoneType;
    prio?: number;
    ttl?: number;
    zone_provider?: string;
}