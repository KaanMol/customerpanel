import { BooleanResponse, BridgeExtension, ListResponse, NameserverRecord, NameserverListParameters, SingleResponse } from "../common";

export class DnsNameserverExtension extends BridgeExtension {
    /**
     * @link https://docs.openprovider.com/doc/all#tag/NameserverService
     * @param parameters Query Parameters to filter the namespaces in the result
     * @returns List of namespaces
     */
    async list(
        parameters?: NameserverListParameters
    ): Promise<ListResponse<NameserverRecord>> {
        const nameserverList = await this.httpClient.get(
            `dns/nameservers?${this.getQueryString(parameters)}`
        );

        return nameserverList.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/GetNameserver
     * @param name The name of the specific namespace to retrieve
     * @returns The requested namespace
     */
    async get(
        name: string
    ): Promise<SingleResponse<NameserverRecord>> {
        const singleNameserver = await this.httpClient.get(
            `dns/nameservers/${name}`
        );

        return singleNameserver.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/CreateNameserver
     * @param nameserver A nameserver object that gets created
     * @returns The nameserver that has been created
     */
    async add(
        nameserver: NameserverRecord
    ): Promise<SingleResponse<NameserverRecord>> {
        const newNameserver = await this.httpClient.post(
            `dns/nameserver`,
            nameserver
        );

        return newNameserver.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/UpdateNameserver
     * @param nameserverName The name of the nameserver that will get updated
     * @param updatedNameserver The new nameserver object that will replace the old nameserver
     * @returns A boolean indicating if the nameserver has been updated
     */
    async update(
        nameserverName: string,
        updatedNameserver: Partial<NameserverRecord>
    ): Promise<BooleanResponse> {
        const changedNameserver = await this.httpClient.put(
            `dns/nameserver/${nameserverName}`,
            updatedNameserver
        );

        return changedNameserver.data;
    }

    /**
     * @link https://docs.openprovider.com/doc/all#operation/DeleteNameserver
     * @param nameserverName The name of the nameserver that will get removed
     * @returns A boolean indicating if the nameserver has been removed
     */
    async remove(
        nameserverName: string
    ): Promise<BooleanResponse> {
        const removedNameserver = await this.httpClient.delete(
            `dns/nameservers/${nameserverName}`
        );

        return removedNameserver.data;
    }
}
