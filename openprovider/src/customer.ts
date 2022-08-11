import { BridgeExtension } from "./common";

export class CustomerExtension extends BridgeExtension {
    async list(): Promise<ListResponse<CustomerList>> {
        const customers = await this.httpClient.get(`customers`);

        return customers.data;
    }

    async findById(
        customerId: string
    ): Promise<SingleResponse<CustomerResponse>> {
        const domain = await this.httpClient.get(`customers/${customerId}`);

        return domain.data;
    }

    async create(
        data: CreateCustomer
    ): Promise<SingleResponse<CustomerCreateResponse>> {
        const customer = await this.httpClient.post(`customers`, data);
        return customer.data;
    }
}

interface CustomerCreateResponse { }

interface CustomerList {
    results: CustomerResponse[];
    total: number;
}

interface CustomerResponse {
    additional_data: CustomerAdditionalData;
    address: Address;
    comments: string;
    company_name: string;
    email: string;
    extension_additional_data: ExtensionAdditionalData;
    fax: Fax;
    locale: string;
    name: Name;
    phone: Phone;
    tags: Tags;
    vat: string;
}

interface CreateCustomer {
    additional_data: CustomerAdditionalData;
    address: Address;
    comments: string;
    company_name: string;
    email: string;
    extension_additional_data: ExtensionAdditionalData[];
    fax: Fax;
    locale: string;
    name: Name;
    phone: Phone;
    tags: Tags[];
    vat: string;
}
interface CustomerAdditionalData {
    attached_files: AttachedFiles[];
    birth_address: string;
    birth_city: string;
    birth_country: string;
    birth_date: string;
    birth_state: string;
    birth_zipcode: string;
    company_registration_city: string;
    company_registration_number: string;
    company_registration_subscription_date: string;
    company_url: string;
    headquarters_address: string;
    headquarters_city: string;
    headquarters_country: string;
    headquarters_state: string;
    headquarters_zipcode: string;
    passport_number: string;
    social_security_number: string;
    trading_name: string;
}
interface Address {
    city: string;
    country: string;
    number: string;
    state: string;
    street: string;
    suffix: string;
    zipcode: string;
}
interface AttachedFiles {
    description: string;
    doc_type: string;
    path: string;
}
interface ExtensionAdditionalData {
    data: ExtensionData;
    name: string;
}
interface ExtensionData {
    admin_type: string;
    applicant_purpose: string;
    birth_date: string;
    company_name_cyrillic: string;
    company_name_latin: string;
    company_registration_number: string;
    contact_title: string;
    country_of_citizenship: string;
    customer_uin: string;
    ens_auth_id: string;
    ens_key: string;
    first_name_cyrillic: string;
    first_name_latin: string;
    hr_member: string;
    industry_class: string;
    is_private_enterpreneur: string;
    last_name_cyrillic: string;
    last_name_latin: string;
    legal_address_cyrillic: string;
    legal_type: string;
    middle_name_cyrillic: string;
    middle_name_latin: string;
    mobile_phone_number: string;
    nexus_category: string;
    org_type: string;
    passport_issue_date: string;
    passport_issuer: string;
    passport_number: string;
    passport_series: string;
    postal_address_cyrillic: string;
    social_security_number: string;
    tax_payer_number: string;
    uin: string;
    user_type: string;
    vat: string;
    website: string;
    whois_email: string;
}
interface Fax {
    area_code: string;
    country_code: string;
    subscriber_number: string;
}
interface Name {
    first_name: string;
    full_name: string;
    initials: string;
    last_name: string;
    prefix: string;
}
interface Phone {
    area_code: string;
    country_code: string;
    subscriber_number: string;
}
interface Tags {
    key: string;
    value: string;
}
interface UpdateCostumer {
    additional_data: CustomerAdditionalData;
    address: Address;
    comments: string;
    email: string;
    extension_additional_data: ExtensionAdditionalData;
    fax: Fax;
    handle: string;
    locale: string;
    phone: Phone;
    tags: Tags;
    vat: string;
}
