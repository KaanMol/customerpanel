import type { PageServerLoad } from "@sveltejs/kit";
import { getDomainList } from "$lib/../handlers/domains";

export const load: PageServerLoad = async ({ locals }) => {
    const response = await getDomainList();

    return {
        domains: response
    };
};