import { json } from '@sveltejs/kit';
import type { RequestHandler } from "./$types";
import { getDomainList } from "../../../handlers/domains";

export const GET: RequestHandler = async () => {
    const result = await getDomainList();

    return json(result);
};