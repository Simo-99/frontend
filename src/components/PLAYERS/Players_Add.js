import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAxios } from "../../utility";

const Players_Add = () => {
    const [username, setUsername] = useState("");
    const [color, setColor] = useState("#000000");

    const navigate = useNavigate()


    const handleSubmit = async (e) => {

        e.preventDefault();
        await UseAxios("/players", "POST", { name: username, color: color, inside: 1 });

        navigate("/players");

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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                className="form-control bg-secondary border-dark outline text-white" /></td>
                            <td>
                                <input
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    type="text"
                                    className="form-control bg-secondary border-dark outline text-white" /></td>

                        </tr>
                    </tbody>


                </table>
                <button onClick={handleSubmit} className="bg-dark bold btn outline text-success">Add</button>
            </div>
        </section>

    )
}

export default Players_Add