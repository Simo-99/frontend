import { useEffect, useState } from 'react'
import { useClient, useTable, canManage, UseAxios } from "../../utility";
import { NavLink } from 'react-router-dom';


const Formers = () => {

    const [players, setPlayers] = useState([])
    const renderTable = useTable();

    useEffect(() => {

        async function getData() { setPlayers(await UseAxios("/players?s=hidden&o=asc")); }
        getData();

    }, []);

    return (

        <>
            <div className="container my-4" style={{ width: '50%' }}>
                <table id="table" className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th className="clickable text-danger">Name</th>
                            <th className="clickable text-danger">Color</th>
                            {canManage() ? <th className="clickable text-danger text-center">Actions</th> : null}
                        </tr>
                    </thead>
                    <tbody>

                        {players.map((player) => (

                            <tr key={player.id}>


                                <td className="clickable ">
                                    <div className="d-flex">
                                        <i className="btn mx-1" style={{ background: player.color, minWidth: '2em', maxHeight: "2em" }}></i>
                                        <NavLink className="nav-link" to={"/players/" + player.id + "/submits"}>{player.name}                                        </NavLink>
                                    </div>
                                </td>
                                <td>{player.color}</td>
                                {
                                    canManage()
                                        ?
                                        <td className="text-center">
                                            <NavLink to={'/players/' + player.id + '/edit'}>
                                                <button type="button" className="btn btn-success m-1"><i className="bi bi-pencil-square"> </i></button>
                                            </NavLink>

                                            <NavLink to={'/players/' + player.id + '/show'}>
                                                <button type="button" className="btn btn-success m-1"><i className="bi bi-eye-fill"></i></button>
                                            </NavLink>

                                            <NavLink to={'/players/' + player.id + '/delete'}>
                                                <button type="button" className="btn btn-danger m-1"><i className="bi bi-trash-fill"></i></button>
                                            </NavLink>

                                        </td> : null
                                }
                            </tr >


                        ))
                        }


                    </tbody >
                </table >
                {renderTable()}

            </div >
        </>

    )

}
export default Formers
