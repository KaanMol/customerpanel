import type { PageServerLoad } from "./$types";
import { getRecordsByTld } from "$lib/../handlers/domains";

export const load: PageServerLoad = async ({ params }) => {

    const response = await getRecordsByTld(params.domain);

    return {
        records: response
    };
};