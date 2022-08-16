import { BooleanResponse, BridgeExtension, ListResponse, SingleResponse, ZoneCreateBody, ZoneListParameters, ZoneRecord, ZoneSingleParameters, ZoneUpdateBody, type ZoneResult } from "../common";
import { DnsZoneRecordsExtension } from "./record";

export class DnsZoneExtension extends BridgeExtension {
    public records: DnsZoneRecordsExtension = new DnsZoneRecordsExtension(this.httpClient);

    /**
     * @link https://docs.openprovider.com/doc/all#operation/ListZones
     * @param parameters Options to filter the list of DNS Zones
     * @returns List of all the DNS Zones
     */
    async list(parameters?: Partial<ZoneListParameters>): Promise<ListResponse<ZoneResult>> {
        console.log(`dns/zones?${this.getQueryString(parameters)}`)
        const zoneList = await this.httpClient.get(`dns/zones?${this.getQueryString(parameters)}`);
        return zoneList.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/GetZone
     * @param zoneName Name of the zone that will get retrieved
     * @param parameters Options to add more data to the response
     * @returns Single DNS Zone object
     */
    async get(zoneName: string, parameters?: Partial<ZoneSingleParameters>): Promise<SingleResponse<ZoneRecord>> {
        const getZone = await this.httpClient.get(`dns/zones/${zoneName}?${this.getQueryString(parameters)}`);

        return getZone.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/CreateZone
     * @param data Body of the zone that will get created
     * @returns Boolean value indicating if the zone has been created
     */
    async create(data: ZoneCreateBody): Promise<BooleanResponse> {
        const createZone = await this.httpClient.post(`dns/zones`, data);

        return createZone.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/UpdateZone
     * @param zoneName Name of the zone that will get updated
     * @param data The data that will replace the current data in the DNS Zone
     * @returns Boolean value indicating if the update was successful
     */
    async update(zoneName: string, data: ZoneUpdateBody): Promise<BooleanResponse> {
        const updatedZone = await this.httpClient.put(`dns/zone/${zoneName}`, data);

        return updatedZone.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/DeleteZone
     * @param zoneName Name of the zone that will get removed
     * @returns Boolean value indicating if the remove was successful
     */
    async remove(zoneName: string): Promise<BooleanResponse> {
        const removedZone = await this.httpClient.delete(`dns/zone/${zoneName}`);

        return removedZone.data;
    }
}

