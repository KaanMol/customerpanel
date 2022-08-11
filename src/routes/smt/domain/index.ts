import type { RequestHandler } from "@sveltejs/kit";
import { getDomainList } from "../../../handlers/domains";

export const GET: RequestHandler = async ({ locals }) => {
    const response = await getDomainList();

    return {
        body: {
            domains: response
        }
    };
};