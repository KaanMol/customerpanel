import type { RequestHandler } from "@sveltejs/kit";
import { getDomainList } from "$lib/../handlers/domains";

export const GET: RequestHandler = async ({ locals }) => {
    const response = await getDomainList();

    return {
        body: {
            domains: response
        }
    };
};