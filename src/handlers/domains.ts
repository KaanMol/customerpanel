import { prisma } from "../common/database";
import { openProvider } from "../../openprovider/src";
import { DnsRecordType, DomainExtensions } from "@prisma/client";

export function getDomainList() {
    return prisma.domain.findMany({
        include: {
            records: true
        }
    })
}

export async function getRecordsByTld(_tld: string) {
    const tld = _tld.split(".");

    const domain = await prisma.domain.findFirst({
        where: {
            name: tld[0],
            extension: DomainExtensions[tld[0] as keyof typeof DomainExtensions]
        }
    });

    return await prisma.records.findMany({
        where: {
            domainId: domain?.id
        }
    })
}

export async function createRecordByTld(_tld: string, record: { name: string, type: string, value: string, ttl: number }) {
    const tld = _tld.split(".");

    const domain = await prisma.domain.findFirst({
        where: {
            name: tld[0],
            extension: DomainExtensions[tld[0] as keyof typeof DomainExtensions]
        }
    });

    return await prisma.records.create({
        data: {
            name: record.name,
            type: DnsRecordType[record.type as keyof typeof DnsRecordType],
            value: record.value,
            ttl: record.ttl,
            Domain: {
                connect: {
                    id: domain?.id
                }
            }
        }
    })
}

export async function updateRecordById(id: number, record: { name: string, type: string, value: string, ttl: number }) {
    return await prisma.records.update({
        where: {
            id
        },
        data: {
            name: record.name,
            type: DnsRecordType[record.type as keyof typeof DnsRecordType],
            value: record.value,
            ttl: record.ttl
        }
    })
}

export async function deleteRecordById(id: number) {
    let deleted;

    try {
        deleted = await prisma.records.delete({
            where: {
                id
            }
        });
    } catch (e) {
        console.log(e)
    }


    return deleted;
}