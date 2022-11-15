import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UseAxios } from "../../utility";
import React from "react";

const Players_Edit = () => {

    const [player, setPlayer] = useState({ name: "", color: "#000000", inside: 0 })
    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(() => { (async () => { setPlayer(await UseAxios('/players/' + id)); })() }, []);


    const handleSubmit = async (e) => {

        e.preventDefault();
        await UseAxios("/players/" + id, "PUT", { name: player.name, color: player.color, inside: player.inside });
        navigate("/players/" + id + "/submits");

    }

    return (

        <section>
            <br /><br />
            <div className="d-flex flex-column mx-auto w-75 justify-content-center">
                <table id="table" className="table table-striped table-dark">
                    <thead>
                        <tr className="text-danger">
                            <th>Username</th>
                            <th>Color</th>
                            <th>Inside</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input
                                autoComplete="off"
                                value={player.name}
                                onChange={(e) => setPlayer(prev => ({ ...prev, name: e.target.value }))}
                                type="text"
                                className="form-control bg-secondary border-dark outline text-white" /></td>
                            <td>
                                <input
                                    value={player.color}
                                    onChange={(e) => setPlayer(prev => ({ ...prev, color: e.target.value }))}
                                    type='text'
                                    className="form-control bg-secondary border-dark outline text-white" /></td>
                            <td>
                                <input
                                    value={player.inside}
                                    onChange={(e) => setPlayer(prev => ({ ...prev, inside: e.target.value }))}
                                    type="text"
                                    className="form-control bg-secondary border-dark outline text-white" /></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleSubmit} className="bg-dark bold btn outline text-success">Edit</button>
            </div >
        </section >

    )
}

export default Players_Edit