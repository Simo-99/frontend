import { useEffect } from 'react'
import { useClient } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';
import React from "react";

const Players_Show = () => {

    const a = useClient()
    const { id } = useParams()
    const navigate = useNavigate()
    let response;

    useEffect(() => {
        async function showPlayer() {

            response = await a.put('/players/' + id, { inside: 1 });
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