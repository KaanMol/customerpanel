import { prisma } from "../../../common/database";
import type { RequestHandler } from "@sveltejs/kit";
import { openProvider } from "../../../../openprovider/src";
import { DnsRecordType, DomainExtensions } from "@prisma/client";
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    await prisma.domain.deleteMany({})
    await prisma.records.deleteMany({})
    const result = (await openProvider.dns.zone.list({
        with_records: true
    })).data.results;

    console.log(result)
    for (const zone of result) {
        const tld = zone.name.split(".");
        if (Object.values(DomainExtensions).includes(tld[1]) === false) continue;
        const domain = await prisma.domain.create({
            data: {
                name: tld[0],
                extension: DomainExtensions[tld[1] as keyof typeof DomainExtensions],
            }
        })

        if (zone.records !== undefined) {
            for (const record of zone.records) {
                if (record.type === "NS" || record.type === "SOA") continue;
                await prisma.records.create({
                    data: {
                        name: record.name,
                        type: DnsRecordType[record.type as keyof typeof DnsRecordType],
                        value: record.value,
                        Domain: {
                            connect: {
                                id: domain.id
                            }
                        },
                        ttl: record.ttl
                    }
                })
            }
        }
    }

    return json(await prisma.domain.findMany());
};