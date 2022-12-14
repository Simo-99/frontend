import { useState, useEffect } from 'react';
import { useClient } from './utility';

function useFetch(url, method = 'GET', params = {}) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axios = useClient()

    useEffect(() => {
        setLoading(true)
        setData({});
        setError(null);

        axios({ method: method, url: url, data: params })
            .then(res => {
                setData(res.data);
                //console.log(res.data)
                setLoading(false);
            })
            .catch(err => {
                setLoading(false)
                setError('An error occurred. Awkward..')
            })

    }, [url])

    return { data, loading, error }
}
export default useFetch