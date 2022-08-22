import { json } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";
import { createRecordByTld, deleteRecordById, getRecordsByTld, updateRecordById } from "../../../../handlers/domains";
import { openProvider } from "../../../../../openprovider/src";
import type DnsRecord from '$lib/dns/DnsRecord.svelte';

export const GET: RequestHandler = async ({ params }) => {
    const result = await getRecordsByTld(params.domain);

    return json({ ...result });
};

export const POST: RequestHandler = async ({ params, request }) => {
    const records = await request.json();
    const postedRecords = [];
    for (const record of records) {
        if (record.id !== undefined) {
            // TODO Potential security issue, investigate behaviour when adding ID that is not your record
            postedRecords.push(await updateRecordById(record.id, record));
        } else {
            postedRecords.push(await createRecordByTld(params.domain, record));
        }
    }

    setTimeout(async () => {
        try {
            records.map((record: DnsRecord) => {
                record.name = record.name.replace(params.domain, "");
                return record;
            });
            await openProvider.dns.zone.records.add(params.domain, records);
        } catch (e) {
            console.log(e);
        }

    }, 1);

    return json(postedRecords);
};

export const DELETE: RequestHandler = async ({ params, request }) => {
    const record = await request.json();
    try {
        await deleteRecordById(record.id);
    } catch (e) {
        console.log(e)
    }


    setTimeout(async () => {
        record.name = record.name.replace(params.domain, "");

        try {
            const result = await openProvider.dns.zone.records.remove(params.domain, [record]);
            console.log(result);
        } catch (e) {
            console.log(e)
        }

    }, 1)

    return json({ success: true });
}