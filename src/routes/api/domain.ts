import type { RequestHandler } from "@sveltejs/kit";
import { getDomainList } from "../../handlers/domains";

export const GET: RequestHandler = async ({ locals }) => {
    const result = await getDomainList();
    return {
        body: result
    };
};