import { useParams, useSearchParams } from 'react-router-dom';

function useFind() {
    var object = useParams()
    useSearchParams()[0].forEach((value, key) => {
        object[key] = value
    })

    return object


}
export default useFind