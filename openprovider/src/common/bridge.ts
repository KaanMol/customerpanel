import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export abstract class Bridge {
    protected httpClient: AxiosInstance;

    constructor(httpClientOptions: AxiosRequestConfig = {}) {
        this.httpClient = axios.create(httpClientOptions);
        this.httpClient.interceptors.response.use(
            (response) => response,
            async (error: AxiosResponse) => {
                if ((await this.isAuthorizationError(error)) === true) {
                    const lastRequest = error.config;
                    await this.connect();

                    lastRequest.headers["Authorization"] =
                        this.httpClient.defaults.headers.common[
                        "Authorization"
                        ];

                    const newReq = await axios(lastRequest);

                    return newReq;
                }

                return error;
            }
        );
    }

    protected abstract connect(): Promise<void>;
    protected abstract isAuthorizationError(req: AxiosResponse): boolean;
}

export abstract class BridgeExtension {
    protected httpClient: AxiosInstance;

    constructor(httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    protected getQueryString(parameters: any) {
        if (parameters === undefined) return "";

        const query = [];

        for (const parameter in parameters) {
            query.push(`${parameter}=${parameters[parameter]}`);
        }

        return query.join("&");
    }
}
