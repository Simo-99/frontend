import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAxios } from "../../utility";
import * as Hooks from "../../hooks"

const PLAYERS_ADD = () => {

    const [player, setPlayer] = useState({ name: "", color: "#8CC3C6", start_res: 0, start_points: 0, start_trophies: 0, inside: 1 })
    const navigate = useNavigate()
    Hooks.useBind(13, "submit")

    const handleSubmit = async (e) => {

        e.preventDefault();
        await UseAxios("/players", "POST", player);
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
                                value={player.name}
                                onChange={(e) => setPlayer(prev => ({ ...prev, name: e.target.value }))}
                                type="text"
                                className="form-control bg-secondary border-dark outline text-white" /></td>
                            <td>
                                <input
                                    value={player.color}
                                    onChange={(e) => setPlayer(prev => ({ ...prev, color: e.target.value }))}
                                    type="text"
                                    className="form-control bg-secondary border-dark outline text-white" /></td>

                        </tr>
                    </tbody>
                </table>

                <table id="table2" className="table table-striped table-dark">

                    <thead>
                        <tr className="text-danger">
                            <th>Resources</th>
                            <th>Points</th>
                            <th>Trophies</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input
                                autoComplete="off"
                                value={player.start_res}
                                onChange={(e) => setPlayer(prev => ({ ...prev, start_res: e.target.value }))}
                                type="text"
                                className="form-control bg-secondary border-dark outline text-white" /></td>
                            <td>
                                <input
                                    value={player.start_points}
                                    onChange={(e) => setPlayer(prev => ({ ...prev, start_points: e.target.value }))}
                                    type="text"
                                    className="form-control bg-secondary border-dark outline text-white" /></td>
                            <td>
                                <input
                                    value={player.start_trophies}
                                    onChange={(e) => setPlayer(prev => ({ ...prev, start_trophies: e.target.value }))}
                                    type="text"
                                    className="form-control bg-secondary border-dark outline text-white" /></td>
                        </tr>
                    </tbody>
                </table>

                <button onClick={handleSubmit} className="bg-dark bold btn outline text-success submit">Add</button>
            </div>
        </section>

    )
}
export default PLAYERS_ADD