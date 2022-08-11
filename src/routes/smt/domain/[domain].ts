import type { RequestHandler } from "@sveltejs/kit";
import { getRecordsByTld } from "../../../handlers/domains";

export const GET: RequestHandler = async ({ params }) => {

    const response = await getRecordsByTld(params.domain);

    return {
        body: {
            records: response
        }
    };
};