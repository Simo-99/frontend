import { useEffect } from 'react'
import { UseAxios } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';

const PLAYERS_HIDE = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => { (async () => { await UseAxios("/players/" + id, "PUT", { inside: 0 }); navigate(-1); })() }, [id])

}
export default PLAYERS_HIDE