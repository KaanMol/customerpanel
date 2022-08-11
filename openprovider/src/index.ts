import OpenProviderConfig from "../../config/openprovider.config"
import { CustomerExtension } from "./customer";
import { DomainExtension } from "./domain";
import { AxiosResponse } from "axios";
import { DnsExtension } from "./dns/";
import { Bridge } from "./common";

export class OpenProvider extends Bridge {
    public domain: DomainExtension = new DomainExtension(this.httpClient);
    public customer: CustomerExtension = new CustomerExtension(this.httpClient);
    public dns: DnsExtension = new DnsExtension(this.httpClient);

    constructor() {
        super({
            baseURL: OpenProviderConfig.API_ENDPOINT,

        });
    }

    protected async connect(): Promise<void> {
        const req = await this.httpClient.post("auth/login", {
            username: OpenProviderConfig.API_USERNAME,
            password: OpenProviderConfig.API_PASSWORD
        });

        this.httpClient.defaults.headers.common["Authorization"] = `bearer ${req.data.data.token}`;
    }

    // TODO: implement isAuthorizationError
    protected isAuthorizationError(req: AxiosResponse<any, any>): boolean {
        return true;
    }
}

export * from "./common/types";
export const openProvider = new OpenProvider();

