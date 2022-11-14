import { useEffect } from 'react'
import { UseAxios } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';

const Players_Delete = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => { (async () => { await UseAxios('/players/' + id, "DELETE"); navigate(-1); })() }, []);

    return (<></>)

}
export default Players_Delete