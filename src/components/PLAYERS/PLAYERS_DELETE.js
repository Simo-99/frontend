import { useEffect } from 'react'
import { UseAxios } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';

const PLAYERS_DELETE = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => { (async () => { await UseAxios('/players/' + id, "DELETE"); navigate(-1); })() }, [id]);

}
export default PLAYERS_DELETE