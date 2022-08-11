import type { RequestHandler } from "@sveltejs/kit";
import { createRecordByTld, getRecordsByTld } from "../../../handlers/domains";
import { page } from '$app/stores';

export const GET: RequestHandler = async ({ params }) => {
    const result = await getRecordsByTld(params.domain);
    return {
        body: result
    };
};

export const POST: RequestHandler = async ({ params, request }) => {
    const result = await createRecordByTld(params.domain, await request.json())
    return {
        body: result
    };
};