import type { RequestHandler } from "@sveltejs/kit";
import { createRecordByTld, deleteRecordById, getRecordsByTld, updateRecordById } from "../../../handlers/domains";
import { page } from '$app/stores';
import { openProvider } from "../../../../openprovider/src";
import { prisma } from "@prisma/client";

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

    return {
        body: true
    }
}