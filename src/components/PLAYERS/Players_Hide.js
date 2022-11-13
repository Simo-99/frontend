import { useEffect } from 'react'
import { UseAxios } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';
import React from "react";

const Players_Hide = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        async function hidePlayer() {

            await UseAxios("/players/" + id, "PUT", { inside: 0 });
            navigate(-1);
        }
        hidePlayer();
    }, []);





    return (

        <>

        </>

    )

}
export default Players_Hide