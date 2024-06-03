import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../ultis/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useFetch(async () => {
        setIsLoading(true);
        setData(null);
        setError(null);
        try {
            const data = await fetchDataFromAPI(url);
            setIsLoading(false)
            setData(data);
        } catch (error) {
            setIsLoading(false)
            setError("Error");
        }
        
    }, [url])

    return {data, isLoading, error}
}

export default useFetch