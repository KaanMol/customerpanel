import { BridgeExtension } from "./common";

export class DomainExtension extends BridgeExtension {
    async list(
        contactHandle?: string
    ): Promise<OpenProvider.Response.List<GetDomainData[]>> {
        const domainList = await this.httpClient.get(`domains`);

        return domainList.data;
    }

    async findById(
        domainId: number
    ): Promise<OpenProvider.Response.Single<GetDomainData>> {
        const domain = await this.httpClient.get(`domains/${domainId}`);

        return domain.data;
    }

    async remove(
        domainId: number
    ): Promise<OpenProvider.Response.Single<RemoveDomainData>> {
        const domain = await this.httpClient.delete(`domains/${domainId}`);

        return domain.data;
    }

    async create(
        data: CreateDomain
    ): Promise<OpenProvider.Response.Single<CreateDomainResponse>> {
        const domain = await this.httpClient.post(`domains`, data);

        return domain.data;
    }

    async update(
        data: Partial<CreateDomain>
    ): Promise<OpenProvider.Response.Single<UpdateDomainResponseData>> {
        const domain = await this.httpClient.put(`domains`, data);

        return domain.data;
    }

    async check(
        data: CheckDomainParameter
    ): Promise<OpenProvider.Response.Single<CheckDomainResponse[]>> {
        const domain = await this.httpClient.post(`domains/check`, data);

        return domain.data;
    }
}

interface CheckDomainParameter {
    application_mode: string;
    domains: OpenProvider.Domain[];
    with_price: boolean;
}

interface CheckDomainResponse {
    claim_key: string;
    domain: string;
    is_premium: boolean;
    premium: PremiumPrice;
    price: PriceGroup;
    reason: string;
    status: DomainStatus;
    whois: string;
}

enum DomainStatus {
    Free = "free",
    Active = "active",
}

interface PriceGroup {
    product: Price;
    reseller: Price;
}

interface PremiumPrice {
    currency: string;
    price: {
        create: number;
    };
}

interface Price {
    currency: string;
    price: string;
}

//TODO: Split into multiple files
interface UpdateDomainResponseData {
    id: number;
    status: string;
}

interface GetDomainData {
    abuse_details: AbuseDetails;
    active_date: string;
    additional_data: AdditionalData;
    admin_handle: string;
    api_history: ApiHistory;
    application_mode: string;
    application_mode_expiration_date: string;
    application_mode_title: string;
    application_notice_id: string;
    auth_code: string;
    autorenew: AutoRenew;
    billing_handle: string;
    can_renew: boolean;
    coments: string;
    comments_last_changed_at: string;
    creation_date: string;
    delete_status: string;
    delete_at: string;
    dnssec: DnsSec;
    dnssec_keys: DnsSecKey[];
    domain: OpenProvider.Domain;
    expiration_date: string;
    hard_quarantine_expiry_date: string;
    has_active_sectigo_zone: boolean;
    has_history: boolean;
    history: History;
    id: number;
    internal_auth_code: string;
    is_abusive: boolean;
    is_client_hold_enabled: string;
    is_deleted: boolean;
    is_dnssec_enabled: boolean;
    is_hosted_whois: boolean;
    is_locakable: boolean;
    is_locked: boolean;
    is_parked: boolean;
    is_premium: boolean;
    is_private_whois_allowed: boolean;
    is_private_whois_enabled: boolean;
    is_sectigo_dns_enabled: boolean;
    is_spamexperts_enabled: boolean;
    last_changed: string;
    modify_owner_allowed: boolean;
    name_servers: NameServer[];
    ns_group: string;
    ns_template_id: number;
    ns_template_name: string;
    nsgroup_id: number;
    order_date: string;
    owner: Owner;
    owner_company_name: string;
    owner_handle: string;
    quarantine_expiration_date: string;
    registry_expiration_date: string;
    registry_statuses: RegistryStatuses;
    renew: number;
    renewal_date: string;
    reseller_handle: string;
    reseller_id: number;
    restorable_until: string;
    scheduled_at: string;
    scheduled_from: string;
    soft_quarantine_expiry_date: string;
    status: string;
    tech_handle: string;
    trade_allowed: boolean;
    trade_auth_code_required: string;
    transfer_auth_code_required: string;
    transfer_cancel_suported: boolean;
    type: string;
    unit: DomainRegistrationUnit;
    use_domicile: boolean;
    verification_email_exp_date: string;
    verification_email_name: string;
    verification_email_status: string;
    verification_email_status_description: string;
    whois_privacy_data: WhoisPrivacyData;
}

