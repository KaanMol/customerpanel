import { BooleanResponse, BridgeExtension, DnsRecordListParameters, ListResponse, RecordUpdate, ZoneRecord } from "../common";

export class DnsZoneRecordsExtension extends BridgeExtension {
    /**
     * @link https://docs.openprovider.com/doc/all#tag/ZoneRecordService
     * @param name Name of the zone that contains all the wanted records
     * @param parameters Options to filter the records of the zone
     * @returns List of DNS Records
     */
    async list(name: string, parameters?: Partial<DnsRecordListParameters>): Promise<ListResponse<ZoneRecord>> {
        const zoneRecordsList = await this.httpClient.get(`dns/zones/${name}/records?${this.getQueryString(parameters)}`);

        return zoneRecordsList.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/UpdateZone
     * @param zoneName Name of the zone to make changes to
     * @param records RecordUpdate object with all changes to the zone records
     * @returns Boolean value indicating if the records have been added
     */
    async manual(zoneName: string, changes: RecordUpdate): Promise<BooleanResponse> {
        const zoneRecordsUpdate = await this.httpClient.put(`dns/zones/${zoneName}`, changes);

        return zoneRecordsUpdate.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/UpdateZone
     * @param zoneName Name of the zone to add the record to
     * @param records Array of records to add to the zone
     * @returns Boolean value indicating if the records have been added
     */
    async add(zoneName: string, records: ZoneRecord[]): Promise<BooleanResponse> {
        const zoneRecordsAdd = await this.httpClient.put(`dns/zones/${zoneName}`, {
            records: {
                replace: records
            }
        });

        return zoneRecordsAdd.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/UpdateZone
     * @param zoneName Name of the zone to remove the records from
     * @param records Array of records to remove
     * @returns Boolean value indicating if the records have been removed
     */
    async remove(zoneName: string, records: ZoneRecord[]): Promise<BooleanResponse> {
        const zoneRecordsRemove = await this.httpClient.put(`dns/zones/${zoneName}`, {
            records: {
                remove: records
            }
        });

        return zoneRecordsRemove.data;
    }
}