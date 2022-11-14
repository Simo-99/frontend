import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UseAxios } from "../../utility";
import React from "react";

const Players_Edit = () => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#000000");
    const [inside, setInside] = useState(0);
    const { id } = useParams()

    const navigate = useNavigate()


    useEffect(() => {

        (async () => {
            const data = await UseAxios('/players/' + id);
            setInside(data.inside);
            setColor(data.color);
            setName(data.name);

        })()


    }, []);


    const handleSubmit = async (e) => {

        e.preventDefault();
        await UseAxios("/players/" + id, "PUT", { name: name, color: color, inside: inside });
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className="form-control bg-secondary border-dark outline text-white" /></td>
                            <td>
                                <input
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    type='text'
                                    className="form-control bg-secondary border-dark outline text-white" /></td>
                            <td>
                                <input
                                    value={inside}
                                    onChange={(e) => setInside(e.target.value)}
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