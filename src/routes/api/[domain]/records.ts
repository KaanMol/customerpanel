import type { RequestHandler } from "@sveltejs/kit";
import { createRecordByTld, getRecordsByTld, updateRecordById } from "../../../handlers/domains";
import { page } from '$app/stores';
import { openProvider } from "../../../../openprovider/src";

export const GET: RequestHandler = async ({ params }) => {
    const result = await getRecordsByTld(params.domain);
    return {
        body: result
    };
};

export const POST: RequestHandler = async ({ params, request }) => {
    const records = await request.json();
    const postedRecords = [];
    for (const record of records) {
        if (record.id !== undefined) {
            postedRecords.push(await updateRecordById(record.id, record));
        } else {
            postedRecords.push(await createRecordByTld(params.domain, record));
        }
    }
    // const result = await crxeateRecordByTld(params.domain, await request.json());
    setTimeout(async () => {
        try {
            records.map(record => {
                record.name = record.name.replace(params.domain, "");
                return record;
            });
            await openProvider.dns.zone.records.add(params.domain, records);
        } catch (e) {
            console.log(e);
        }

    }, 1);

    return {
        body: postedRecords
    };
};

export const DELETE: RequestHandler = async ({ params, request }) => {

}