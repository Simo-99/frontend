import { useEffect } from 'react'
import { UseAxios } from "../../utility";
import { useNavigate, useParams } from 'react-router-dom';
import React from "react";

const Players_Delete = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {


        async function deletePlayer() {

            await UseAxios('/players/' + id, "DELETE");
            navigate(-1);
        }

        deletePlayer()
    }, []);



    return (

        <>

        </>

    )

}
export default Players_Delete