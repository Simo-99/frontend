import { useEffect } from 'react'
import { UseAxios } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';

const Players_Show = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function showPlayer() {

            await UseAxios("/players/" + id, "PUT", { inside: 1 });
            navigate(-1);
        }
        showPlayer();
    }, []);






    return (

        <>

        </>

    )

}
export default Players_Show