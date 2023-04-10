import { BE_BASE_URL } from "@/utils/constants";
import useSWR from 'swr'

export const useFetch = ({ url, payload, options }: { url: string, payload: object, options?: object }) => {
    const mainUrl = BE_BASE_URL + url;
    const method = payload ? 'POST' : 'GET';
    const fetcher = async () => {
        const headers = {
            // Authorization: `Bearer ${getToken()}`
        };
        const options = {
            method,
            headers,
            ...(payload && { body: JSON.stringify(payload) }),
        };

        return await fetch(mainUrl, options).then((res) => res.json());
    };
    const defaultOptions = {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    };
    const { data, mutate, error, isValidating } = useSWR(url + method, fetcher, {
        ...defaultOptions,
        ...options,
    });
    const loading = !data && !error;
    return { data, loading, error, mutate, isValidating }
}