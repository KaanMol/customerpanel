import { BridgeExtension } from "../common";
import { DnsNameserverExtension } from "./nameserver";
import { DnsZoneExtension } from "./zone";

export class DnsExtension extends BridgeExtension {
    public zone: DnsZoneExtension = new DnsZoneExtension(this.httpClient);
    public nameserver: DnsNameserverExtension = new DnsNameserverExtension(this.httpClient);
}
