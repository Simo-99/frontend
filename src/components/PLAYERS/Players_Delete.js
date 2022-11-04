import { useEffect } from 'react'
import { useClient } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';
import React from "react";

const Players_Delete = () => {

    const a = useClient()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {


        async function deletePlayer() {

            await a.delete('/players/' + id)
            navigate(-1)
        }

        deletePlayer()
    }, []);



    return (

        <>

        </>

    )

}
export default Players_Delete