interface WhoisPrivacyData {
    expiration_date: string;
}

interface RegistryStatuses {
    client_hold: RegistryStatus;
}

interface RegistryStatus {
    is_changeanle: boolean;
    value: number;
}

interface Owner {
    company_name: string;
    full_name: string;
}

interface History {
    contents: string;
    domain: string;
    ip: string;
    subject: string;
    timestamp: string;
    type: string;
}

enum DnsSec {
    SignedDelegation = "signedDelegation",
    Unsigned = "unsigned",
}

enum AutoRenew {
    Off = "off",
    On = "on",
    Default = "default",
}

interface ApiHistory {
    cmd: string;
    created_at: string;
    domain_id: number;
    in: string;
    out: string;
}

interface AbuseDetails {
    abuse_id: number;
    is_domain_held: boolean;
    message: string;
}

interface RemoveDomainData {
    data: string;
}

interface CreateDomainResponse {
    activiation_data: string;
    additional_data: AdditionalData;
    auth_code: string;
    expiration_date: string;
    id: string;
    renewal_date: string;
    status: string;
}

interface CreateDomain {
    accept_eap_fee?: number;
    accept_premium_fee?: number;
    additional_data?: Partial<AdditionalData>;
    admin_handle?: string;
    application_mode?: string;
    application_notice_id?: string;
    application_smd?: string;
    auth_code?: string;
    autorenew?: string;
    billing_handle?: string;
    comments?: string;
    dnssec_keys?: Partial<DnsSecKey>[];
    domain: OpenProvider.Domain;
    is_dnssec_enabled?: boolean;
    is_private_whois_enable?: boolean;
    is_sectigo_dns_enabled?: boolean;
    is_spamexperts_enable?: boolean;
    name_servers?: Partial<NameServer>[];
    ns_group?: string;
    ns_template_id?: number;
    ns_template_name?: string;
    owner_handle?: string;
    period?: number;
    promo_code?: string;
    reseller_handle?: string;
    tech_handle?: string;
    unit: DomainRegistrationUnit;
    use_domicile?: boolean;
}

enum DomainRegistrationUnit {
    Yearly = "yearly",
    Quarterly = "quarterly",
    Monthly = "monthly",
}

interface NameServer {
    ip: string;
    ip6: string;
    name: string;
    seq_nr: string;
}

interface DnsSecKey {
    alg: number;
    flags: number;
    protocol: number;
    pub_key: string;
    readonly: number;
}

interface AdditionalData {
    abogado_acceptance: string;
    admin_sing_pass_id: string;
    ae_acceptance: string;
    allocation_token: string;
    auth_code: string;
    bank_acceptance: string;
    company_registration_number: string;
    coop_acceptance: string;
    customer_uin: string;
    customer_uin_doc_type: {
        description: string;
        doc_type: string;
    };
    domain_name_variants: string[];
    eligibility_type: string;
    eligibility_type_relationship: string;
    ftld_token: string;
    gay_donation_acceptance: string;
    gay_rights_protection_acceptance: string;
    id_number: string;
    id_type: string;
    idn_script: string;
    insurance_acceptance: string;
    intended_use: string;
    law_acceptance: string;
    legal_type: string;
    maintainer: string;
    membership_id: string;
    mobile_phone_number_verification: string;
    ngo_ong_eligibility_acceptance: string;
    ngo_ong_policy_acceptance: string;
    passport_number: string;
    rurf_blocked_domains: string;
    self_service: string;
    trademark: string;
    trademark_id: string;
    travel_acceptance: string;
    vat: string;
    verification_code: string;
    vote_acceptance: string;
    voto_acceptance: string;
}
