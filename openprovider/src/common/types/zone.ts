import { SortingType } from "./common";
import { Domain } from "./domain";

export type ZoneListParameters = {
    limit?: number;
    offset?: number;
    order_by?: {
        creation_date: SortingType;
        modification_date: SortingType;
        name: SortingType;
    };
    type?: DnsZoneType;
    name_pattern?: string;
    with_records?: boolean;
    with_history?: boolean;
    with_dnskey?: boolean;
    provider?: string;
};



export enum DnsZoneType {
    Master = "master",
    Slave = "slave",
}

export type ZoneResult = {
    active: boolean;
    creation_date: string;
    dnskey: string;
    history: DnsZoneUpdateHistory[];
    id: number;
    ip: string;
    is_deleted: boolean;
    is_shadow: boolean;
    is_spamexperts_enabled: boolean;
    modification_date: string;
    name: string;
    premium_dns: PremiumDnsData;
    provider: string;
    records: ZoneRecord[];
    reseller_id: number;
    type: string;
};

export type DnsZoneUpdateHistory = {
    date: string;
    is: string;
    source: string;
    was: string;
}


type ZoneBodyBase = {
    domain: Domain;
    is_spamexperts_enabled: string;
    master_ip: string;
    provider: string;
    type: DnsZoneType;
};

export type ZoneCreateBody = ZoneBodyBase & {
    template_name: string;
    secured: boolean;
    records: ZoneRecord[];
};

export type ZoneUpdateBody = ZoneBodyBase & {
    id: number;
    name: string;
    premium_dns: PremiumDnsData;
    secured: boolean;
    records: RecordUpdate;
};

export type SectigoData = {
    autorenew: boolean;
    order_date: string;
    renewal_date: string;
    secured: boolean;
    website_id: number;
}

export type PremiumDnsData = {
    sectigo: SectigoData;
}


/**
 * ZONE RECORD TYPES
 */

export enum ZoneRecordType {
    A = "A",
    AAAA = "AAAA",
    CAA = "CAA",
    CNAME = "CNAME",
    MX = "MX",
    SPF = "SPF",
    SRV = "SRV",
    TXT = "TXT",
    NS = "NS",
    TLSA = "TLSA",
    SSHFP = "SSHFP",
    SOA = "SOA",
}

export type ZoneRecord = {
    creation_date: string;
    ip: string;
    modification_date: string;
    name: string;
    prio: number;
    ttl: number;
    type: ZoneRecordType;
    value: string;
}

export type RecordUpdate = {
    add: ZoneRecord[];
    remove: ZoneRecord[];
    replace: ZoneRecord[];
    update: {
        original_record: ZoneRecord;
        record: ZoneRecord;
    }[];
}

export type ZoneSingleParameters = {
    id?: string;
    with_records?: boolean;
    with_history?: boolean;
    with_dnskey?: boolean;
    provider?: string;
};



