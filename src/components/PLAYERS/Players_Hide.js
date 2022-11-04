import { useEffect } from 'react'
import { useClient } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';
import React from "react";

const Players_Hide = () => {

    const a = useClient()
    const { id } = useParams()
    const navigate = useNavigate()
    let response;

    useEffect(() => {

        async function hidePlayer() {

            response = await a.put('/players/' + id, { inside: 0 })
            navigate(-1)
        }
        hidePlayer();
    }, []);





    return (

        <>

        </>

    )

}
export default Players_Hide