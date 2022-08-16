import { prisma } from "../../common/database";
import type { RequestHandler } from "@sveltejs/kit";
import { openProvider } from "../../../openprovider/src";
import { DnsRecordType, DomainExtensions } from "@prisma/client";

export const GET: RequestHandler = async ({ locals }) => {
    await prisma.domain.deleteMany({})
    await prisma.records.deleteMany({})
    const result = (await openProvider.dns.zone.list({
        with_records: true
    })).data.results;
    
    console.log(result)
    for (const zone of result) {
        const tld = zone.name.split(".");
        if (["nl", "com", "dev"].includes(tld[1]) === false) continue;
        const domain = await prisma.domain.create({
            data: {
                name: tld[0],
                extension: DomainExtensions[tld[1] as keyof typeof DomainExtensions],
            }
        })

        if (zone.records !== undefined) {
            for (const record of zone.records) {
                if (["A", "AAAA", "CNAME"].includes(record.type) === false) continue;

                await prisma.records.create({
                    data: {
                        name: record.name,
                        type: DnsRecordType[record.type as keyof typeof DnsRecordType],
                        value: record.value,
                        domainId: domain.id,
                        ttl: record.ttl
                    }
                })
            }
        }
    }

    return {
        body: await prisma.domain.findMany()
    }
};