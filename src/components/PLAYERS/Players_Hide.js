import { useEffect } from 'react'
import { UseAxios } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';

const Players_Hide = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => { (async () => { await UseAxios("/players/" + id, "PUT", { inside: 0 }); navigate(-1); })() }, []);

    return (<></>)

}
export default Players_Hide