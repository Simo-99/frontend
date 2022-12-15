import { useState, useEffect } from 'react';
import { useClient } from '../utility';
import { Navigate, useNavigate } from 'react-router-dom';

function useFetch(url, method = 'GET', params = {}, nav = null) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axios = useClient()
    const navigate = useNavigate()

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

    if (nav != null && !loading) navigate(nav)

    return { data, loading, error }

}
export default useFetch